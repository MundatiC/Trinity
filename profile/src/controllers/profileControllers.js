
const uploadProfile = require("../utills/upload")

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
            console.log(result);

            res.json({
                success: true,
                message: "Successfully updated your user profile",
                data: result.recordset
            });
        }
    } catch (error) {
        res.send(error.message);
    }
}


async function showProfile(req,res){

}

async function deleteAccount(req,res){

}

module.exports = {editProfile, showProfile,deleteAccount}