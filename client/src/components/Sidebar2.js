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

function Sidebar2({ onComponentClick }) {
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
    <div className="sidebar2">
      <Link to="/home/"  style={{ textDecoration:'none' }}>
      <SidebarOption
        isActive={activeComponent === "feed"}
        Icon={HomeIcon}
        onClick={() => handleComponentClick("feed")}
      />
      </Link>
      <Link to="/home/search"  style={{ textDecoration:'none' }}>
      <SidebarOption
        isActive={activeComponent === "search"}
        Icon={SearchIcon}
        onClick={() => handleComponentClick("search")}
      />
      </Link>
      <Link to="/home/notifications"  style={{ textDecoration:'none' }}>
      <SidebarOption
        isActive={activeComponent === "notifications"}
        Icon={NotificationsNoneIcon}
        onClick={() => handleComponentClick("notifications")}
      />
      </Link>
      <Link to={`/home/profile/${realUserId}`}  style={{ textDecoration:'none' }}>
      <SidebarOption
        className="test"
        isActive={activeComponent === "mainprofile"}
        Icon={PermIdentityIcon}
        onClick={() => handleComponentClick("mainprofile")}
      />
      </Link>
      <Link to="/home/settings"  style={{ textDecoration:'none' }}>
      <SidebarOption
        isActive={activeComponent === "settings"}
        Icon={SettingsIcon}
        onClick={() => handleComponentClick("settings")}
      />
      </Link>
      <Link to="/home/follow"  style={{ textDecoration:'none' }}>
      <SidebarOption
        isActive={activeComponent === "follow"}
        Icon={PersonAddIcon}
        onClick={() => handleComponentClick("follow")}
      />
      </Link>
      <Link to="/home/logout"  style={{ textDecoration:'none' }}>
      <SidebarOption
        isActive={activeComponent === "logout"}
        Icon={ExitToAppIcon}
        onClick={() => handleComponentClick("logout")}
      />
      </Link>
    </div>
  );
}

export default Sidebar2;
