import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Card from "react-bootstrap/Card";
import ManualOrder from "./ManualOrder";
import "./Dashboard.css";

//this component is for the dashboard view that is seen by the volunteers
class Dashboard extends Component {
  state = {
    orderObj: {},
    waitTimeMinutes: "15",
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
              <img id="efpLogoDash" src="EFP_Logo_Color.png" alt="EFP Logo" />
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
                      {this.props.activeOrders?.map((cur, i) => (
                        <tr>
                          <td id="queItem">
                            <button
                              id="clientNameButton"
                              onClick={() => this.setLocalStateObj(cur)}
                            >
                              {cur.pickup_name && cur.name
                                ? cur.pickup_name
                                : cur.name}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </form>
              </Card>
            </Col>
            {this.state.orderObj === {} ? (
              <span></span>
            ) : (
              <Col id="secondCol" xs={12} sm={12} lg={4} xl={4}>
                <Card id="secondCard">
                  {this.state.showClientInfo ? (
                    <form className="dashForm">
                      <div id="secondColHeader">
                        <h1 id="secondColTitle">Client Information</h1>
                        <button
                          disabled={this.state.orderObj.checkout_at}
                          id="checkInClient"
                          className="btn btn-large btn-primary"
                          onClick={() =>
                            this.props.dispatch({
                              type: "ORDER_CHECKOUT",
                              payload: {
                                id: this.state.orderObj.id,
                                waitTimeMinutes: this.state.waitTimeMinutes,
                              },
                            })
                          }
                        >
                          Check In
                        </button>
                      </div>
                      <body id="dashBody">
                        <h3>Name: {this.state.orderObj.name}</h3>
                        <h4>Household ID: {this.state.orderObj.account_id}</h4>
                        <br />
                        <p className="clientInformation">
                          Walking home:{" "}
                          <b>{this.state.orderObj.walking_home}</b>
                        </p>
                        <p className="clientInformation">
                          Child Birthday coming up:{" "}
                          <b>{this.state.orderObj.child_birthday}</b>
                        </p>
                        <p className="clientInformation">
                          Someone at home is pregnant:{" "}
                          <b>{this.state.orderObj.pregnant}</b>
                        </p>
                        <p className="clientInformation">
                          Dietary restrictions:{" "}
                          <b>{this.state.orderObj.dietary_restrictions}</b>
                        </p>
                        <p className="clientInformation">
                          SNAP: <b>{this.state.orderObj.snap}</b>
                        </p>
                        <p className="clientInformation">
                          Other needs: <b>{this.state.orderObj.other}</b>
                        </p>
                      </body>
                      <label for="waitTime">
                        Please choose a wait time:
                        <select
                          name="waitTime"
                          id="times"
                          value={this.state.waitTimeMinutes}
                          onChange={(event) =>
                            this.setState({
                              waitTimeMinutes: event.target.value,
                            })
                          }
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">60 minutes</option>
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
            )}
            <Col id="thirdCol" xs={12} sm={12} lg={4} xl={4}>
              <Card id="thirdCard">
                <form className="dashForm">
                  <h1 id="thirdColTitle">Clients Checked In</h1>
                  <Table responsive hover>
                    <tbody>
                      {this.props.completeOrders?.map((complete) => (
                        <tr id="checkedInRow">
                          <td id="checkedInItem">
                            <button
                              onClick={() => this.setLocalStateObj(complete)}
                            >
                              {complete.name}
                            </button>
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
