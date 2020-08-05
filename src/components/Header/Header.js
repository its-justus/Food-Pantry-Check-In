import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton"
import Navbar from "react-bootstrap/Navbar";
import './Header.css';

const Header = (props) => (
  <header id="header">
    <h1 className="navTitle">Emergency Food Pantry</h1>
  </header>
);

const mapStateToProps = (state) => ({
  user: state.account,
});

export default connect(mapStateToProps)(Header);