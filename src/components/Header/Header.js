import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => (
  <div className="nav">
    <Link to="/home">
      <h1 className="navTitle">Emergency Food Pantry</h1>
    </Link>
  </div>
);

const mapStateToProps = (state) => ({
  user: state.account,
});

export default connect(mapStateToProps)(Header);