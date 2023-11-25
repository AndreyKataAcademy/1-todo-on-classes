import React from 'react';
import Task from '../Task/Task';

class TaskList extends React.Component {
  render() {
    const filtered = this.props.filtered;
    const { taskList } = this.props;
    return (
      <ul className="todo-list">
        {filtered === 'all' &&
          taskList.map((task, index) => (
            <Task
              task={task}
              taskIndex={index}
              onDoneTask={this.props.onDoneTask}
              onDeleteTask={this.props.onDeleteTask}
              onControlTimer={this.props.onControlTimer}
              onCompleteEditTask={this.props.onCompleteEditTask}
              onEditTask={this.props.onEditTask}
              onChangeName={this.props.onChangeName}
              key={index}
            />
          ))}
        {filtered === 'active' &&
          taskList
            .filter(task => task.isDone)
            .map((task, index) => (
              <Task
                task={task}
                taskIndex={index}
                onDoneTask={this.props.onDoneTask}
                onDeleteTask={this.props.onDeleteTask}
                onControlTimer={this.props.onControlTimer}
                onCompleteEditTask={this.props.onCompleteEditTask}
                onEditTask={this.props.onEditTask}
                onChangeName={this.props.onChangeName}
                key={index}
              />
            ))}
        {filtered === 'completed' &&
          taskList
            .filter(task => !task.isDone)
            .map((task, index) => (
              <Task
                task={task}
                taskIndex={index}
                onDoneTask={this.props.onDoneTask}
                onDeleteTask={this.props.onDeleteTask}
                onControlTimer={this.props.onControlTimer}
                onCompleteEditTask={this.props.onCompleteEditTask}
                onEditTask={this.props.onEditTask}
                onChangeName={this.props.onChangeName}
                key={index}
              />
            ))}
      </ul>
    );
  }
}
export default TaskList;
