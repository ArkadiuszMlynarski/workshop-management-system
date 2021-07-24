import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserProfileIssueItem extends Component {
  render() {
    const { issue } = this.props;

    return (
      <div>
        <div className="">
          <h4 className="text-custom">
            <Link to={`/issueBoard/${issue.issueId}`}>
              <b>{issue.carModel}</b>
            </Link>
          </h4>
          <p className="mb-0">{issue.creationDate}</p>
          <p>
            <b>{issue.localization}</b>
          </p>
          <p className="text-muted font-13 mb-0">{issue.description}</p>
        </div>
        <hr />
      </div>
    );
  }
}

export default UserProfileIssueItem;
