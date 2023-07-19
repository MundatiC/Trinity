import React from "react";
import "./SidebarOption.css";

function SidebarOption({ isActive, text, Icon, onClick }) {
  return (
    <div className={`sidebarOption ${isActive ? "sidebarOption--active" : ""}`} onClick={onClick}>
      <Icon className='icon' style={{ textdecoration: 'none'}} />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
