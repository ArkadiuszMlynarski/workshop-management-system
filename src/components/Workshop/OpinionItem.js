import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { banOpinion, unbanOpinion } from "../../actions/adminActions";
import { reportOpinion, unreportOpinion } from "../../actions/opinionActions";
import { Link } from "react-router-dom";

class OpinionItem extends Component {
  onBanClick = opinionId => {
    this.props.banOpinion(opinionId);
  };

  onUnbanClick = opinionId => {
    this.props.unbanOpinion(opinionId);
  };

  onReportOpinionClick = opinionId => {
    this.props.reportOpinion(opinionId);
  };

  onUnreportOpinionClick = opinionId => {
    this.props.unreportOpinion(opinionId);
  };

  render() {
    const { opinion } = this.props;
    const { user } = this.props.security;
    const { workshop } = this.props.workshop;

    let star = <i className="fas fa-star"></i>;
    let nonstar = <i className="far fa-star"></i>;
    let stars;
    if (opinion.rate === 5) {
      stars = (
        <div>
          {star}
          {star}
          {star}
          {star}
          {star}
        </div>
      );
    } else if (opinion.rate === 4) {
      stars = (
        <div>
          {star}
          {star}
          {star}
          {star}
          {nonstar}
        </div>
      );
    } else if (opinion.rate === 3) {
      stars = (
        <div>
          {star}
          {star}
          {star}
          {nonstar}
          {nonstar}
        </div>
      );
    } else if (opinion.rate === 2) {
      stars = (
        <div>
          {star}
          {star}
          {nonstar}
          {nonstar}
          {nonstar}
        </div>
      );
    } else if (opinion.rate === 1) {
      stars = (
        <div>
          {star}
          {nonstar}
          {nonstar}
          {nonstar}
          {nonstar}
        </div>
      );
    }

    let banButton;
    let reportButton;
    if (
      user.roles.some(e => e.authority === "ROLE_ADMIN") &&
      opinion.banned === false
    ) {
      banButton = (
        <Link
          className="total-like"
          style={{ color: "red" }}
          onClick={this.onBanClick.bind(this, opinion.opinionId)}
        >
          <i className="fas fa-ban"></i> Ban
        </Link>
      );
    }
    if (
      user.roles.some(e => e.authority === "ROLE_ADMIN") &&
      opinion.banned === true
    ) {
      banButton = (
        <Link
          className="total-like"
          style={{ color: "red" }}
          onClick={this.onUnbanClick.bind(this, opinion.opinionId)}
        >
          <i className="fas fa-ban"></i> Unban
        </Link>
      );
    }
    if (workshop.owner === user.username) {
      if (opinion.reported === false) {
        reportButton = (
          <Link
            className="total-like"
            onClick={this.onReportOpinionClick.bind(this, opinion.opinionId)}
          >
            <i className="far fa-flag"></i> Report
          </Link>
        );
      } else {
        reportButton = (
          <Link
            className="total-like"
            onClick={this.onUnreportOpinionClick.bind(this, opinion.opinionId)}
          >
            <i className="far fa-flag"></i> Unreport
          </Link>
        );
      }
    }

    let opinionIsBanned;
    let bannedDescription = opinion.description;
    if (
      opinion.banned === true &&
      !user.roles.some(e => e.authority === "ROLE_ADMIN")
    ) {
      opinionIsBanned = { opacity: "0.3", pointerEvents: "none" };
      bannedDescription =
        "The review was removed by the administrator because it violated the regulations";
    }
    return (
      <div>
        <div className="reviews-members pt-4 pb-3" style={opinionIsBanned}>
          <div className="media">
            <img
              alt="Generic placeholder image"
              src="https://c7.uihere.com/icons/373/764/998/chat-communication-conversation-discuss-message-speech-talk-icon-34c85b65867c25b8b154fb23a1f99a63.png"
              className="mr-3 rounded-pill"
              style={{ transform: "scaleX(-1)" }}
            />
            <div className="media-body">
              <div className="reviews-members-header">
                <span
                  className="star-rating float-right"
                  style={{ color: "orange" }}
                >
                  Rating: <div>{stars}</div>
                </span>
                <h6 className="mb-1">
                  <a className="text-black" href="#">
                    {opinion.user.fullName}
                  </a>
                </h6>
                <p style={{ color: "#797979" }}>{opinion.creationDate} </p>
              </div>
              <div
                className="reviews-members-body float-left"
                style={{ maxWidth: "70%", paddingTop: "5px" }}
              >
                <p style={{ color: "gray" }}>
                  <i>"{bannedDescription}"</i>
                  <br />
                  <b>Issue</b>: {opinion.issue.title} ({opinion.issue.carModel})
                </p>
              </div>
              <div
                className="reviews-members-footer float-right"
                style={{ paddingTop: "25px" }}
              >
                {reportButton} {banButton}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

OpinionItem.propTypes = {
  security: PropTypes.object.isRequired,
  workshop: PropTypes.object.isRequired,
  banOpinion: PropTypes.func.isRequired,
  unbanOpinion: PropTypes.func.isRequired,
  reportOpinion: PropTypes.func.isRequired,
  unreportOpinion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  workshop: state.workshop
});

export default connect(
  mapStateToProps,
  { banOpinion, unbanOpinion, reportOpinion, unreportOpinion }
)(OpinionItem);
