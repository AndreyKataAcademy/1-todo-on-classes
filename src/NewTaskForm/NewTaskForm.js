import React from "react";

class NewTaskForm extends React.Component {
  state = {
    name: "",
    minutes: "",
    seconds: "",
  };
  render() {
    const { onAddTask } = this.props;
    return (
      <form
        className="new-todo-form"
        onKeyDown={event => {
          if (
            event.key !== "Enter" ||
            this.state.name.length < 2 ||
            (this.state.seconds === "" && this.state.minutes === "")
          )
            return;
          onAddTask(this.state);
          this.setState({ name: "", seconds: "", minutes: "" });
        }}
      >
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          value={this.state.name}
          onChange={event => this.setState({ name: event.target.value })}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.minutes}
          onChange={event => {
            if (event.target.value >= 0)
              this.setState({ minutes: event.target.value });
          }}
          type="number"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.seconds}
          onChange={event => {
            if (event.target.value >= 0)
              this.setState({ seconds: event.target.value });
          }}
          type="number"
        />
      </form>
    );
  }
}

export default NewTaskForm;
