import React from "react";
import '../styles/RoleBar.css'

const handleRoleClick=(e)=>{
    setRole(e.target.value)
}

function RoleBar({setRole}) {
  return (
    <div className="outer-role-bar">
        <h1>Role</h1>
      <button className="role" onClick={handleRoleClick}>Patient</button>
      <button className="role" onClick={handleRoleClick}>Doctor</button>
      <button className="role" onClick={handleRoleClick}>Laboratory</button>
      <button className="role" onClick={handleRoleClick}>Pharmacy</button>
      <button className="role" onClick={handleRoleClick}>Admin</button>
    </div>
  );
}

export default RoleBar;
