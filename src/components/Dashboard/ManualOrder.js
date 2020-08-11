import React, { Component } from "react";
import { connect } from "react-redux";

//this component is for the dashboard view that is seen by the volunteers
class ManualOrder extends Component {
  state = {
    orderObj: {},
  };

  setLocalStateObj = (order) => {
    this.setState({ orderObj: order });
  };

  render() {
    return (
      <>
        <form>
          <header className="header">
            <h3>{this.state.orderObj.name}</h3>
            <h4>ID: {this.state.orderObj.account_id}</h4>
          </header>
          <body id="dashBody">
            <span>
              <b>Food Restrictions</b>
            </span>
            <span>{this.state.orderObj.name}</span>
            <br />
            <span>Walking home: {this.state.orderObj.walking_home}</span>
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
            <div>Eligible</div>
          </body>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  activeOrders: state.activeOrders,
  completeOrders: state.completeOrders,
});

export default connect(mapStateToProps)(ManualOrder);
