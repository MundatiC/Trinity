import React from "react";
import "./Sidebar.css";
import TwitterIcon from "./images/logo1.png";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

import { Button } from "@material-ui/core";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={TwitterIcon} alt="not" className="sidebar__twitterIcon" />

      <SidebarOption active Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Search" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Post
      </Button>
    </div>
  );
}

export default Sidebar;