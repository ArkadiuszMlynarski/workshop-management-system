import React, { Component } from "react";
import "./WorkshopList.css";
import AcceptedWorkshopItem from "./AcceptedWorkshopItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getWorkshops } from "../../../actions/adminActions";

class AcceptedWorkshopList extends Component {
  componentDidMount() {
    this.props.getWorkshops();
  }

  render() {
    const { workshops } = this.props.adminPanel;

    const workshopss = workshops.map(workshop => (
      <AcceptedWorkshopItem key={workshop.id} workshop={workshop} />
    ));
    let acceptedWorkshops = [];
    for (let i = 0; i < workshopss.length; i++) {
      if (workshopss[i].props.workshop.accepted === true) {
        acceptedWorkshops.push(workshopss[i]);
      }
    }
    return (
      <div className="container">
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="row">
          <div className="col-lg-12">
            <Link to="/admin/" className="float-left">
              Back
            </Link>
            <h3 className="text-center">
              Accepted workshops ({acceptedWorkshops.length})
            </h3>
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th>
                        <span>Workshop name</span>
                      </th>
                      <th>
                        <span>Description</span>
                      </th>
                      <th>
                        <span>Applied at</span>
                      </th>
                      <th className="text-center">
                        <span>Phone #</span>
                      </th>
                      <th className="text-center">
                        <span>Accepted</span>
                      </th>
                      <th>
                        <span>Owner</span>
                      </th>
                      <th>
                        <span>Options</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{acceptedWorkshops}</tbody>
                </table>
              </div>
              <ul className="pagination pull-right">
                <li>
                  <Link to="#">
                    <i className="fa fa-chevron-left"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">1</Link>
                </li>
                <li>
                  <Link to="#">2</Link>
                </li>
                <li>
                  <Link to="#">3</Link>
                </li>
                <li>
                  <Link to="#">4</Link>
                </li>
                <li>
                  <Link to="#">5</Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa fa-chevron-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AcceptedWorkshopList.propTypes = {
  adminPanel: PropTypes.object.isRequired,
  getWorkshops: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  adminPanel: state.adminPanel
});

export default connect(
  mapStateToProps,
  { getWorkshops }
)(AcceptedWorkshopList);
