import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./Dashboard.css";

//this component is for the dashboard view that is seen by the volunteers
class Dashboard extends Component {
  state = {
    orderObj: {},
    waitTime: "",
  };

  componentDidMount = () => {
    this.props.dispatch({ type: "FETCH_ACTIVE_ORDERS" });
    setInterval(
      () => this.props.dispatch({ type: "FETCH_ACTIVE_ORDERS" }),
      10 * 1000
    );
    this.props.dispatch({ type: "FETCH_COMPLETE_ORDERS" });
    setInterval(
      () => this.props.dispatch({ type: "FETCH_COMPLETE_ORDERS" }),
      10 * 1000
    );
  };

  setLocalStateObj = (order) => {
    this.setState({ orderObj: order });
  };

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col id="firstCol">
              <div className="span6">
                <form>
                  <Table responsive hover>
                    <thead>
                      <tr>Client Que</tr>
                    </thead>
                    <tbody>
                      {this.props.activeOrders?.map((cur, i) => (
                        <tr>
                          <td id="activeListItem">
                            <button
                              id="clientNameButton"
                              onClick={() => this.setLocalStateObj(cur)}
                            >
                              {cur.name}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <br />
                    <button
                      id="addClient"
                      className="btn btn-large btn-primary"
                      type="submit"
                    >
                      Add Client
                    </button>
                  </Table>
                </form>
              </div>
            </Col>
            <Col id="secondCol">
              <div className="span6">
                <form>
                  <div className="header">
                    <h3>{this.state.orderObj.name}</h3>
                    <h4>ID: {this.state.orderObj.account_id}</h4>
                  </div>
                  <body id="dashBody">
                    <span>
                      <b>Food Restrictions</b>
                    </span>
                    <span>{this.state.orderObj.name}</span>
                    <br />
                    <span>
                      Walking home: {this.state.orderObj.walking_home}
                    </span>
                    <br />
                    <span>
                      Child Birthday coming up:
                      {this.state.orderObj.child_birthday}
                    </span>
                    <br />
                    <span>
                      Someone at home is pregnant:
                      {this.state.orderObj.pregnant}
                    </span>
                    <br />
                    <span>
                      Dietary restrictions:
                      {this.state.orderObj.dietary_restrictions}
                    </span>
                    <br />
                    <button
                      disabled={this.state.orderObj.checkout_at}
                      className="btn btn-large btn-primary"
                      onClick={() =>
                        this.props.dispatch({
                          type: "ORDER_CHECKOUT",
                          payload: this.state.orderObj.id,
                        })
                      }
                    >
                      Check In
                    </button>
                  </body>
                </form>
              </div>
            </Col>
            <Col id="thirdCol">
              <div className="span6">
                <form>
                  <Table responsive hover>
                    <thead>
                      <tr>Clients Checked In</tr>
                    </thead>
                    <tbody>
                      {this.props.completeOrders?.map((complete) => (
                        <tr>
                          <td>
                            <button
                              onClick={() => this.setLocalStateObj(complete)}
                            >
                              {complete.name}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </form>
              </div>
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
