import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getAllIssues } from "../../../actions/workshopActions";
import "./IssuesDashboard.css";
import diag from "./diag.png";

class IssuesDashboard extends Component {
  componentDidMount() {
    this.props.getAllIssues();
  }

  render() {
    const { issues } = this.props.issue;

    let diagnostics = (
      (issues.filter(item => item.type === "DIAGNOSTICS").length /
        issues.length) *
      100
    ).toFixed(0);
    let engine = (
      (issues.filter(item => item.type === "ENGINE").length / issues.length) *
      100
    ).toFixed(0);
    let transmission = (
      (issues.filter(item => item.type === "TRANSMISSION").length /
        issues.length) *
      100
    ).toFixed(0);
    let suspension = (
      (issues.filter(item => item.type === "SUSPENSION").length /
        issues.length) *
      100
    ).toFixed(0);
    let electronics = (
      (issues.filter(item => item.type === "ELECTRONICS").length /
        issues.length) *
      100
    ).toFixed(0);
    let other = (
      (issues.filter(item => item.type === "OTHER").length / issues.length) *
      100
    ).toFixed(0);

    let diagnosticsBars,
      engineBars,
      transmissionBars,
      suspensionBars,
      electronicsBars,
      otherBars;

    let bar0 = (
      <div>
        <ul className="list-unstyled activity-leval">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
    let bar1 = (
      <div>
        <ul className="list-unstyled activity-leval">
          <li className="active"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
    let bar2 = (
      <div>
        <ul className="list-unstyled activity-leval">
          <li className="active"></li>
          <li className="active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
    let bar3 = (
      <div>
        <ul className="list-unstyled activity-leval">
          <li className="active"></li>
          <li className="active"></li>
          <li className="active"></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
    let bar4 = (
      <div>
        <ul className="list-unstyled activity-leval">
          <li className="active"></li>
          <li className="active"></li>
          <li className="active"></li>
          <li className="active"></li>
          <li></li>
        </ul>
      </div>
    );
    let bar5 = (
      <div>
        <ul className="list-unstyled activity-leval">
          <li className="active"></li>
          <li className="active"></li>
          <li className="active"></li>
          <li className="active"></li>
          <li className="active"></li>
        </ul>
      </div>
    );

    if (diagnostics <= 0) diagnosticsBars = bar0;
    if (diagnostics > 0 && diagnostics <= 20) diagnosticsBars = bar1;
    if (diagnostics > 20 && diagnostics <= 40) diagnosticsBars = bar2;
    if (diagnostics > 40 && diagnostics <= 60) diagnosticsBars = bar3;
    if (diagnostics > 60 && diagnostics <= 80) diagnosticsBars = bar4;
    if (diagnostics > 80) diagnosticsBars = bar5;

    if (engine <= 0) engineBars = bar0;
    if (engine > 0 && engine <= 20) engineBars = bar1;
    if (engine > 20 && engine <= 40) engineBars = bar2;
    if (engine > 40 && engine <= 60) engineBars = bar3;
    if (engine > 60 && engine <= 80) engineBars = bar4;
    if (engine > 80) engineBars = bar5;

    if (transmission <= 0) transmissionBars = bar0;
    if (transmission > 0 && transmission <= 20) transmissionBars = bar1;
    if (transmission > 20 && transmission <= 40) transmissionBars = bar2;
    if (transmission > 40 && transmission <= 60) transmissionBars = bar3;
    if (transmission > 60 && transmission <= 80) transmissionBars = bar4;
    if (transmission > 80) transmissionBars = bar5;

    if (suspension <= 0) suspensionBars = bar0;
    if (suspension > 0 && suspension <= 20) suspensionBars = bar1;
    if (suspension > 20 && suspension <= 40) suspensionBars = bar2;
    if (suspension > 40 && suspension <= 60) suspensionBars = bar3;
    if (suspension > 60 && suspension <= 80) suspensionBars = bar4;
    if (suspension > 80) suspensionBars = bar5;

    if (electronics <= 0) electronicsBars = bar0;
    if (electronics > 0 && electronics <= 20) electronicsBars = bar1;
    if (electronics > 20 && electronics <= 40) electronicsBars = bar2;
    if (electronics > 40 && electronics <= 60) electronicsBars = bar3;
    if (electronics > 60 && electronics <= 80) electronicsBars = bar4;
    if (electronics > 80) electronicsBars = bar5;

    if (other <= 0) otherBars = bar0;
    if (other > 0 && other <= 20) otherBars = bar1;
    if (other > 20 && other <= 40) otherBars = bar2;
    if (other > 40 && other <= 60) otherBars = bar3;
    if (other > 60 && other <= 80) otherBars = bar4;
    if (other > 80) otherBars = bar5;
    return (
      <div className="container">
        <div className="row" style={{ paddingTop: "20px" }}>
          <div id="card" className="col-md-12">
            <div className="card user-card">
              <Link
                className="disabledCursor"
                to="allIssues"
                style={{ textDecoration: "none" }}
              >
                <div className="card-block">
                  <h6
                    className="f-w-600 m-t-25 m-b-10"
                    style={{ paddingTop: "10px", fontSize: "20px" }}
                  >
                    All issues
                  </h6>
                  <hr />
                  <p className="text-muted m-t-15">
                    There are <b>{issues.length}</b> issues to do!
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-12 text-center">Categories</div>
          <div id="card" className="col-md-4">
            <div className="card user-card">
              <Link
                className="disabledCursor"
                to="diagnosticsIssues"
                style={{ textDecoration: "none" }}
              >
                <div className="card-block">
                  <div className="user-image">
                    <img src={diag} className="img-radius" alt="im" />
                  </div>
                  <h6 className="f-w-600 m-t-25 m-b-10">Diagnostics</h6>
                  <hr />
                  <p
                    className="text-muted m-t-15"
                    style={{ marginBottom: "0" }}
                  >
                    To Do issues: {diagnostics}%
                  </p>
                  {diagnosticsBars}
                </div>
              </Link>
            </div>
          </div>

          <div id="card" className="col-md-4">
            <div className="card user-card">
              <Link to="engineIssues" style={{ textDecoration: "none" }}>
                <div className="card-block">
                  <div className="user-image">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/auto-workshop-glyph-silhouettes/300/16317451Untitled-3-512.png"
                      className="img-radius"
                      alt="im"
                    />
                  </div>
                  <h6 className="f-w-600 m-t-25 m-b-10">Engine</h6>
                  <hr />
                  <p
                    className="text-muted m-t-15"
                    style={{ marginBottom: "0" }}
                  >
                    To Do issues: {engine}%
                  </p>
                  {engineBars}
                </div>
              </Link>
            </div>
          </div>

          <div id="card" className="col-md-4">
            <div className="card user-card">
              <Link to="transmissionIssues" style={{ textDecoration: "none" }}>
                <div className="card-block">
                  <div className="user-image">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/outline-car-parts/32/Car_automobile_part-69-512.png"
                      className="img-radius"
                      alt="im"
                    />
                  </div>
                  <h6 className="f-w-600 m-t-25 m-b-10">Transmission</h6>
                  <hr />
                  <p
                    className="text-muted m-t-15"
                    style={{ marginBottom: "0" }}
                  >
                    To Do issues: {transmission}%
                  </p>
                  {transmissionBars}
                </div>
              </Link>
            </div>
          </div>

          <div id="card" className="col-md-4">
            <div className="card user-card">
              <Link to="suspensionIssues" style={{ textDecoration: "none" }}>
                <div className="card-block">
                  <div className="user-image">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/car-service-41/64/suspension-vehicle-car-auto-512.png"
                      className="img-radius"
                      alt="im"
                    />
                  </div>
                  <h6 className="f-w-600 m-t-25 m-b-10">Suspension</h6>
                  <hr />
                  <p
                    className="text-muted m-t-15"
                    style={{ marginBottom: "0" }}
                  >
                    To Do issues: {suspension}%
                  </p>
                  {suspensionBars}
                </div>
              </Link>
            </div>
          </div>

          <div id="card" className="col-md-4">
            <div className="card user-card">
              <Link to="electronicsIssues" style={{ textDecoration: "none" }}>
                <div className="card-block">
                  <div className="user-image">
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png"
                      className="img-radius"
                      alt="im"
                    />
                  </div>
                  <h6 className="f-w-600 m-t-25 m-b-10">Electronics</h6>
                  <hr />
                  <p
                    className="text-muted m-t-15"
                    style={{ marginBottom: "0" }}
                  >
                    To Do issues: {electronics}%
                  </p>
                  {electronicsBars}
                </div>
              </Link>
            </div>
          </div>

          <div id="card" className="col-md-4">
            <div className="card user-card">
              <Link to="otherIssues" style={{ textDecoration: "none" }}>
                <div className="card-block">
                  <div className="user-image">
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/eshop-outline-pack/100/Noun_Project_20Icon_5px_grid-13-512.png"
                      className="img-radius"
                      alt="im"
                    />
                  </div>
                  <h6 className="f-w-600 m-t-25 m-b-10">Other</h6>
                  <hr />
                  <p
                    className="text-muted m-t-15"
                    style={{ marginBottom: "0" }}
                  >
                    To Do issues: {other}%
                  </p>
                  {otherBars}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IssuesDashboard.propTypes = {
  issue: PropTypes.object.isRequired,
  getAllIssues: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  issue: state.issue
});

export default connect(
  mapStateToProps,
  { getAllIssues }
)(IssuesDashboard);
