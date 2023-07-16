import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5052/notifications', {
        withCredentials: true,
      });
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markSingleNotificationAsRead = async (NotificationId) => {
    console.log(NotificationId)
    try {
      const response = await axios.put(`http://localhost:5052/markSingleNotificationAsRead`, { NotificationId }, {
        withCredentials: true,
      });
      console.log(response)

      // Update the notifications list to reflect the change
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.NotificationId === NotificationId
            ? { ...notification, IsRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {

      const response = await axios.get(`http://localhost:5052/NotificationsAsRead`, {
        withCredentials: true,
      });

      console.log(response)

      // Update the notifications list to reflect the change
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({ ...notification, IsRead: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <div className="notifications">
      <h1 className="notifications__title">Notifications</h1>
      {notifications.map((notification) => (
        <div
          key={notification.NotificationId}
          className={`notification ${notification.IsRead ? 'read' : 'unread'}`}
          onClick={() => markSingleNotificationAsRead(notification.NotificationId)}
        >
          <div className="notification__content">
            <p className="notification__text">{notification.NotificationText}</p>
            <p className="notification__timestamp">{notification.CreatedAt}</p>
          </div>
          <div className="notification__details">
            {notification.NotificationType === 'NewReply' && (
              <p className="notification__type">New reply notification</p>
            )}
            {notification.NotificationType === 'Like' && (
              <p className="notification__type">Like notification</p>
            )}
            {notification.NotificationType === 'NewFollower' && (
              <p className="notification__type">New follower notification</p>
            )}
            {notification.NotificationType === 'NewComment' && (
              <p className="notification__type">New comment notification</p>
            )}
            {notification.TriggeredUserProfilePicture && (
              <img
                src={notification.TriggeredUserProfilePicture}
                alt={notification.TriggeredUsername}
                className="notification__profile-picture"
              />
            )}
            {notification.TriggeredUsername && (
              <p className="notification__username">{notification.TriggeredUsername}</p>
            )}
          </div>
          <hr className="notification__divider" />
        </div>
      ))}
      <button className="mark-all-read-button" onClick={markAllNotificationsAsRead}>
        Mark All Read
      </button>
    </div>
  );
}

export default Notifications;
