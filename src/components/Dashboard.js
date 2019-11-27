import React, { Component } from "react";
import IssueItem from "./Issue/IssueItem";
import CreateIssueButton from "./Issue/CreateIssueButton";
import { connect } from "react-redux";
import { getIssues } from "../actions/issueActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { getUser } from "../actions/userActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getIssues();
  }

  render() {
    const { issues } = this.props.issue;
    // const { user } = this.props.security;
    const { user } = this.props.actualUser;

    let userWithoutWorkshop;

    if (!user.roles.some(e => e.name === "WORKSHOPOWNER")) {
      userWithoutWorkshop = (
        <div
          className="notice notice-success text-center"
          style={{
            marginTop: "-1.5rem",
            marginLeft: "200px",
            marginRight: "200px",
            fontSize: "13px",
            color: "slategray"
          }}
        >
          Are you Workshop Owner? <Link to="/workshop/AddWorkshop">Add</Link>{" "}
          your own!{" "}
        </div>
      );
    }

    //Pofiltrowanie issues po statusach
    const issuesAll = issues.map(issue => (
      <IssueItem key={issue.issueId} issue={issue} />
    ));
    let toDoIssues = [],
      inProgressIssues = [],
      doneIssues = [];
    for (let i = 0; i < issuesAll.length; i++) {
      if (issuesAll[i].props.issue.status === "TO DO") {
        toDoIssues.push(issuesAll[i]);
      } else if (issuesAll[i].props.issue.status === "IN PROGRESS") {
        inProgressIssues.push(issuesAll[i]);
      } else doneIssues.push(issuesAll[i]);
    }

    //Blokowanie tabów gdy puste
    let checkToDo, checkInProgress, checkDone;
    if (toDoIssues.length === 0) checkToDo = "nav-item nav-link disabled";
    else checkToDo = "nav-item nav-link";
    if (inProgressIssues.length === 0)
      checkInProgress = "nav-item nav-link disabled";
    else checkInProgress = "nav-item nav-link";
    if (doneIssues.length === 0) checkDone = "nav-item nav-link disabled";
    else checkDone = "nav-item nav-link";

    let checkAllResult = issuesAll;
    if (issuesAll.length === 0)
      checkAllResult = (
        <div className="alert alert-warning text-center" role="alert">
          You don't have any issues reported yet
        </div>
      );
    return (
      <div className="content">
        <div className="container">
          {userWithoutWorkshop}
          <div className="row">
            <div className="col-lg-12">
              <CreateIssueButton />
              <h1
                className="display-4 text-center"
                style={{ paddingBottom: "10px", paddingLeft: "100px" }}
              >
                Your issues
              </h1>

              <nav>
                <div
                  className="nav nav-tabs nav-fill"
                  id="nav-tab"
                  role="tablist"
                >
                  <a
                    className="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    All Results{" "}
                    <span className="badge badge-light">
                      {issuesAll.length}
                    </span>
                  </a>
                  <a
                    className={checkToDo}
                    id="nav-todo-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    To Do{" "}
                    <span className="badge badge-danger">
                      {toDoIssues.length}
                    </span>
                  </a>
                  <a
                    className={checkInProgress}
                    id="nav-inprog-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    In Progress{" "}
                    <span className="badge badge-warning">
                      {inProgressIssues.length}
                    </span>
                  </a>
                  <a
                    className={checkDone}
                    id="nav-done-tab"
                    data-toggle="tab"
                    href="#nav-about"
                    role="tab"
                    aria-controls="nav-about"
                    aria-selected="false"
                  >
                    Done{" "}
                    <span className="badge badge-success">
                      {doneIssues.length}
                    </span>
                  </a>
                </div>
              </nav>
              <div className="tab-content px-sm-0" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  {checkAllResult}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  {toDoIssues}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  {inProgressIssues}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-about"
                  role="tabpanel"
                  aria-labelledby="nav-about-tab"
                >
                  {doneIssues}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  issue: PropTypes.object.isRequired,
  getIssues: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  issue: state.issue,
  actualUser: state.actualUser,
  security: state.security
});

export default connect(
  mapStateToProps,
  { getIssues, getUser }
)(Dashboard);
