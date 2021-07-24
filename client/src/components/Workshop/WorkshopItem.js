import React, { Component } from "react";
import "./WorkshopItem.css";
import { Link } from "react-router-dom";

class WorkshopItem extends Component {
  render() {
    const { workshop } = this.props;

    let statusCheck;
    if (workshop.accepted === true)
      statusCheck = (
        <span
          class="badge bg-success fw-normal float-right"
          style={{ color: "white" }}
        >
          Accepted
        </span>
      );
    else
      statusCheck = (
        <span
          class="badge bg-warning fw-normal float-right"
          style={{ color: "white" }}
        >
          Pending
        </span>
      );

    return (
      <div style={{ paddingBottom: "15px" }}>
        <section
          class="search-result-item"
          style={{ boxShadow: "0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16)" }}
        >
          <div class="image-link" style={{ width: "170px" }}>
            <img
              class="image"
              src="https://cdn2.iconfinder.com/data/icons/mechanic-light/64/tools_repair_mechanican_car_repair_garage_car_workshop-512.png"
              alt="im"
            />
          </div>
          <div class="search-result-item-body">
            <div class="row">
              <div class="col-sm-9">
                <h4 class="search-result-item-heading">
                  <Link to={`/workshopProfile/${workshop.id}`}>
                    {workshop.name}
                  </Link>{" "}
                  {statusCheck}
                </h4>
                <p class="info">{workshop.address}</p>
                <p class="description">
                  <b>Description: </b>
                  {workshop.description}
                </p>
              </div>
              <div class="col-sm-3 text-align-center">
                <p class="fs-mini text-muted">
                  <b>Created</b>: {workshop.creationDate}
                </p>

                <Link
                  to={`/workshopProfile/${workshop.id}`}
                  class="btn btn-primary btn-info btn-sm float-right"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default WorkshopItem;
