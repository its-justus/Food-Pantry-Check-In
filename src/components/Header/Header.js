import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "./Header.css";

class Header extends React.Component {
  state = {
    drawIsOpen: false,
  };

  toggleDrawer = () => {
    this.setState({ drawIsOpen: !this.state.drawIsOpen });
  };

  render() {
    const anchor = "top";
    return (
      <>
        <React.Fragment key={anchor}>
          <AppBar position='static' id='navBar'>
            <Drawer
              anchor={anchor}
              open={this.state.drawIsOpen}
              onClose={() => this.toggleDrawer()}
            >
              <List onClick={() => this.toggleDrawer()}>
                <ListItem
                  button
                  onClick={() => {
                    this.props.history.push('/home');
                  }}>
                  <ListItemText primary={'home'} />
                </ListItem>
                <ListItem button onClick={() => this.props.history.push('/dashboard')}>
                  <ListItemText primary={'dashboard'} />
                </ListItem>
              </List>
            </Drawer>
            <Toolbar>
              <IconButton edge="start" aria-label="menu">
                <MenuIcon
                  style={{ fill: "#faaf46" }}
                  onClick={() => this.toggleDrawer()}
                />
              </IconButton>
              <Typography id="navTitle">Emergency Food Pantry</Typography>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.account,
});

export default connect(mapStateToProps)(withRouter(Header));
