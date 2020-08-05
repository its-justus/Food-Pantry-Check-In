import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import LogOutButton from "../LogOutButton/LogOutButton"
import './Header.css';

const Header = (props) => (
  <>
    <div className="nav">
      <Link to="/home">
        <button className="navTitle">Emergency Food Pantry</button>
      </Link>
    </div>
    <div className="navRight">
    </div>
  </>
);

const mapStateToProps = (state) => ({
  user: state.account
});

export default connect(mapStateToProps)(Header);