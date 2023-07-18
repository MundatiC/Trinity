

const bcrypt = require('bcrypt');
const uploadProfile = require("../utills/upload")
const axios = require('axios');

async function editProfile(req, res) {
    const UserId = req.session?.user.UserId;
    console.log(UserId);
    const { pool } = req;
    const  value  = req.body;
    
    try {
        if (pool.connected) {
            const request = pool.request();

            if (value.Username) {
                request.input('Username', value.Username);
            }

            if (value.Bio) {
              request.input('Bio', value.Bio);
          }
            
            if (value.ProfilePicture) {
                
                request.input('ProfilePicture', value.ProfilePicture);
            }

            request.input('UserId', UserId);

            let result = await request.execute('UpdateUserProfile');
            console.log(result.rowsAffected[0]);

            if(result.rowsAffected[0]>0){
                res.json({
                    success: true,
                    message: "Successfully updated your user profile",
                    data: result.recordset
                });

            }

            
        }
    } catch (error) {
        res.send(error.message);
    }
}


async function showProfile(req,res){
    const UserId = req.params.id
    const { pool } = req

    try {
        if(pool.connected){
            const request = pool.request()
            request.input('UserId', UserId);

            let result = await request.execute('GetUserById');
            console.log(result);

            if(result.rowsAffected[0]>0){

                res.json({
                    success: true,
                    message: "Successfully retreived your user profile",
                    data: result.recordset
                });
                

                

                
            }

           

        }
    } catch (error) {
        res.send(error.message)
        
    }

}

async function Profile(req,res){
  const UserId = req.session.user.UserId
  const { pool } = req

  try {
      if(pool.connected){
          const request = pool.request()
          request.input('UserId', UserId);

          let result = await request.execute('GetUserById');
          console.log(result);

          if(result.rowsAffected[0]>0){

              res.json({
                  success: true,
                  message: "Successfully retreived your user profile",
                  data: result.recordset
              });
              

              

              
          }

         

      }
  } catch (error) {
      res.send(error.message)
      
  }

}


async function changePassword(req, res){
    const UserId = req.session?.user.UserId;
  const { pool } = req;
  const { currentPassword, newPassword } = req.body;

  try {
    if (pool.connected) {
      let passwords_match = await bcrypt.compare(
        currentPassword,
        req.session?.user.Password
      );

      let newPassword_hashed =  await bcrypt.hash(newPassword, 8);
      if (passwords_match) {
        const request = pool.request();
        request.input('UserId', UserId)
                .input('NewPassword', newPassword_hashed)

        let result = await request.execute('ChangePassword');
        console.log(result);

        if (result.rowsAffected[0] > 0) {          

          res.json({
            success: true,
            message: 'Successfully changed your password',
          });
        }
      } else {
        res.status(401).send('wrong password');
      }
    }
  } catch (error) {
    res.send(error.message);
  }

}

async function getLikedPosts(req, res){
  const UserId = req.params.id;
  const { pool } = req;

  try {
    if (pool.connected) {
      const request = pool.request();
      request.input('SpecificUserId', UserId);

      let result = await request.execute('GetPostsLikedByUser');
      console.log(result);

      if (result) {
        res.json({
          success: true,
          message: 'Successfully retreived liked posts',
          data: result.recordset,
        });
      }
    }
  } catch (error) {
    res.send(error.message);
  }
}

async function getUser(req,res){
  const UserId = req.session?.user.UserId
  const { pool } = req

  try {
    if(pool.connected){
      const request = pool.request()
      request.input('UserId', UserId);

      let result = await request.execute('GetUserById');
      console.log(result);

      if(result.rowsAffected[0]>0){

          res.json({
              success: true,
              message: "Successfully retreived your user profile",
              data: result.recordset
          });
          

          

          
      }
    }
  } catch (error) {
    res.send(error.message)
  }
}








  

module.exports = {editProfile, showProfile,changePassword, getLikedPosts, getUser, Profile}