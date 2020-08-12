import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Header.css";

const Header = (props) => (
  <AppBar position="static" id="navBar" xs={12}>
    <Toolbar>
      {/* <IconButton edge="start" aria-label="menu">
        <MenuIcon style={{ fill: "#faaf46" }} />
      </IconButton> */}
      <Typography id="navTitle">Emergency Food Pantry</Typography>
        <button
          id="logoutButton"
          onClick={() => {
            props.dispatch({ type: "LOGOUT" },
            props.history.push('/login')
          )}}
        >
          Log Out
        </button>
    </Toolbar>
  </AppBar>
);

export default (withRouter(connect()(Header)));
