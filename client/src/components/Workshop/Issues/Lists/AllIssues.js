import React, { Component } from "react";
import { getAllIssues } from "../../../../actions/workshopActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./DiagnosticsIssues.css";
import IssueItem from "./IssueItem";

class AllIssues extends Component {
  componentDidMount() {
    this.props.getAllIssues();
  }

  render() {
    const { issues } = this.props.issue;

    const issuess = issues.map(issue => (
      <IssueItem key={issue.issueId} issue={issue} />
    ));

    return (
      <div class="container pb-5 mb-2" style={{ paddingTop: "30px" }}>
        <Link to={`issueDashboard`}>Back</Link>
        {issuess}
      </div>
    );
  }
}

AllIssues.propTypes = {
  issue: PropTypes.object.isRequired,
  getAllIssues: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  issue: state.issue
});

export default connect(
  mapStateToProps,
  { getAllIssues }
)(AllIssues);
