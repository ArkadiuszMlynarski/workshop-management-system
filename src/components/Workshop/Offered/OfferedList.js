import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAllIssuesOffered,
  getOwnerWorkshops
} from "../../../actions/workshopActions";
import "./OfferedList.css";
import TabItem from "./TabItem";
import TabContent from "./TabContent";

class OfferedList extends Component {
  componentDidMount() {
    this.props.getAllIssuesOffered();
    this.props.getOwnerWorkshops();
  }

  render() {
    const { workshops } = this.props.workshop;
    let acceptedWorkshops = workshops.filter(item => item.accepted === true);

    return (
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <div class="osahan-account-page-left shadow-sm bg-white h-100">
              <div class="border-bottom p-4">
                <div class="osahan-user text-center">
                  <div class="osahan-user-media">
                    <div class="osahan-user-media-body">
                      <h6 style={{ marginBottom: "0px" }}>Select workshop</h6>
                    </div>
                  </div>
                </div>
              </div>
              <ul
                class="nav nav-tabs flex-column border-0 pt-4 pl-4 pb-4"
                id="myTab"
                role="tablist"
              >
                {acceptedWorkshops.map(workshop => (
                  <TabItem key={workshop.id} workshop={workshop} />
                ))}
              </ul>
            </div>
          </div>
          <div class="col-md-9">
            <div class="osahan-account-page-right shadow-sm bg-white p-4 h-100">
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane  fade active show">
                  <div
                    className="alert alert-secondary text-center"
                    role="alert"
                    style={{ marginBottom: "0px" }}
                  >
                    Select workshop from list
                  </div>
                </div>
                {acceptedWorkshops.map(workshop => (
                  <TabContent key={workshop.id} workshop={workshop} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OfferedList.propTypes = {
  getOwnerWorkshops: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  workshop: state.workshop
});

export default connect(
  mapStateToProps,
  { getAllIssuesOffered, getOwnerWorkshops }
)(OfferedList);
