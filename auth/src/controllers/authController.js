const mssql = require('mssql');
const config = require('../config/config');
const bcrypt = require('bcrypt');
require('dotenv').config();
const createMarkup = require("../utils/createMarkup");


const uploadProfile = require("../utils/upload");

const sendMail = require("../utils/sendMail");
const getAUser = require("../utils/getAUser"); 


async function registerUser(req, res) {
    let user = req.body;
    // let salt = await bycrypt.genSalt(8);
    // let hashed_pwd = await bycrypt.hash(user.Password, salt)
  
    try {
      let { value } = req;
  
      let hashed_pwd = await bcrypt.hash(user.Password, 8);
      let profilePicture = await uploadProfile(value.ProfilePicture);
      console.log(profilePicture)
      console.log('hey')
  
     const { pool } = req;
  
      if (pool.connected) {
        let results = await pool
          .request()
          .input("Username", value.Username)
          .input("ProfilePicture", profilePicture)
          .input("Password", hashed_pwd)
          .input("Email", value.Email)
          .execute("AddUser");
  
        // try {
        //   await sendMail(value.Name, value.Email);
        // } catch (error) {
        //   console.log(error);
        // }
  
        if (results.rowsAffected[0] > 0) {
          // templating
          let html = await createMarkup("./src/views/signup.ejs", {
            name: value.Username,
            text: "We are thrilled to have you as a new member of our community. This email serves as a warm introduction and a guide to help you get started on our platform.",
          });
          const message = {
            to: value.Email,
            from: process.env.EMAIL_USER,
            subject: "Hello from Trinity",
            html: html,
          };
          await sendMail(message);
          console.log(results);
  
          res.status(201).send({
            success: true,
            message: "New member successfully added",
          });
        } else {
          res.status(500).send({
            success: false,
            message: "An error occurred",
          });
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  }

  async function loginUser(req, res) {
    let { Username, Password } = req.body;
    const { pool } = req;
    console.log(req.body)
    try {
      let user = await getAUser(Username, pool);
      console.log(`${user} hey`)
      
  
      if (user) {
        let passwords_match = await bcrypt.compare(Password, user.Password);
        if (passwords_match) {
            console.log("Hey")
            req.session.authorized = true;
            req.session.user = user;
            
            
            
      
  
          res.json({
            success: true,
            message: "log in successful",
          });
        } else {
          res.status(401).json({
            success: false,
            message: "wrong credentials",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "No user found",
        });
      }
    } catch (error) {
      res.send(error.message);
    }
  }

  async function logoutUser(req, res) {
    console.log(req.session)
    
       
      req.session.destroy((err) => {
        if (err) {
          res.send("Error logging out");
        } else {
          res.send("Logged out successfully");
        }
      })
    
  }



  module.exports = {
    registerUser,
    loginUser,
    logoutUser
  }