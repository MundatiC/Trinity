import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';
import { Avatar } from '@material-ui/core';
import moment from 'moment';

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

  const formatTimestamp = (timestamp) => {
    const currentTime =  moment(); // Current time in East African Time (EAT)
    console.log(currentTime)
    const createdTime = moment(timestamp).utcOffset(-3)._d; // Created time from the database in UTC time zone
    console.log(createdTime)
  
    const minutesDifference = Math.abs(currentTime.diff(createdTime, 'minutes'));
    const hoursDifference = Math.abs(currentTime.diff(createdTime, 'hours'));
    const daysDifference = Math.abs(currentTime.diff(createdTime, 'days'));
  
    if (minutesDifference < 1) {
      return 'Just now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
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
    <>
      <div className='header__noficications'>
        <h1 className="notifications__title">Notifications</h1>
        <button className="mark-all-read-button" onClick={markAllNotificationsAsRead}>
          Mark All Read
        </button>
      </div>
      <div className="notifications">


        {notifications.map((notification) => (
          <div
            key={notification.NotificationId}
            className={`notification ${notification.IsRead ? 'read' : 'unread'}`}
            onClick={() => markSingleNotificationAsRead(notification.NotificationId)}
          >
            <div className="notification__content">
              <p className="notification__text">{notification.NotificationText}</p>
              <p className="notification__timestamp">{formatTimestamp(notification.CreatedAt)}</p>
            </div>
            <div className="notification__details">
              {notification.NotificationType === 'NewReply' && <i className="fas fa-reply notification__icon"></i>}
              {notification.NotificationType === 'Like' && <i className="fas fa-heart notification__icon"></i>}
              {notification.NotificationType === 'NewFollower' && <i className="fas fa-user-plus notification__icon"></i>}
              {notification.NotificationType === 'NewComment' && <i className="fas fa-comment notification__icon"></i>}
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

      </div>
    </>

  );
}

export default Notifications;
