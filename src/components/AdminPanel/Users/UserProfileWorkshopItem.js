import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserProfileWorkshopItem extends Component {
  render() {
    const { workshop } = this.props;
    let accepted;
    if (workshop.accepted === true)
      accepted = (
        <span className="badge badge-success">
          {workshop.accepted.toString()}
        </span>
      );
    else
      accepted = (
        <span className="badge badge-warning">
          {workshop.accepted.toString()}
        </span>
      );
    return (
      <tbody>
        <tr>
          <td>
            <Link to={`/workshopProfile/${workshop.id}`}>{workshop.name}</Link>
          </td>
          <td>{workshop.description}</td>
          <td>{workshop.address}</td>
          <td className="text-center">{accepted}</td>
          <td>{workshop.creationDate}</td>
        </tr>
      </tbody>
    );
  }
}

export default UserProfileWorkshopItem;
