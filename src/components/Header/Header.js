import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import "./Header.css";

const Header = (props) => (
  <AppBar position="static" id="navBar">
    <Toolbar>
      <IconButton edge="start" aria-label="menu">
        <MenuIcon style={{ fill: "#faaf46" }} />
      </IconButton>
      <Typography id="navTitle">Emergency Food Pantry</Typography>
    </Toolbar>
    <div id="navRight">
      <button
        id="logoutButton"
        onClick={() => props.dispatch({ type: "LOGOUT" })}
      >
        Log Out
      </button>
    </div>
  </AppBar>
);

export default connect()(Header);
