import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addOffer } from "../../../actions/offerActions";
import { getOwnerWorkshops } from "../../../actions/workshopActions";
import PropTypes from "prop-types";

class AddOffer extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      price: "",
      preferedDate: "",
      estTime: "",
      offeredByWorkshopId: "",
      issueId: id,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getOwnerWorkshops();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newOffer = {
      price: this.state.price,
      preferedDate: this.state.preferedDate,
      estTime: this.state.estTime,
      offeredByWorkshopId: this.state.offeredByWorkshopId
    };
    this.props.addOffer(this.state.issueId, newOffer, this.props.history);
  }

  render() {
    const { id } = this.props.match.params;
    const { errors } = this.state;
    const { workshops } = this.props.workshop;

    let acceptedWorkshops = workshops.filter(item => item.accepted === true);
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/issueBoard/${id}`} className="btn btn-light">
                Back to Issue Board
              </Link>
              <h4 className="display-4 text-center">Add Offer</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.price
                    })}
                    name="price"
                    placeholder="Repair price"
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">{errors.price}</div>
                  )}
                </div>
                <h6>Prefered date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="preferedDate"
                    value={this.state.preferedDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.estTime
                    })}
                    name="estTime"
                    placeholder="Estimated time"
                    value={this.state.estTime}
                    onChange={this.onChange}
                  />
                  {errors.estTime && (
                    <div className="invalid-feedback">{errors.estTime}</div>
                  )}
                </div>
                <div className="form-group">
                  Choose workshop
                  <select
                    className="form-control form-control-lg"
                    name="offeredByWorkshopId"
                    onChange={this.onChange}
                    value={this.state.offeredByWorkshopId}
                  >
                    <option value="">Select workshop</option>
                    {acceptedWorkshops.map(workshop => (
                      <option key={workshop.id} value={workshop.id}>
                        {workshop.name} ({workshop.address})
                      </option>
                    ))}
                    ;
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

AddOffer.propTypes = {
  addOffer: PropTypes.func.isRequired,
  getOwnerWorkshops: PropTypes.func.isRequired,
  workshop: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  workshop: state.workshop,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addOffer, getOwnerWorkshops }
)(AddOffer);
