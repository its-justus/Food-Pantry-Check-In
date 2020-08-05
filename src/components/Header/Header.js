import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton"
import Navbar from "react-bootstrap/Navbar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import './Header.css';

const Header = (props) => (
  <AppBar position="static" id="navBar">
    <Toolbar>
      <IconButton edge="start" aria-label="menu">
        <MenuIcon style={{ fill: "#faaf46" }} />
      </IconButton>
      <Typography id="navTitle">Emergency Food Pantry</Typography>
    </Toolbar>
  </AppBar>
);

const mapStateToProps = (state) => ({
  user: state.account,
});

export default connect(mapStateToProps)(Header);