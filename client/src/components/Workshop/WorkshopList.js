import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOwnerWorkshops } from "../../actions/workshopActions";
import WorkshopItem from "./WorkshopItem";

class WorkshopList extends Component {
  componentDidMount() {
    this.props.getOwnerWorkshops();
  }
  render() {
    const { workshops } = this.props.workshop;

    //Pofiltrowanie workshopow po statusach
    const workshopsAll = workshops.map(workshop => (
      <WorkshopItem key={workshop.id} workshop={workshop} />
    ));
    let pendingWorkshops = [],
      acceptedWorkshops = [];
    for (let i = 0; i < workshopsAll.length; i++) {
      if (workshopsAll[i].props.workshop.accepted === false) {
        pendingWorkshops.push(workshopsAll[i]);
      } else acceptedWorkshops.push(workshopsAll[i]);
    }

    let checkPending = pendingWorkshops;
    if (pendingWorkshops.length === 0)
      checkPending = (
        <div className="alert alert-warning text-center" role="alert">
          You don't have any pending workshops.
        </div>
      );
    let checkAccepted = acceptedWorkshops;
    if (acceptedWorkshops.length === 0)
      checkAccepted = (
        <div className="alert alert-warning text-center" role="alert">
          You don't have any accepted workshops.
        </div>
      );

    return (
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <Link
                to={`/workshop/addWorkshop`}
                type="button"
                className="btn btn-primary waves-effect waves-light float-right"
              >
                <i class="fas fa-plus"></i> New workshop
              </Link>
              <h1
                className="display-4 text-center"
                style={{ paddingBottom: "10px", paddingLeft: "100px" }}
              >
                Your workshops
              </h1>

              <nav>
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                  <a
                    class="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Pending{" "}
                    <span className="badge badge-warning">
                      {pendingWorkshops.length}
                    </span>
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-todo-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Accepted{" "}
                    <span className="badge badge-success">
                      {acceptedWorkshops.length}
                    </span>
                  </a>
                </div>
              </nav>
              <div class="tab-content px-sm-0" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  {checkPending}
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  {checkAccepted}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkshopList.propTypes = {
  workshop: PropTypes.object.isRequired,
  getOwnerWorkshops: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  workshop: state.workshop
});

export default connect(
  mapStateToProps,
  { getOwnerWorkshops }
)(WorkshopList);
