import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getPagedReportedOpinions } from "../../../actions/adminActions";
import ReportedOpinionItem from "./ReportedOpinionItem";

class ReportedOpinions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opinions: {},
      pageNo: 0,
      totalPages: 0,
      opinionsInOnePage: 5
    };

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.props.getPagedReportedOpinions(this.state.opinionsInOnePage, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.opinions) {
      this.setState({
        opinions: nextProps.opinions.content,
        pageNo: nextProps.opinions.number,
        totalPages: nextProps.opinions.totalPages
      });
    }
  }

  generatePagination(pageNo, totalPages) {
    let arr = [];

    arr.push(<Link onClick={() => this.changePage(0)}>&laquo; </Link>);

    for (let i = 0; i < totalPages; i++) {
      if (i === pageNo) {
        arr.push(
          <Link key={i} className="active" onClick={() => this.changePage(i)}>
            {i + 1}{" "}
          </Link>
        );
      } else {
        arr.push(
          <Link key={i} onClick={() => this.changePage(i)}>
            {i + 1}
          </Link>
        );
      }
    }

    arr.push(
      <Link onClick={() => this.changePage(totalPages - 1)}> &raquo;</Link>
    );

    return arr;
  }

  changePage(pageNo) {
    this.props.getPagedReportedOpinions(this.state.opinionsInOnePage, pageNo);
  }

  render() {
    const { opinions } = this.props.adminPanel;

    const opinionss = opinions.content.map(opinion => (
      <ReportedOpinionItem key={opinion.opinionId} opinion={opinion} />
    ));

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
              Reported reviews ({opinions.totalElements})
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
                  <tbody>{opinionss}</tbody>
                </table>
              </div>
              <ul className="pull-right text-center">
                <span style={{ fontSize: "13px", color: "grey" }}>
                  Page: {opinions.number + 1} of {opinions.totalPages}
                </span>
                <br />
                <span>{this.generatePagination(0, opinions.totalPages)}</span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReportedOpinions.propTypes = {
  getPagedReportedOpinions: PropTypes.func.isRequired,
  adminPanel: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  adminPanel: state.adminPanel
});

export default connect(
  mapStateToProps,
  { getPagedReportedOpinions }
)(ReportedOpinions);
