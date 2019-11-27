import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteIssue } from "../../actions/issueActions";

class IssueItem extends Component {
  onDeleteClick = id => {
    this.props.deleteIssue(id);
  };

  render() {
    const { issue } = this.props;

    let statusCheck;
    if (issue.status === "TO DO")
      statusCheck = <span className="badge badge-danger">{issue.status}</span>;
    else if (issue.status === "IN PROGRESS")
      statusCheck = <span className="badge badge-warning">{issue.status}</span>;
    else if (issue.status === "DONE")
      statusCheck = <span className="badge badge-success">{issue.status}</span>;

    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              {statusCheck}
              <br />
              <span className="mx-auto">{issue.creationDate}</span>
              <span
                className="mx-auto"
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "15px",
                  color: "gray",
                  fontSize: "11px"
                }}
              >
                Issue type: {issue.type}
              </span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{issue.carModel}</h3>
              <p>{issue.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/issueBoard/${issue.issueId}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Issue Board </i>
                  </li>
                </Link>
                <Link to={`/updateIssue/${issue.issueId}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Issue Info</i>
                  </li>
                </Link>
                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, issue.issueId)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Issue</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IssueItem.propTypes = {
  deleteIssue: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteIssue }
)(IssueItem);
