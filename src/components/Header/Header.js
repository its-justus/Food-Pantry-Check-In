import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton"
import Navbar from "react-bootstrap/Navbar";
import './Header.css';

const Header = (props) => (
  <>
    <Navbar bg="light">
      <Navbar.Brand href="#home" id="navTitle">
        <img
        src="efp_logo.png"
        />
        Emergency Food Pantry
      </Navbar.Brand>
    </Navbar>
  </>
);

const mapStateToProps = (state) => ({
  user: state.account,
});

export default connect(mapStateToProps)(Header);