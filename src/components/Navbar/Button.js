import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export function Button() {
  return (
    <Link to="log-out">
      <button className="btn">
        <LogoutIcon />
        Log Out
      </button>
    </Link>
  );
}
