const express = require('express')

const notificationRouter = express.Router()

const { getNotifications, markNotificationsAsRead, markSingleNotificationAsRead } = require('../controllers/notificationControllers')
const { sessionAuthorization } = require("../middlewares/sessionAuthorization")

notificationRouter.use(sessionAuthorization)


notificationRouter.get("/notifications", getNotifications)

notificationRouter.put("/markSingleNotificationAsRead", markSingleNotificationAsRead)

notificationRouter.get("/NotificationsAsRead", markNotificationsAsRead)

module.exports = notificationRouter;