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

//this component is for the dashboard view that is seen by the volunteers
class Dashboard extends Component {
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
          <Row>
            <div id="orangeDiv">
              <HomeIcon fontSize="large" style={{ fill: "#424B54" }} id="homeIcon"/>
              <h1 id="dashboardTitle">Dashboard</h1>
            </div>
          </Row>
          <Row id="dashRow">
            <Col id="firstCol" xs={12} sm={12} lg={4} xl={4}>
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
            <Col id="secondCol" xs={12} sm={12} lg={4} xl={4}>
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
                              dietary_restrictions: " ",
                              snap: "",
                              other: " ",
                              pickup_name: "",
                              checkout_at: " ",
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
                    <body id="dashBody">
                      {this.state.orderObj.pickup_name && (
                        <h3>
                          Person picking it up:{" "}
                          {this.state.orderObj.pickup_name}
                        </h3>
                      )}
                      <h3>Name: {this.state.orderObj.name}</h3>
                      <h4>Household ID: {this.state.orderObj.account_id}</h4>
                      <br />
                      <p className="clientInformation">
                        Walking home:{" "}
                        <b>{String(this.state.orderObj.walking_home)}</b>
                      </p>
                      <p className="clientInformation">
                        Child birthday coming up:{" "}
                        <b>{String(this.state.orderObj.child_birthday)}</b>
                      </p>
                      <p className="clientInformation">
                        Someone at home is pregnant:{" "}
                        <b>{String(this.state.orderObj.child_birthday)}</b>
                      </p>
                      <p className="clientInformation">
                        Dietary restrictions:{" "}
                        <b>
                          {this.state.orderObj.dietary_restrictions || "None"}
                        </b>
                      </p>
                      <p className="clientInformation">
                        SNAP: <b>{String(this.state.orderObj.snap)}</b>
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
                        ß
                      </select>
                    </label>
                  </form>
                ) : (
                  <ManualOrder
                    toggleShowClientInfo={this.toggleShowClientInfo}
                  />
                )}
              </Card>
            </Col>
            <Col id="thirdCol" xs={12} sm={12} lg={4} xl={4}>
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

const mapStateToProps = (state) => ({
  activeOrders: state.activeOrders,
  completeOrders: state.completeOrders,
});

export default connect(mapStateToProps)(Dashboard);
