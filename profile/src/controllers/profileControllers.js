

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
            
            if (value.ProfilePicture) {
                let ProfilePicture = await uploadProfile(value.ProfilePicture);
                request.input('ProfilePicture', ProfilePicture);
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





async function deleteAccount(req, res) {
  const UserId = req.session?.user.UserId;
  const { pool } = req;
  const { Password } = req.body;

  try {
    if (pool.connected) {
      let passwords_match = await bcrypt.compare(
        Password,
        req.session?.user.Password
      );
      if (passwords_match) {
        const request = pool.request();
        request.input('UserId', UserId);

        let result = await request.execute('DeleteAccount');
        console.log(result);

        if (result.rowsAffected[0] > 0) {
        //   Call the logout endpoint using axios
          await axios.post('http://localhost:5050/logout');

          
          

          res.json({
            success: true,
            message: 'Successfully deleted your account',
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


  

module.exports = {editProfile, showProfile,deleteAccount}