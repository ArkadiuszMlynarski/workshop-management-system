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

    if (issuesOffered.length >= 1) {
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
      } else if (
        issuesAll[i].props.issue.status === "IN PROGRESS" &&
        issuesAll[i].props.issue.acceptedOffer.offeredByWorkshopId ===
          workshop.id
      ) {
        inProgressIssues.push(issuesAll[i]);
      } else if (
        issuesAll[i].props.issue.status === "DONE" &&
        issuesAll[i].props.issue.acceptedOffer.offeredByWorkshopId ===
          workshop.id
      ) {
        doneIssues.push(issuesAll[i]);
      } else {
        issuesAll.splice(i, 1);
      }
    }

    console.log("todo", toDoIssues);
    console.log("inProgressIssues", inProgressIssues);
    console.log("doneIssues", doneIssues);
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
          You didn't offer any repair offer yet
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
              href={`#nav-todo-${workshop.name.replace(/\s/g, "")}`}
              role="tab"
              aria-controls={`nav-todo-${workshop.name.replace(/\s/g, "")}`}
              aria-selected="false"
            >
              Pending offers{" "}
              <span className="badge badge-secondary">{toDoIssues.length}</span>
            </a>
            <a
              className={checkInProgress}
              id="nav-inprog-tab"
              data-toggle="tab"
              href={`#nav-inprog-${workshop.name.replace(/\s/g, "")}`}
              role="tab"
              aria-controls={`nav-inprog-${workshop.name.replace(/\s/g, "")}`}
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
              href={`#nav-done-${workshop.name.replace(/\s/g, "")}`}
              role="tab"
              aria-controls={`#nav-done-${workshop.name.replace(/\s/g, "")}`}
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
            id={`nav-todo-${workshop.name.replace(/\s/g, "")}`}
            role="tabpanel"
            aria-labelledby={`nav-todo-${workshop.name.replace(/\s/g, "")}`}
          >
            {toDoIssues}
          </div>
          <div
            className="tab-pane fade"
            id={`nav-inprog-${workshop.name.replace(/\s/g, "")}`}
            role="tabpanel"
            aria-labelledby={`nav-inprog-${workshop.name.replace(/\s/g, "")}`}
          >
            {inProgressIssues}
          </div>
          <div
            className="tab-pane fade"
            id={`nav-done-${workshop.name.replace(/\s/g, "")}`}
            role="tabpanel"
            aria-labelledby={`nav-done-${workshop.name.replace(/\s/g, "")}`}
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
