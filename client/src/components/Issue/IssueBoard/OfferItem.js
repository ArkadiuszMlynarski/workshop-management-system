import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { declineOffer, acceptOffer } from "../../../actions/offerActions";

class OfferItem extends Component {
  onDeclineClick = id => {
    this.props.declineOffer(id);
  };

  onAcceptClick = id => {
    this.props.acceptOffer(id);
  };

  render() {
    const { offer } = this.props;
    const { user } = this.props.security;
    const { issue } = this.props.issue;

    let checkAcceptable;
    if (issue.issueLeader === user.username) {
      checkAcceptable = (
        <div>
          <Link
            className="text-success font-13"
            onClick={this.onAcceptClick.bind(this, offer.offerId)}
          >
            Accept
          </Link>{" "}
          <Link
            className="text-danger font-13"
            onClick={this.onDeclineClick.bind(this, offer.offerId)}
          >
            Decline
          </Link>
        </div>
      );
    }
    return (
      <div>
        <div className="media m-b-20">
          <div className="d-flex mr-3">
            <img
              className="media-object rounded-circle thumb-sm"
              alt="64x64"
              src="https://cdn2.iconfinder.com/data/icons/mechanic-light/64/tools_repair_mechanican_car_repair_garage_car_workshop-512.png"
            />
          </div>
          <div className="media-body">
            <Link to={`/workshopProfile/${offer.workshop.id}`}>
              <h5 className="mt-0">{offer.workshop.name}</h5>
            </Link>
            <p className="font-13 text-muted mb-0">
              <span>
                <strong>Price:</strong> ${offer.price}
              </span>
              <br />
              <span>
                <strong>Prefered day:</strong> {offer.preferedDate}
              </span>
              <br />
              <span>
                <strong>Estimated time:</strong> {offer.estTime} days
              </span>
            </p>
            {checkAcceptable}
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

OfferItem.propTypes = {
  declineOffer: PropTypes.func.isRequired,
  acceptOffer: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  issue: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  issue: state.issue
});

export default connect(
  mapStateToProps,
  { declineOffer, acceptOffer }
)(OfferItem);
