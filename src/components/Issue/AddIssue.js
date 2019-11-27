import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createIssue } from "../../actions/issueActions";
import classnames from "classnames";

class AddIssue extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      type: "",
      description: "",
      carModel: "",
      localization: "",
      errors: {},
      creationDate: "",
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
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newIssue = {
      title: this.state.title,
      type: this.state.type,
      description: this.state.description,
      carModel: this.state.carModel,
      localization: this.state.localization,
      creationDate: this.state.creationDate,
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo
    };
    this.props.createIssue(newIssue, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Issue form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
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
                    <select
                      className="form-control form-control-lg"
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
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
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
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
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
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.description
                      })}
                      placeholder="Issue Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}{" "}
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
                        "is-invalid": errors.projectNotFound
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
                        "is-invalid": errors.projectNotFound
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
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddIssue.propTypes = {
  createIssue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createIssue }
)(AddIssue);
