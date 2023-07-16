

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
    console.log(UserId)

    try {
        if(pool.connected){
            const request = pool.request()
            request.input('UserId', UserId);

            let result = await request.execute('MarkNotificationsAsRead');
            console.log(result);

          

                res.json({
                    success: true,
                    message: "Successfully marked all  your notifications as read",
                    data: result.recordset
                });
                  
                
            

           

        }
    } catch (error) {
        res.send(error.message)
        
    }

}

async function markSingleNotificationAsRead(req, res){
    
    const { pool } = req
    const NotificationId = req.body.NotificationId

    try {
        if(pool.connected){
            const request = pool.request()
            request.input('NotificationId', NotificationId);

            let result = await request.execute('MarkNotificationSingleAsRead');
            console.log(result);

          

                res.json({
                    success: true,
                    message: "Successfully marked your notification as read",
                    data: result.recordset
                });
                  
                
            

           

        }
    } catch (error) {
        res.send(error.message)
        
    }
}



module.exports = {getNotifications, markNotificationsAsRead, markSingleNotificationAsRead}