import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Card from "react-bootstrap/Card";
import ManualOrder from "./ManualOrder";
import HomeIcon from "@material-ui/icons/Home";
import "./Dashboard.css";

// The Dashboard component is for the dashboard view that is seen by the staff/volunteers

class Dashboard extends Component {
  // Setting state here for the waitTime for the client 
  // showClientInfo is used for conditional rendering --> whether the client information is to be
  // shown, or the manual check-in form
  state = {
    orderObj: {
      id: '',
      name: '',
      account_id: '',
      walking_home: '',
      child_birthday: '',
      dietary_restrictions: ' ',
      snap: '',
      other: ' ',
      pickup_name: '',
      checkout_at: ' ',
      wait_time_minutes: '15'
    },
    waitTimeMinutes: '15',
    showClientInfo: true,
  };

  componentDidMount = () => {
    this.props.dispatch({ type: "FETCH_ACTIVE_ORDERS" });
    const activeInterval = setInterval(
      () => this.props.dispatch({ type: "FETCH_ACTIVE_ORDERS" }),
      10 * 1000
    );
    this.props.dispatch({ type: "FETCH_COMPLETE_ORDERS" });

    const completeInterval = setInterval(
      () => this.props.dispatch({ type: "FETCH_COMPLETE_ORDERS" }),
      10 * 1000
    );
    this.setState({
      activeInterval: activeInterval,
      completeInterval: completeInterval,
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.state.activeInterval);
    clearInterval(this.state.completeInterval);
  };

  setLocalStateObj = (order) => {
    this.setState({ orderObj: order });
  };

  toggleShowClientInfo = () => {
    this.setState({ showClientInfo: !this.state.showClientInfo });
  };

  render() {
    return (
      <>
        <Container fluid id="dashContainer">
          {/* Dashboard title row */}
          <Row>
            <div id="orangeDiv">
              <HomeIcon
                fontSize="large"
                style={{ fill: "#424B54" }}
                id="homeIcon"
              />
              <h1 id="dashboardTitle">Dashboard</h1>
            </div>
          </Row>
          <Row id="dashRow">
            {/* This first column displays a list of all clients that are currently checked in. 
            A staff member also has the ability to click "Add Client." */}
            <Col id="firstCol" xs={12} sm={12} md={12} lg={4} xl={4}>
              <Card id="firstCard">
                <form className="dashForm">
                  <div id="firstColHeader">
                    <h1 id="firstColTitle">Client Queue</h1>
                    <button
                      id="addClient"
                      className="btn btn-large btn-primary"
                      type="submit"
                      onClick={() => this.setState({ showClientInfo: false })}
                    >
                      Add Client
                    </button>
                  </div>
                  <Table responsive hover>
                    <tbody>
                      {this.props.activeOrders?.map((cur) => (
                        <tr>
                          <td
                            id="queItem"
                            className={
                              cur.id === this.state.orderObj.id &&
                              "selectedOrder"
                            }
                            onClick={() => this.setLocalStateObj(cur)}
                          >
                            {cur.pickup_name
                              ? `${cur.pickup_name} (For ${cur.name})`
                              : cur.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </form>
              </Card>
            </Col>
            {/* This second column displays information about the client that is clicked on
            from the first column. This is also where a staff member would select the wait time
            for the client. */}
            <Col id="secondCol" xs={12} sm={12} md={12} lg={4} xl={4}>
              <Card id="secondCard">
                {this.state.showClientInfo ? (
                  <form className="dashForm">
                    <div id="secondColHeader">
                      <h1 id="secondColTitle">Client Information</h1>
                      <button
                        disabled={
                          !this.state.orderObj.account_id ||
                          this.state.orderObj.checkout_at
                        }
                        id="checkInClient"
                        className="btn btn-large btn-primary"
                        onClick={(event) => {
                          event.preventDefault();
                          this.setState({
                            orderObj: {
                              id: "",
                              name: "",
                              account_id: "",
                              walking_home: "",
                              child_birthday: "",
                              dietary_restrictions: "",
                              snap: "",
                              other: "",
                              pickup_name: "",
                              checkout_at: "",
                              wait_time_minutes: "",
                            },
                            waitTimeMinutes: "15",
                          });
                          this.props.dispatch({
                            type: "ORDER_CHECKOUT",
                            payload: {
                              id: this.state.orderObj.id,
                              waitTimeMinutes: this.state.waitTimeMinutes,
                            },
                          });
                        }}
                      >
                        Check In
                      </button>
                    </div>
                    {this.state.orderObj.id ? (
                      <>
                        <body id="dashBody">
                          {this.state.orderObj.pickup_name && (
                            <h3>
                              Person picking it up:{" "}
                              {this.state.orderObj.pickup_name}
                            </h3>
                          )}
                          <h3 id="infoName">Name: {this.state.orderObj.name}</h3>
                          <h4 id="infoId">
                            Household ID: {this.state.orderObj.household_id}
                          </h4>
                          <br />
                          <p className="clientInformation">
                            Walking home:{" "}
                            <b>
                              {this.state.orderObj.walking_home ? "Yes" : "No"}
                            </b>
                          </p>
                          <p className="clientInformation">
                            Child birthday coming up:{" "}
                            <b>
                              {this.state.orderObj.child_birthday
                                ? "Yes"
                                : "No"}
                            </b>
                          </p>
                          <p className="clientInformation">
                            Someone at home is pregnant:{" "}
                            <b>
                              {this.state.orderObj.child_birthday
                                ? "Yes"
                                : "No"}
                            </b>
                          </p>
                          <p className="clientInformation">
                            Dietary restrictions:{" "}
                            <b>
                              {this.state.orderObj.dietary_restrictions ||
                                "None"}
                            </b>
                          </p>
                          <p className="clientInformation">
                            SNAP:{" "}
                            <b>{this.state.orderObj.snap ? "Yes" : "No"}</b>
                          </p>
                          <p className="clientInformation">
                            Other needs:{" "}
                            <b>{this.state.orderObj.other || "None"}</b>
                          </p>
                        </body>
                        <label id="waitTimeLabel" for="waitTime">
                          {!this.state.orderObj.checkout_at &&
                            "Please choose a wait time: "}
                          <select
                            name="waitTime"
                            id="times"
                            disabled={this.state.orderObj.checkout_at}
                            value={this.state.waitTimeMinutes}
                            onChange={(event) =>
                              this.setState({
                                waitTimeMinutes: event.target.value,
                              })
                            }
                          >
                            {this.state.orderObj.wait_time_minutes ? (
                              <option>
                                {this.state.orderObj.wait_time_minutes &&
                                  (this.state.orderObj.wait_time_minutes === 60
                                    ? "1 hour"
                                    : `${this.state.orderObj.wait_time_minutes} minutes`)}
                              </option>
                            ) : (
                              <>
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">1 hour</option>
                              </>
                            )}
                          </select>
                        </label>
                      </> // Conditional rendering here --> If there is no name selected from the first column,
                          // then just show this helper text.
                    ) : (
                      <h1 id="selectText">
                        Select a name from the Client Queue to view order
                        details.
                      </h1>
                    )}
                  </form>
                        // If the staff member clicks "Add Client," show the manual order form
                ) : (
                  <ManualOrder
                    toggleShowClientInfo={this.toggleShowClientInfo}
                  />
                )}
              </Card>
            </Col>
            {/* This last column displays a list of everyone that has received food/been checked in by
            staff for that day only. */}
            <Col id="thirdCol" xs={12} sm={12} md={12} lg={4} xl={4}>
              <Card id="thirdCard">
                <form className="dashForm">
                  <h1 id="thirdColTitle">Clients Checked In</h1>
                  <Table responsive hover>
                    <tbody>
                      {this.props.completeOrders?.map((complete) => (
                        <tr id="checkedInRow">
                          <td
                            id="checkedInItem"
                            className={
                              complete.id === this.state.orderObj.id &&
                              "selectedOrder"
                            }
                            onClick={() => this.setLocalStateObj(complete)}
                          >
                            {complete.pickup_name
                              ? `${complete.pickup_name} (For ${complete.name}) `
                              : `${complete.name} `}
                            <CheckCircleIcon
                              id="checkmark"
                              style={{ fill: "#99d498" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </form>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

// Bringing in activeOrders to display in the first column,
// and completeOrders to display in the thrid column
const mapStateToProps = (state) => ({
  activeOrders: state.activeOrders,
  completeOrders: state.completeOrders,
});

export default connect(mapStateToProps)(Dashboard);
