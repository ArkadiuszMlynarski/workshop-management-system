import React from "react";
import { Link } from "react-router-dom";

const CreateIssueButton = () => {
  return (
    <React.Fragment>
      <Link
        to="/addIssue"
        href="ProjectForm.html"
        className="btn btn-lg btn-info float-right"
      >
        Create a Issue
      </Link>
    </React.Fragment>
  );
};
export default CreateIssueButton;
