import React, { Component } from "react";

class TabItem extends Component {
  render() {
    const { workshop } = this.props;
    return (
      <li class="nav-item">
        <a
          class="nav-link"
          id={`${workshop.name.replace(/\s/g, "")}-tab`}
          data-toggle="tab"
          href={`#${workshop.name.replace(/\s/g, "")}`}
          role="tab"
          aria-controls={workshop.name.replace(/\s/g, "")}
          aria-selected="false"
        >
          <i class="fas fa-angle-right"></i> {workshop.name}
        </a>
      </li>
    );
  }
}

export default TabItem;
