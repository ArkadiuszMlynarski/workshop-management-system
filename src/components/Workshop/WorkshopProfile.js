import React, { Component } from "react";
import { getWorkshop } from "../../actions/workshopActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./WorkshopProfile.css";
import { acceptWorkshop, deleteWorkshop } from "../../actions/adminActions";
import { Link } from "react-router-dom";

class WorkshopProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getWorkshop(id, this.props.history);
  }

  onDeleteClick = id => {
    this.props.deleteWorkshop(id);
  };

  onAcceptWorkshopClick = id => {
    this.props.acceptWorkshop(id, this.props.history);
  };

  render() {
    const { workshop } = this.props.workshop;
    const { user } = this.props.security;

    let accepted;
    if (workshop.accepted === true) {
      accepted = <span className="badge badge-success">true</span>;
    } else accepted = <span className="badge badge-danger">false</span>;

    let verification;
    //Jezeli rola ADMIN i accepted==false => wyswietl buttony ACCEPT or DELETE
    if (
      user.roles.some(e => e.authority === "ROLE_ADMIN") &&
      workshop.accepted === false
    ) {
      verification = (
        <div>
          <div style={{ background: "#fff0e6", borderRadius: 5 }}>
            <p style={{ marginBottom: 0 }}>Application:</p>
            <Link
              to={`/admin/pendingWorkshopList`}
              onClick={this.onAcceptWorkshopClick.bind(this, workshop.id)}
              className="btn btn-success"
            >
              <i className="fa fa-check fa-inverse">
                <span style={{ fontSize: "14px", fontFamily: "Verdana" }}>
                  {" "}
                  Accept
                </span>
              </i>
            </Link>{" "}
            <Link to={`/admin/pendingWorkshopList`} className="btn btn-danger">
              <i
                className="fa fa-trash fa-inverse"
                onClick={this.onDeleteClick.bind(this, workshop.id)}
              >
                <span style={{ fontSize: "14px", fontFamily: "Verdana" }}>
                  {" "}
                  Delete
                </span>
              </i>
            </Link>
          </div>
        </div>
      );
    }
    if (
      user.roles.some(e => e.authority === "ROLE_ADMIN") &&
      workshop.accepted === true
    ) {
      verification = (
        <div>
          <Link
            to={`/admin/pendingWorkshopList`}
            className="btn btn-danger"
            style={{ fontFamily: "sans-serif" }}
          >
            <i
              className="fa fa-trash fa-inverse"
              onClick={this.onDeleteClick.bind(this, workshop.id)}
            >
              <span style={{ fontSize: "14px", fontFamily: "Verdana" }}>
                {" "}
                Delete
              </span>
            </i>
          </Link>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="slider">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                </ol>
                <div
                  style={{ borderRadius: "0.25rem" }}
                  className="carousel-inner"
                >
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      style={{ height: "290px" }}
                      src="https://images.squarespace-cdn.com/content/v1/585c624ebe6594527e0c44e0/1543354184974-0US7H3GLPULRT97RK098/ke17ZwdGBToddI8pDm48kPTrHXgsMrSIMwe6YW3w1AZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0k5fwC0WRNFJBIXiBeNI5fKTrY37saURwPBw8fO2esROAxn-RKSrlQamlL27g22X2A/20181102_180557.jpg"
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      style={{ height: "290px" }}
                      src="https://plusfly.com/wp-content/uploads/2017/08/kamilkoc-otobus-bileti.jpg"
                      alt="Second slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      style={{ height: "290px" }}
                      src="https://www.biletbayi.com/Content/ContentItemDocument/images/manload/pamukkale-otobus.jpg"
                      alt="Third slide"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div className="olanaklar-kutu">
              <div className="olanaklar">
                <h4 className="pb-3 font-weight-bold">{workshop.name}</h4>
                <h6 className="font-weight-bold">Verified: {accepted}</h6>
                <ul className="yacht-info__list ">
                  <li>
                    <i className="fas fa-map-marker-alt mr-1" />
                    {workshop.address}
                  </li>
                  <li>
                    <i className="fas fa-phone mr-1" />
                    {workshop.telephone}
                  </li>
                  <li>
                    <i className="fas fa-user-circle mr-1" />
                    {workshop.address}
                  </li>
                  <li>
                    <i className="fas fa-user-circle mr-1" />
                    {workshop.address}
                  </li>
                </ul>
              </div>
              <div className="olanaklar margin-top--22">
                <h4 className="pb-3 font-weight-bold">Description</h4>
                <p>{workshop.description}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-body text-center ">
              <p>{verification}</p>
              <span className="badge badge-warning">{workshop.owner}</span>
              <p className="card-text">Applied at: {workshop.creationDate}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkshopProfile.propTypes = {
  getWorkshop: PropTypes.func.isRequired,
  workshop: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  acceptWorkshop: PropTypes.func.isRequired,
  deleteWorkshop: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  workshop: state.workshop,
  security: state.security
});

export default connect(
  mapStateToProps,
  { getWorkshop, acceptWorkshop, deleteWorkshop }
)(WorkshopProfile);
