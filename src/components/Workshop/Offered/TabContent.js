import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllIssuesOffered } from "../../../actions/workshopActions";
import OfferedIssueItem from "./OfferedIssueItem";
import { Link } from "react-router-dom";

class TabContent extends Component {
  render() {
    const { workshop } = this.props;
    const { issuesOffered } = this.props.issue;

    let filteredIssues = [];

    if (issuesOffered.length > 1) {
      for (let x = 0; x < issuesOffered.length; x++) {
        for (let y = 0; y < issuesOffered[x].offers.length; y++) {
          if (issuesOffered[x].offers[y].workshop.name === workshop.name) {
            filteredIssues.push(issuesOffered[x]);
          }
        }
      }
    }

    const issuesAll = filteredIssues.map(issue => (
      <OfferedIssueItem key={issue.issueId} issue={issue} />
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
      <div
        class="tab-pane  fade"
        id={workshop.name.replace(/\s/g, "")}
        role="tabpanel"
        aria-labelledby={`${workshop.name.replace(/\s/g, "")}-tab`}
      >
        <nav>
          <h4 style={{ textAlign: "center" }}>
            Issues with offers by{" "}
            <Link to={`/workshopProfile/${workshop.id}`}>{workshop.name}</Link>
          </h4>
          <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
            <a
              className={checkToDo}
              id="nav-todo-tab"
              data-toggle="tab"
              href="#nav-profile"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Pending offers{" "}
              <span className="badge badge-secondary">{toDoIssues.length}</span>
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
              <span className="badge badge-success">{doneIssues.length}</span>
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
            className="tab-pane show"
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
    );
  }
}

TabContent.propTypes = {
  issuesOffered: PropTypes.object.isRequired,
  getAllIssuesOffered: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  issue: state.issue
});

export default connect(
  mapStateToProps,
  { getAllIssuesOffered }
)(TabContent);
