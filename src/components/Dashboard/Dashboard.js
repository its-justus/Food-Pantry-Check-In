import React, { Component } from "react";

//this component is for the dashboard view that is seen by the volunteers
class Dashboard extends Component {

  

  render() {
    return (
      <>
        <div className="dashBoard row">
          <div className="span6">
            <form>
              <ul>
                <li>Bob checked in 3 mins ago.</li>
                <li>Linda checked in 10 mins ago.</li>
              </ul>
              <br />
              <button className="btn btn-large btn-primary" type="submit" onSubmit="">
                  Add Client
                </button>
            </form>
          </div>
          <div className="span6">
            <form>
              <header className="header">
                <h3>Bob Smith</h3>
                <h4>ID: ABCD1234</h4>
              </header>
              <body id="dashBody">
                <span>
                  <b>Food Restrictions</b>
                </span>
                <span>
                  Bobby snobby eats everything. He's like a marauding Komodo
                  dragon when it comes to food. Give him everything, he can
                  handle it all.
                </span>
                <br />
                <span>Walking home: No</span>
                <br />
                <span>Child Birthday coming up: No</span>
                <br />
                <span>Someone at home is pregnant: Yes</span>
                <br />
                <button className="btn btn-large btn-primary" type="submit">
                  Check in
                </button>
                <button className="btn btn-large btn-primary" type="submit">
                  Eligible
                </button>
              </body>
            </form>
          </div>
          <div className="span6">
            <form>
              <ul>
                <li>Sarah received food today.</li>
                <li>James received food today.</li>
                <li>David received food today.</li>
              </ul>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
