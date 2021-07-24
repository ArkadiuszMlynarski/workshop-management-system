import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { getIssueTask, updateIssueTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UpdateIssueTask extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      issueSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      issueId: "",
      create_At: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { backlog_id, is_id } = this.props.match.params;
    this.props.getIssueTask(backlog_id, is_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      issueSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      issueId,
      create_At
    } = nextProps.issue_task;

    this.setState({
      id,
      issueSequence,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      issueId,
      create_At
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const UpdateIssueTask = {
      id: this.state.id,
      issueSequence: this.state.issueSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      issueId: this.state.issueId,
      create_At: this.state.create_At
    };

    // console.log(UpdateIssueTask);
    this.props.updateIssueTask(
      this.state.issueId,
      this.state.issueSequence,
      UpdateIssueTask,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/issueBoard/${this.state.issueId}`}
                className="btn btn-light"
              >
                Back to Issue Board
              </Link>
              <h4 className="display-4 text-center">Update Issue Task</h4>
              <p className="lead text-center">
                Issue Name: {this.state.issueId} | Issue Task ID:{" "}
                {this.state.issueSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateIssueTask.propTypes = {
  getIssueTask: PropTypes.func.isRequired,
  issue_task: PropTypes.object.isRequired,
  updateIssueTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  issue_task: state.backlog.issue_task,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getIssueTask, updateIssueTask }
)(UpdateIssueTask);
