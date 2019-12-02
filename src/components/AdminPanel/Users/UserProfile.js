import React, { Component } from "react";
import { findUser } from "../../../actions/adminActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./UserProfile.css";
import UserProfileIssueItem from "./UserProfileIssueItem";
import UserProfileWorkshopItem from "./UserProfileWorkshopItem";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.findUser(id, this.props.history);
  }

  render() {
    const { user } = this.props.user;
    let issueChecker, workshopChecker;
    if (user.issues.length === 0) {
      issueChecker = (
        <div className="alert alert-warning text-center" role="alert">
          This user doesn't have any issues
        </div>
      );
    } else {
      issueChecker = (
        <div>
          {user.issues.map(issue => (
            <UserProfileIssueItem key={issue.id} issue={issue} />
          ))}
        </div>
      );
    }
    if (user.workshops.length === 0) {
      workshopChecker = (
        <div className="alert alert-warning text-center" role="alert">
          This user doesn't have any workshops
        </div>
      );
    } else {
      workshopChecker = (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Workshop name</th>
                <th>Description</th>
                <th>Address</th>
                <th>Status</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            {user.workshops.map(workshop => (
              <UserProfileWorkshopItem key={workshop.id} workshop={workshop} />
            ))}
          </table>
        </div>
      );
    }

    return (
      <div id="tlo" className="content">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {
                // meta
              }
              <div
                className="profile-user-box card-box bg-custom"
                style={{ borderBottom: "5px solid #e74c3c" }}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <span className="float-left mr-3">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="thumb-lg rounded-circle"
                      />
                    </span>
                    <div className="media-body text-white">
                      <h4 className="mt-1 mb-1 font-18">{user.fullName}</h4>
                      <p className="font-13 text-light">
                        {user.roles.map(({ name }) => {
                          return <span key={name}>{name} </span>;
                        })}
                      </p>
                      <p className="text-light mb-0">
                        California, United States
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="text-right">
                      <Link
                        to={`/admin/editUser/${user.id}`}
                        className="btn btn-light waves-effect"
                      >
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {
                //meta
              }
            </div>
          </div>
          {
            //    endrow
          }
          <div className="row">
            <div className="col-xl-4">
              {
                //Personal information
              }
              <div className="card-box">
                <h4 className="header-title mt-0">Personal Information</h4>
                <div className="panel-body">
                  <hr />
                  <div className="text-left">
                    <p className="text-muted font-13">
                      <strong>Full Name:</strong>{" "}
                      <span className="m-l-15">{user.fullName}</span>
                    </p>
                    <p className="text-muted font-13">
                      <strong>Mobile:</strong>
                      <span className="m-l-15"> 123 1234 567</span>
                    </p>
                    <p className="text-muted font-13">
                      <strong>Email:</strong>{" "}
                      <span className="m-l-15">{user.username}</span>
                    </p>
                    <p className="text-muted font-13">
                      <strong>Profile created:</strong>{" "}
                      <span className="m-l-15">{user.create_At}</span>
                    </p>
                  </div>
                </div>
              </div>
              {
                //end personal information
              }
            </div>
            <div className="col-xl-8">
              <div className="row">
                <div className="col-sm-4">
                  <div className="card-box tilebox-one">
                    <i className="icon-layers float-right text-muted"></i>
                    <h6 className="text-muted text-uppercase mt-0">Issues</h6>
                    <h2 className="" data-plugin="counterup">
                      {user.issues.length}
                    </h2>
                  </div>
                </div>
                {
                  //end col
                }
                <div className="col-sm-4">
                  <div className="card-box tilebox-one">
                    <i className="icon-paypal float-right text-muted"></i>
                    <h6 className="text-muted text-uppercase mt-0">
                      Workshops
                    </h6>
                    <h2 className="">
                      <span data-plugin="counterup">
                        {user.workshops.length}
                      </span>
                    </h2>
                    <span className="text-muted">Verified: </span>
                    <span className="badge badge-success">
                      {
                        user.workshops.filter(item => item.accepted === true)
                          .length
                      }
                    </span>
                  </div>
                </div>
                {
                  //end col
                }
                <div className="col-sm-4">
                  <div className="card-box tilebox-one">
                    <i className="icon-rocket float-right text-muted"></i>
                    <h6 className="text-muted text-uppercase mt-0">TODO</h6>
                    <h2 className="" data-plugin="counterup">
                      1,890
                    </h2>
                    <span className="badge badge-custom">+89% </span>
                    <span className="text-muted">TODO</span>
                  </div>
                </div>
                {
                  //end col
                }
              </div>
              {
                //end row
              }
              <div className="card-box">
                <h3 className="header-title mt-0 mb-3">Issues</h3>
                <hr />
                <div className="">{issueChecker}</div>
              </div>
              <div className="card-box">
                <h4 className="header-title mb-3">Workshops</h4>
                <div className="table-responsive">{workshopChecker}</div>
              </div>
            </div>
            {
              //end col
            }
          </div>
          {
            //end row
          }
        </div>
        {
          //container
        }
      </div>
    );
  }
}

UserProfile.propTypes = {
  findUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.adminPanel
});

export default connect(
  mapStateToProps,
  { findUser }
)(UserProfile);
