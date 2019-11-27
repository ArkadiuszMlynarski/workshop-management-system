import React, { Component } from "react";
import IssueTask from "./IssueTasks/IssueTask";

class Backlog extends Component {
  render() {
    const { issue_tasks_prop } = this.props;

    const tasks = issue_tasks_prop.map(issue_task => (
      <IssueTask key={issue_task.id} issue_task={issue_task} />
    ));

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].props.issue_task.status === "TO_DO") {
        todoItems.push(tasks[i]);
      }

      if (tasks[i].props.issue_task.status === "IN_PROGRESS") {
        inProgressItems.push(tasks[i]);
      }

      if (tasks[i].props.issue_task.status === "DONE") {
        doneItems.push(tasks[i]);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todoItems}
            {
              //<IssueTask />
            }
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
