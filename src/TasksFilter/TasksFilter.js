import React from "react";

class TasksFilter extends React.Component {
  render() {
    const filtered = this.props.filtered;
    const onChangeFilter = this.props.onChangeFilter;
    return (
      <footer className="footer">
        <span className="todo-count">
          {this.props.countNotCompletedTasks > 0
            ? `${this.props.countNotCompletedTasks} items left`
            : "All tasks completed"}
        </span>
        <ul className="filters">
          <li>
            <button
              disabled={filtered === "all"}
              className={filtered === "all" ? "selected" : ""}
              onClick={() => onChangeFilter("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              disabled={filtered === "active"}
              className={filtered === "active" ? "selected" : ""}
              onClick={() => onChangeFilter("active")}
            >
              Active
            </button>
          </li>
          <li>
            <button
              disabled={filtered === "completed"}
              className={filtered === "completed" ? "selected" : ""}
              onClick={() => onChangeFilter("completed")}
            >
              Completed
            </button>
          </li>
        </ul>
        {this.props.countCopmletedTasks > 0 ? (
          <button
            className="clear-completed"
            onClick={this.props.onDeleteCompletedTasks}
          >
            Clear {this.props.countCopmletedTasks} completed tasks
          </button>
        ) : (
          "No tasks for removing"
        )}
      </footer>
    );
  }
}
export default TasksFilter;
