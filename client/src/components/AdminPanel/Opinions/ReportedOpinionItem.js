import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  banOpinion,
  unbanOpinion,
  unreportOpinion
} from "../../../actions/adminActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ReportedOpinionItem extends Component {
  onBanClick = opinionId => {
    this.props.banOpinion(opinionId);
  };

  onUnbanClick = opinionId => {
    this.props.unbanOpinion(opinionId);
  };

  onUnreportClick = opinionId => {
    this.props.unreportOpinion(opinionId);
  };

  render() {
    const { opinion } = this.props;

    let banOrUnbanCheck;
    let unreportCheck;
    if (opinion.banned === false && opinion.reported === true) {
      unreportCheck = (
        <Link
          className="total-like"
          style={{
            color: "#45a0bd",
            height: "30px",
            lineHeight: "30px",
            marginBottom: "1px"
          }}
          onClick={this.onUnreportClick.bind(this, opinion.opinionId)}
        >
          <i className="far fa-flag"></i> Unreport
        </Link>
      );
    }
    if (opinion.banned === false) {
      banOrUnbanCheck = (
        <Link
          className="total-like"
          style={{ color: "red", height: "30px", lineHeight: "30px" }}
          onClick={this.onBanClick.bind(this, opinion.opinionId)}
        >
          <i className="fas fa-ban"></i> Ban
        </Link>
      );
    } else {
      banOrUnbanCheck = (
        <Link
          className="total-like"
          style={{ color: "red", height: "30px", lineHeight: "30px" }}
          onClick={this.onUnbanClick.bind(this, opinion.opinionId)}
        >
          <i className="fas fa-ban"></i> Unban
        </Link>
      );
    }

    return (
      <tr>
        <td>
          <img
            src="https://c7.uihere.com/icons/373/764/998/chat-communication-conversation-discuss-message-speech-talk-icon-34c85b65867c25b8b154fb23a1f99a63.png"
            alt=""
          />
          <Link
            to={`/admin/userProfile/${opinion.user.id}`}
            className="user-link"
          >
            {opinion.user.fullName}
          </Link>
          <span className="user-subhead">
            <b>Issue: </b>
            <Link
              to={`/issueBoard/${opinion.issue.issueId}`}
              style={{ color: "gray" }}
            >
              {opinion.issue.title} ({opinion.issue.carModel})
            </Link>
          </span>
        </td>
        <td style={{ color: "gray", fontSize: "12px", maxWidth: "300px" }}>
          <i>"{opinion.description}"</i>
        </td>
        <td className="text-center" style={{ width: "130px" }}>
          <span className="label label-default">
            <div style={{ color: "orange", fontSize: "18px" }}>
              <i
                className={opinion.rate >= 1 ? "fas fa-star" : "far fa-star"}
              ></i>
              <i
                className={opinion.rate >= 2 ? "fas fa-star" : "far fa-star"}
              ></i>
              <i
                className={opinion.rate >= 3 ? "fas fa-star" : "far fa-star"}
              ></i>
              <i
                className={opinion.rate >= 4 ? "fas fa-star" : "far fa-star"}
              ></i>
              <i
                className={opinion.rate >= 4.5 ? "fas fa-star" : "far fa-star"}
              ></i>
            </div>
          </span>
        </td>
        <td className="text-center" style={{ width: "60px" }}>
          <span
            className={
              opinion.banned === false
                ? "badge badge-success"
                : "badge badge-danger"
            }
          >
            {opinion.banned.toString()}
          </span>
        </td>
        <td className="text-center" style={{ width: "13%" }}>
          {unreportCheck}
          {banOrUnbanCheck}
        </td>
      </tr>
    );
  }
}

ReportedOpinionItem.propTypes = {
  banOpinion: PropTypes.func.isRequired,
  unbanOpinion: PropTypes.func.isRequired,
  unreportOpinion: PropTypes.func.isRequired
};

export default connect(
  null,
  { banOpinion, unbanOpinion, unreportOpinion }
)(ReportedOpinionItem);
