import React, { Component } from "react";
import { Link } from "react-router-dom";
import diag from "../../Workshop/Issues/diag.png";

export default class OfferedIssueItem extends Component {
  render() {
    let image;
    const { issue } = this.props;
    if (issue.type === "DIAGNOSTICS") image = diag;
    if (issue.type === "ENGINE")
      image =
        "https://cdn3.iconfinder.com/data/icons/auto-workshop-glyph-silhouettes/300/16317451Untitled-3-512.png";
    if (issue.type === "TRANSMISSION")
      image =
        "https://cdn0.iconfinder.com/data/icons/outline-car-parts/32/Car_automobile_part-69-512.png";
    if (issue.type === "SUSPENSION")
      image =
        "https://cdn0.iconfinder.com/data/icons/car-service-41/64/suspension-vehicle-car-auto-512.png";
    if (issue.type === "ELECTRONICS")
      image =
        "https://cdn4.iconfinder.com/data/icons/computer-hardware-and-devices-1/512/cpu-512.png";
    if (issue.type === "OTHER")
      image =
        "https://cdn2.iconfinder.com/data/icons/eshop-outline-pack/100/Noun_Project_20Icon_5px_grid-13-512.png";

    return (
      <div className="cart-item d-md-flex justify-content-between">
        <div className="px-3 my-3">
          <Link
            to={`../issueBoard/${issue.issueId}`}
            className="cart-item-product"
          >
            <div className="cart-item-product-thumb" style={{ width: "100px" }}>
              <img src={image} alt="im" />
            </div>
            <div
              className="cart-item-product-info"
              style={{ paddingLeft: "25px" }}
            >
              <h4 className="cart-item-product-title">{issue.title}</h4>
              <span style={{ lineHeight: "15px" }}>
                <strong>Type:</strong> {issue.type}
              </span>
              <span style={{ lineHeight: "15px" }}>
                <strong>Car:</strong> {issue.carModel}
              </span>
              <span style={{ lineHeight: "15px" }}>
                <strong>Description:</strong> {issue.description}
              </span>
              <span style={{ lineHeight: "15px" }}>
                <strong>Localization:</strong> {issue.localization}
              </span>
            </div>
          </Link>
        </div>
        <div className=" my-3 text-center">
          <div className="cart-item-label">Start date</div>
          <span className="text-xl font-weight-medium">{issue.dateFrom}</span>
        </div>
        <div className=" my-3 text-center">
          <div className="cart-item-label">End date</div>
          <span className="text-xl font-weight-medium">{issue.dateTo}</span>
        </div>
      </div>
    );
  }
}
