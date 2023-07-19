import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import TwitterIcon from "./images/logo1.png";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar({ onComponentClick }) {
  const [realUserId, setRealUserId] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5052/getUser', {
          withCredentials: true,
        });
        const { UserId } = response.data.data[0];
        console.log(UserId);
        setRealUserId(UserId);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);
  const [activeComponent, setActiveComponent] = useState("");

  const handleComponentClick = (component) => {
    setActiveComponent(component);
    onComponentClick(component);
  };


  return (
    <div className="sidebar">
      <img src={TwitterIcon} alt="not" className="sidebar__twitterIcon" />
      <Link to="/home/feed">
      <SidebarOption
        isActive={activeComponent === "feed"}
        Icon={HomeIcon}
        text="Home"
        onClick={() => handleComponentClick("feed")}
      />
      </Link>
      <Link to="/home/search">
      <SidebarOption
        isActive={activeComponent === "search"}
        Icon={SearchIcon}
        text="Search"
        onClick={() => handleComponentClick("search")}
      />
      </Link>
      <Link to="/home/notifications">
      <SidebarOption
        isActive={activeComponent === "notifications"}
        Icon={NotificationsNoneIcon}
        text="Notifications"
        onClick={() => handleComponentClick("notifications")}
      />
      </Link>
      <Link to={`/home/profile/${realUserId}`}>
      <SidebarOption
        isActive={activeComponent === "mainprofile"}
        Icon={PermIdentityIcon}
        text="Profile"
        onClick={() => handleComponentClick("mainprofile")}
      />
      </Link>
      <Link to="/home/settings">
      <SidebarOption
        isActive={activeComponent === "settings"}
        Icon={SettingsIcon}
        text="Settings"
        onClick={() => handleComponentClick("settings")}
      />
      </Link>
      <Link to="/home/follow">
      <SidebarOption
        isActive={activeComponent === "follow"}
        Icon={PersonAddIcon}
        text="Follow"
        onClick={() => handleComponentClick("follow")}
      />
      </Link>
      <Link to="/home/logout">
      <SidebarOption
        isActive={activeComponent === "logout"}
        Icon={ExitToAppIcon}
        text="Logout"
        onClick={() => handleComponentClick("logout")}
      />
      </Link>
    </div>
  );
}

export default Sidebar;
