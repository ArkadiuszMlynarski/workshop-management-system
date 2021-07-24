import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createWorkshop } from "../../actions/workshopActions";
import classnames from "classnames";

class AddWorkshop extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      address: "",
      telephone: "",
      errors: {},
      creationDate: ""
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
    const newWorkshop = {
      name: this.state.name,
      description: this.state.description,
      address: this.state.address,
      telephone: this.state.telephone,
      creationDate: this.state.creationDate
    };
    this.props.createWorkshop(newWorkshop, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Workshop</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Workshop name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}{" "}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.description
                      })}
                      placeholder="Workshop Description"
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
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.address
                      })}
                      placeholder="Address"
                      name="address"
                      value={this.state.address}
                      onChange={this.onChange}
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.telephone
                      })}
                      placeholder="telephone"
                      name="telephone"
                      value={this.state.telephone}
                      onChange={this.onChange}
                    />
                    {errors.telephone && (
                      <div className="invalid-feedback">{errors.telephone}</div>
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

AddWorkshop.propTypes = {
  createWorkshop: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createWorkshop }
)(AddWorkshop);
