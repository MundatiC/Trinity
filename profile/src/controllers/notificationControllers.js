

async function getNotifications(req,res){
    const UserId = req.session?.user.UserId
    const { pool } = req

    try {
        if(pool.connected){
            const request = pool.request()
            request.input('UserId', UserId);

            let result = await request.execute('GetUserNotifications');
            console.log(result);

          

                res.json({
                    success: true,
                    message: "Successfully retreived your notification",
                    data: result.recordset
                });
                  
                
            

           

        }
    } catch (error) {
        res.send(error.message)
        
    }

}

async function markNotificationsAsRead(req,res){
    const UserId = req.session?.user.UserId
    const { pool } = req

    try {
        if(pool.connected){
            const request = pool.request()
            request.input('UserId', UserId);

            let result = await request.execute('MarkNotificationsAsRead');
            console.log(result);

          

                res.json({
                    success: true,
                    message: "Successfully marked your notifications as read",
                    data: result.recordset
                });
                  
                
            

           

        }
    } catch (error) {
        res.send(error.message)
        
    }

}



module.exports = {getNotifications, markNotificationsAsRead}