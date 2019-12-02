import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./OwnerDashboard.css";
import PropTypes from "prop-types";
import {
  getOwnerWorkshops,
  getAllIssues,
  getAllIssuesOffered
} from "../../actions/workshopActions";

class OwnerDashboard extends Component {
  componentDidMount() {
    this.props.getOwnerWorkshops();
    this.props.getAllIssues();
    this.props.getAllIssuesOffered();
  }

  render() {
    const { workshops } = this.props.workshop;
    const { issues } = this.props.issue;
    const { issuesOffered } = this.props.issue;
    const { user } = this.props.security;

    let allCount = workshops.length;
    let pendingCount = workshops.filter(item => item.accepted === false).length;
    let acceptedCount = workshops.filter(item => item.accepted === true).length;
    let lastIssue = issues.filter(
      item =>
        item.issueId ===
        Math.max.apply(
          Math,
          issues.map(function(o) {
            return o.issueId;
          })
        )
    );
    var lastIssueDate = "--";
    if (lastIssue.length !== 0) {
      lastIssueDate = lastIssue[0].creationDate;
    }

    let offeredPendingCount = issuesOffered.filter(
      item => item.status === "TO DO"
    ).length;
    let offeredInprogressCount = issuesOffered.filter(
      item =>
        item.status === "IN PROGRESS" &&
        item.acceptedOffer.offeredByUser === user.username
    ).length;
    let offeredDoneCount = issuesOffered.filter(
      item =>
        item.status === "DONE" &&
        item.acceptedOffer.offeredByUser === user.username
    ).length;

    var allOfferedCount = 1;
    if (offeredPendingCount + offeredInprogressCount + offeredDoneCount > 0) {
      allOfferedCount =
        offeredPendingCount + offeredInprogressCount + offeredDoneCount;
    }
    return (
      <div className="container">
        <h1 className="display-4 text-center" style={{ paddingBottom: "40px" }}>
          Workshop management
        </h1>
        <hr />
        <Link to={`/workshop/workshopList`} style={{ textDecoration: "none" }}>
          <div id="workmenu" className="project">
            <div className="row bg-white has-shadow">
              <div className="left-col col-lg-6 d-flex align-items-center justify-content-between">
                <div className="project-title d-flex align-items-center">
                  <div className="image">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/eldorado-stroke-buildings/40/garage_hangar-512.png"
                      alt="..."
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <h3 className="h4">Your workshops</h3>
                    <small>View your pending/accepted workshops</small>
                  </div>
                </div>
              </div>
              {/*progressbar workshops*/}
              <div
                className="right-col col-lg-6 d-flex align-items-center"
                style={{ paddingLeft: "100px" }}
              >
                <div
                  className="project-progress"
                  style={{ width: "350px", paddingTop: "10px" }}
                >
                  <div class="progress">
                    <div
                      class="progress-bar bg-warning"
                      role="progressbar"
                      style={{
                        width: (pendingCount / allCount) * 100 + "%"
                      }}
                      aria-valuenow="15"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width: (acceptedCount / allCount) * 100 + "%"
                      }}
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="comments" style={{ textAlign: "center" }}>
                    <i className="fa fa-comment-o"></i>
                    <span className="float-left" style={{ color: "orange" }}>
                      Pending <b>{pendingCount}</b>
                    </span>
                    <span className="float-right" style={{ color: "green" }}>
                      Accepted <b>{acceptedCount}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link
          to={`/workshop/issueDashboard`}
          style={{ textDecoration: "none" }}
        >
          <div id="workmenu" className="project">
            <div className="row bg-white has-shadow">
              <div className="left-col col-lg-6 d-flex align-items-center justify-content-between">
                <div className="project-title d-flex align-items-center">
                  <div className="image">
                    <img
                      src="https://www.pnglot.com/pngfile/detail/216-2169862_png-loop-job-vacancies-search-lens-icon-png.png"
                      alt="..."
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <h3 className="h4">Search issues</h3>
                    <small>Look for issues to fix</small>
                  </div>
                </div>
              </div>
              <div className="right-col col-lg-6 d-flex align-items-center">
                <div className="time col-lg-12">
                  <div className="float-left" style={{ paddingLeft: "70px" }}>
                    Issues: <b>{issues.length}</b>
                  </div>{" "}
                  <div className="float-right" style={{ paddingRight: "70px" }}>
                    Last created issue:{" "}
                    <b>
                      <i>{lastIssueDate}</i>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to={`/workshop/offered`} style={{ textDecoration: "none" }}>
          <div id="workmenu" className="project">
            <div className="row bg-white has-shadow">
              <div className="left-col col-lg-6 d-flex align-items-center justify-content-between">
                <div className="project-title d-flex align-items-center">
                  <div className="image">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/List_of_tools_icon.svg/983px-List_of_tools_icon.svg.png"
                      alt="..."
                      className="img-fluid"
                    />
                  </div>
                  <div className="text">
                    <h3 className="h4">Pending/accepted offers</h3>
                    <small>
                      Issues you're currently fixing or offered help
                    </small>
                  </div>
                </div>
              </div>
              {/*progressbar offers*/}
              <div
                className="right-col col-lg-6 d-flex align-items-center"
                style={{ paddingLeft: "100px" }}
              >
                <div
                  className="project-progress"
                  style={{ width: "350px", paddingTop: "10px" }}
                >
                  <div class="progress">
                    <div
                      class="progress-bar bg-secondary"
                      role="progressbar"
                      style={{
                        width:
                          (offeredPendingCount / allOfferedCount) * 100 + "%"
                      }}
                      aria-valuenow="15"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <div
                      class="progress-bar bg-warning"
                      role="progressbar"
                      style={{
                        width:
                          (offeredInprogressCount / allOfferedCount) * 100 + "%"
                      }}
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width: (offeredDoneCount / allOfferedCount) * 100 + "%"
                      }}
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="comments" style={{ textAlign: "center" }}>
                    <i className="fa fa-comment-o"></i>
                    <span className="float-left">
                      Pending <b>{offeredPendingCount}</b>
                    </span>
                    <span style={{ color: "orange" }}>
                      In progress <b>{offeredInprogressCount}</b>
                    </span>
                    <span className="float-right" style={{ color: "green" }}>
                      Fixed <b>{offeredDoneCount}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
OwnerDashboard.propTypes = {
  workshop: PropTypes.object.isRequired,
  getOwnerWorkshops: PropTypes.func.isRequired,
  issue: PropTypes.object.isRequired,
  getAllIssues: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  getAllIssuesOffered: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  workshop: state.workshop,
  issue: state.issue,
  security: state.security
});

export default connect(
  mapStateToProps,
  { getOwnerWorkshops, getAllIssues, getAllIssuesOffered }
)(OwnerDashboard);
