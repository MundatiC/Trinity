import React, { useState } from "react";
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

function Sidebar({ onComponentClick }) {
  const [activeComponent, setActiveComponent] = useState("");

  const handleComponentClick = (component) => {
    setActiveComponent(component);
    onComponentClick(component);
  };

  const handleLogoutClick = () => {
    // Handle the logout action here
    // Implement the logic to log out the user
    console.log("Logout clicked");
  };

  return (
    <div className="sidebar">
      <img src={TwitterIcon} alt="not" className="sidebar__twitterIcon" />

      <SidebarOption
        isActive={activeComponent === "feed"}
        Icon={HomeIcon}
        text="Home"
        onClick={() => handleComponentClick("feed")}
      />
      <SidebarOption
        isActive={activeComponent === "search"}
        Icon={SearchIcon}
        text="Search"
        onClick={() => handleComponentClick("search")}
      />
      <SidebarOption
        isActive={activeComponent === "notifications"}
        Icon={NotificationsNoneIcon}
        text="Notifications"
        onClick={() => handleComponentClick("notifications")}
      />
      <SidebarOption
        isActive={activeComponent === "mainprofile"}
        Icon={PermIdentityIcon}
        text="Profile"
        onClick={() => handleComponentClick("mainprofile")}
      />
      <SidebarOption
        isActive={activeComponent === "settings"}
        Icon={SettingsIcon}
        text="Settings"
        onClick={() => handleComponentClick("settings")}
      />

      <SidebarOption
        isActive={activeComponent === "follow"}
        Icon={PersonAddIcon}
        text="Follow"
        onClick={() => handleComponentClick("follow")}
      />

      <SidebarOption
        isActive={activeComponent === "logout"}
        Icon={ExitToAppIcon}
        text="Logout"
        onClick={() => handleComponentClick("logout")}
      />
    </div>
  );
}

export default Sidebar;
