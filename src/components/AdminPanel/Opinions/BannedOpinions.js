import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getReportedOpinions } from "../../../actions/adminActions";
import ReportedOpinionItem from "./ReportedOpinionItem";

class BannedOpinions extends Component {
  componentDidMount() {
    this.props.getReportedOpinions();
  }

  render() {
    const { opinions } = this.props.opinion;

    const opinionss = opinions.map(opinion => (
      <ReportedOpinionItem key={opinion.opinionId} opinion={opinion} />
    ));
    let bannedOpinions = [];
    for (let i = 0; i < opinionss.length; i++) {
      if (opinionss[i].props.opinion.banned === true) {
        bannedOpinions.push(opinionss[i]);
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
              Banned reviews ({bannedOpinions.length})
            </h3>
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th>
                        <span>Opinioned by</span>
                      </th>
                      <th>
                        <span>Description</span>
                      </th>

                      <th className="text-center">
                        <span>Rating</span>
                      </th>
                      <th className="text-center">
                        <span>Banned</span>
                      </th>
                      <th className="text-center">
                        <span>Options</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{bannedOpinions}</tbody>
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

BannedOpinions.propTypes = {
  getReportedOpinions: PropTypes.func.isRequired,
  opinion: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  opinion: state.opinion
});

export default connect(
  mapStateToProps,
  { getReportedOpinions }
)(BannedOpinions);
