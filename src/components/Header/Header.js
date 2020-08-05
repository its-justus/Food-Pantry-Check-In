import React from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
  user: state.account
});

export default connect(mapStateToProps)(Header);