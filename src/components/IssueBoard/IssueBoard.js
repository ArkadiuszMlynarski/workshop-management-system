import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class IssueBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { id } = this.props.match.params;
    const { issue_tasks } = this.props.backlog;
    const { errors } = this.state;

    let BoardContent;

    const boardAlgorithm = (errors, issue_tasks) => {
      if (issue_tasks.length < 1) {
        if (errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectNotFound}
            </div>
          );
        } else if (errors.id) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.id}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Issue Tasks on this board
            </div>
          );
        }
      } else {
        return <Backlog issue_tasks_prop={issue_tasks} />;
      }
    };

    BoardContent = boardAlgorithm(errors, issue_tasks);

    return (
      <div className="container">
        <Link to={`/addIssueTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

IssueBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(IssueBoard);
