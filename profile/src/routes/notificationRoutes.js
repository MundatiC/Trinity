const express = require('express')

const notificationRouter = express.Router()

const { getNotifications, markNotificationsAsRead } = require('../controllers/notificationControllers')


notificationRouter.get("/notifications", getNotifications)
notificationRouter.post("/markNotificationsAsRead", markNotificationsAsRead)

module.exports = notificationRouter;