import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteIssueTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class IssueTask extends Component {
  onDeleteClick(backlog_id, is_id) {
    this.props.deleteIssueTask(backlog_id, is_id);
  }
  render() {
    const { issue_task } = this.props;
    let priorityString;
    let priorityClass;

    if (issue_task.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
    }

    if (issue_task.priority === 2) {
      priorityClass = "bg-warning text-light";
      priorityString = "MEDIUM";
    }

    if (issue_task.priority === 3) {
      priorityClass = "bg-info text-light";
      priorityString = "LOW";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {issue_task.issueSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{issue_task.summary}</h5>
          <p className="card-text text-truncate ">
            {issue_task.acceptanceCriteria}
          </p>
          <Link
            to={`/updateIssueTask/${issue_task.issueId}/${
              issue_task.issueSequence
            }`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(
              this,
              issue_task.issueId,
              issue_task.issueSequence
            )}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

IssueTask.propTypes = {
  deleteIssueTask: PropTypes.func.isRequired
};
export default connect(
  null,
  { deleteIssueTask }
)(IssueTask);
