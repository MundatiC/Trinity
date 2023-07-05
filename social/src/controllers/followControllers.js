const mssql = require("mssql");
const  config  = require("../config/config");

async function getFollowing(req, res) {

    try {
        let sql = await mssql.connect(config)

        if(sql.connected){
           const request = sql.request();
           
           request.input('UserId', 71)

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
    try {
        let sql = await mssql.connect(config)

        if(sql.connected){
           const request = sql.request();
           
           request.input('UserId', 71)

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

    try {
        let sql = await mssql.connect(config)

        if(sql.connected){
           const request = sql.request();
           
           request.input('UserId', 71)
           request.input('FollowerUserId', 70)

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

async function unfollowUser(req, res) {


}

module.exports = {getFollowing, getFollowers, followUser, unfollowUser};