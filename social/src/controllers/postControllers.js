const mssql = require("mssql");
const config = require("../config/config");


async function getFeed(req, res) {
    console.log(req.session?.user.UserId)
    try {
         let sql = await mssql.connect(config)

         if(sql.connected){
            const request = sql.request();
            
            request.input('SpecificUserId', 71)

            let result = await request.execute('GetPostsFromFollowedUsers');
            console.log(result)

            res.json({
                success: true,
                message: "Retrieved posts from followed users",
                data: result.recordset
            })
         }
    } catch (error) {
        res.send(error.message)
        
    }
    
}

async function getUserPosts(req, res) {
    try {
        let sql = await mssql.connect(config)

        if(sql.connected){
           const request = sql.request();
           
           request.input('SpecificUserId', 70)

           let result = await request.execute('GetPostsFromSpecific');
           console.log(result)

           res.json({
               success: true,
               message: "Retrieved posts for specific user",
               data: result.recordset
           })
        }
   } catch (error) {
       res.send(error.message)
       
   }

}

module.exports = {getFeed, getUserPosts};