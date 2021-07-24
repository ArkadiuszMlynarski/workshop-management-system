import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { acceptWorkshop, deleteWorkshop } from "../../../actions/adminActions";

class AcceptedWorkshopItem extends Component {
  onDeleteClick = id => {
    this.props.deleteWorkshop(id);
  };

  onAcceptWorkshopClick = id => {
    this.props.acceptWorkshop(id, this.props.history);
  };

  render() {
    const { workshop } = this.props;

    return (
      <tr>
        <td>
          <img
            src="https://media.istockphoto.com/vectors/car-repair-shop-station-repairman-auto-diagnostics-tools-mechanic-vector-id629496278?k=6&m=629496278&s=170667a&w=0&h=82qMxMIbIXDPzqHpg3k9TKBqApJUUPt2NR7ATu9ONB8="
            alt=""
          />
          <Link to={`/workshopProfile/${workshop.id}`} className="user-link">
            {workshop.name}
          </Link>
          <span className="user-subhead">{workshop.address}</span>
        </td>
        <td>{workshop.description}</td>
        <td>{workshop.creationDate}</td>
        <td className="text-center">
          <span className="label label-default">{workshop.telephone}</span>
        </td>
        <td className="text-center">
          <span className="badge badge-success">
            {workshop.accepted.toString()}
          </span>
        </td>
        <td>
          <Link to="">{workshop.owner}</Link>
        </td>
        <td className="text-center" style={{ width: "10%" }}>
          <Link to="acceptedWorkshopList" className="table-link danger">
            <span className="fa-stack">
              <i className="fa fa-square fa-stack-2x"></i>
              <i
                className="fa fa-trash fa-stack-1x fa-inverse"
                onClick={this.onDeleteClick.bind(this, workshop.id)}
              ></i>
            </span>
          </Link>
        </td>
      </tr>
    );
  }
}

AcceptedWorkshopItem.propTypes = {
  acceptWorkshop: PropTypes.func.isRequired,
  deleteWorkshop: PropTypes.func.isRequired
};

export default connect(
  null,
  { acceptWorkshop, deleteWorkshop }
)(AcceptedWorkshopItem);
