const mssql = require("mssql");
const  config  = require("../config/config");

async function getFollowing(req, res) {
    const UserId = req.session?.user.UserId
    const {pool} = req

    try {
        

        if(pool.connected){
           const request = pool.request();
           
           request.input('UserId', UserId)

           let result = await request.execute('GetFollowedUsers');
           console.log(result)

           res.json({
               success: true,
               message: "Retrieved users that you follow",
               data: result.recordset
           })
        }
   } catch (error) {
       res.send(error.message)
       
   }
   
}


async function getFollowers(req, res) {
    const UserId = req.session?.user.UserId

    const {pool} = req
    try {
       

        if(pool.connected){
           const request = pool.request();
           
           request.input('UserId', UserId)

           let result = await request.execute('GetFollowers');
           console.log(result)

           res.json({
               success: true,
               message: "Retrieved users that follow you",
               data: result.recordset
           })
        }
   } catch (error) {
       res.send(error.message)
       
   }

}

async function followUser(req, res) {
    const UserId = req.session?.user.UserId
    const { FollowerUserId } = req.body
    const {pool} = req

    try {
        

        if(pool.connected){
           const request = pool.request();
           
           request.input('UserId', UserId)
           request.input('FollowerUserId', FollowerUserId)

           let result = await request.execute('FollowUser');
           console.log(result)

           res.json({
               success: true,
               message: "Successfully followed a user",
               data: result.recordset
           })
        }
   } catch (error) {
       res.send(error.message)
       
   }
    


}

async function unfollowUser(req, res) {
    const UserId = req.session?.user.UserId
    const { FollowerUserId } = req.body
    const {pool} = req

    try {
        

        if(pool.connected){
           const request = pool.request();
           
           request.input('UserId', UserId)
           request.input('FollowerUserId', FollowerUserId)

           let result = await request.execute('UnfollowUser');
           console.log(result)

           res.json({
               success: true,
               message: "Successfully unfollowed a user",
               data: result.recordset
           })
        }
   } catch (error) {
       res.send(error.message)
       
   }


}

async function getUsersNotFollowed (req, res){
    const UserId = req.session?.user.UserId
    const {pool} = req
    try {
    

        if(pool.connected){
           const request = pool.request();
           
           request.input('UserId', UserId)

           let result = await request.execute('GetUsersNotFollowedByUser');
           console.log(result)

           res.json({
               success: true,
               message: "Retrieved users that you can follow",
               data: result.recordset
           })
        }
   } catch (error) {
       res.send(error.message)
       
   }



}

module.exports = {getFollowing, getFollowers, followUser, unfollowUser, getUsersNotFollowed};