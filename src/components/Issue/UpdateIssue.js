import React, { Component } from "react";
import { getIssue, createIssue } from "../../actions/issueActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateIssue extends Component {
  //set state
  constructor() {
    super();

    this.state = {
      issueId: "",
      title: "",
      type: "",
      description: "",
      carModel: "",
      localization: "",
      status: "",
      errors: {},
      dateFrom: "",
      dateTo: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      issueId,
      title,
      type,
      description,
      carModel,
      localization,
      status,
      dateFrom,
      dateTo
    } = nextProps.issue;

    this.setState({
      issueId,
      title,
      type,
      description,
      carModel,
      localization,
      status,
      dateFrom,
      dateTo
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getIssue(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateIssue = {
      issueId: this.state.issueId,
      title: this.state.title,
      type: this.state.type,
      description: this.state.description,
      carModel: this.state.carModel,
      localization: this.state.localization,
      status: this.state.status,
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo
    };

    this.props.createIssue(updateIssue, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit Issue form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <span>Title</span>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.title
                    })}
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <div className="form-group">
                  <span>Issue type</span>
                  <select
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.type
                    })}
                    placeholder="Type"
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange}
                  >
                    <option value="">Select issue type</option>
                    <option value="DIAGNOSTICS">Diagnostics</option>
                    <option value="ENGINE">Engine</option>
                    <option value="TRANSMISSION">Transmission</option>
                    <option value="SUSPENSION">Suspension</option>
                    <option value="ELECTRONICS">Electronics</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.type && (
                    <div className="invalid-feedback">{errors.type}</div>
                  )}
                </div>
                <div className="form-group">
                  <span>Car model</span>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.carModel
                    })}
                    placeholder="Car Model"
                    name="carModel"
                    value={this.state.carModel}
                    onChange={this.onChange}
                  />
                  {errors.carModel && (
                    <div className="invalid-feedback">{errors.carModel}</div>
                  )}
                </div>
                <div className="form-group">
                  <span>Status</span>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.status
                    })}
                    placeholder="Issue status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <span>Description</span>
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Issue Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <div className="form-group">
                  <span>Localization</span>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.localization
                    })}
                    placeholder="Localization"
                    name="localization"
                    value={this.state.localization}
                    onChange={this.onChange}
                  />
                  {errors.localization && (
                    <div className="invalid-feedback">
                      {errors.localization}
                    </div>
                  )}
                </div>
                <span className="text-center" style={{ display: "block" }}>
                  Availability
                </span>
                <div
                  className="form-inline text-center"
                  style={{ display: "block" }}
                >
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.dateFrom
                    })}
                    placeholder="dateFrom"
                    name="dateFrom"
                    value={this.state.dateFrom}
                    onChange={this.onChange}
                  />
                  {errors.dateFrom && (
                    <div className="invalid-feedback">{errors.dateFrom}</div>
                  )}
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.dateTo
                    })}
                    placeholder="dateTo"
                    name="dateTo"
                    value={this.state.dateTo}
                    onChange={this.onChange}
                  />
                  {errors.dateTo && (
                    <div className="invalid-feedback">{errors.dateTo}</div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  value="Edit issue"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateIssue.propTypes = {
  getIssue: PropTypes.func.isRequired,
  createIssue: PropTypes.func.isRequired,
  issue: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  issue: state.issue.issue,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getIssue, createIssue }
)(UpdateIssue);
