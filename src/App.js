import './App.css';
import React from 'react';

import NewTaskForm from './NewTaskForm/NewTaskForm';
import TaskList from './TaskList/TaskList';
import TasksFilter from './TasksFilter/TasksFilter';

class App extends React.Component {
  state = {
    taskList: [],
    filtered: 'all',
    timer: 32,
    isStartTimer: true,
    timerStart: null,
  };

  handleAddTask = task => {
    this.setState({
      taskList: [
        ...this.state.taskList,
        {
          name: task.name,
          timeCreated: Date.now(),
          isDone: false,
          timer: Number(task.minutes) * 60 + Number(task.seconds),
          isStartTimer: true,
          isEdition: false,
        },
      ],
    });
  };
  handleChangeName = (event, index) => {
    this.setState(previousState => {
      const result = previousState.taskList;
      result.at(index).name = event.target.value;

      return {
        taskList: [...previousState.taskList],
      };
    });
  };
  handleDoneTask = index => {
    this.setState(previousState => {
      if (!previousState.taskList.at(index).isDone) this.handleControlTimer('pause', index);
      if (previousState.taskList.at(index).isDone) this.handleControlTimer('play', index);
      previousState.taskList.at(index).isDone = !previousState.taskList.at(index).isDone;

      return {
        taskList: [...previousState.taskList],
      };
    });
  };
  handleEditTask = index => {
    this.setState(previousState => {
      const result = previousState.taskList;
      previousState.taskList[index].isEdition = true;
      return {
        taskList: [...result],
      };
    });
  };
  handleCompleteEditTask = index => {
    this.setState(previousState => {
      const result = previousState.taskList;
      previousState.taskList[index].isEdition = false;
      return {
        taskList: [...result],
      };
    });
  };
  handleDeleteTask = index => {
    this.setState(previousState => {
      const result = previousState.taskList;
      result.splice(index, 1);
      return {
        taskList: [...result],
      };
    });
  };
  handleControlTimer = (action, id) => {
    this.setState(previousState => {
      if (action === 'play') previousState.taskList.at(id).isStartTimer = true;
      if (action === 'pause') previousState.taskList.at(id).isStartTimer = false;
    });
  };
  handleDeleteCompletedTasks = () => {
    this.setState({
      taskList: this.state.taskList.filter(task => !task.isDone),
    });
  };

  handleChangeFilter = filter => {
    localStorage.setItem('endtimer', Date.now());
    this.setState({
      filtered: filter,
    });
  };

  componentDidUpdate() {
    localStorage.setItem('endtimer', Date.now());
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      localStorage.setItem('starttimer', Date.now());
      const delay = (Number(localStorage.getItem('starttimer')) - Number(localStorage.getItem('endtimer'))) / 1000;
      const result = this.state.taskList;
      result.forEach(element => {
        if (element.timer <= 0) {
          element.isDone = true;
          element.isStartTimer = false;
          element.timer = 0;
        }
        if (element.isStartTimer) {
          element.timer -= delay;
        }
      });
      this.setState({
        taskList: [...result],
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  render() {
    const countNotCompletedTasks = this.state.taskList.filter(task => !task.isDone).length;
    const countCopmletedTasks = this.state.taskList.filter(task => task.isDone).length;
    return (
      <>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm onAddTask={this.handleAddTask} />
          </header>
          <section className="main">
            <TaskList
              taskList={this.state.taskList}
              onDoneTask={this.handleDoneTask}
              onDeleteTask={this.handleDeleteTask}
              filtered={this.state.filtered}
              onControlTimer={this.handleControlTimer}
              onEditTask={this.handleEditTask}
              onCompleteEditTask={this.handleCompleteEditTask}
              onChangeName={this.handleChangeName}
            />
            <TasksFilter
              filtered={this.state.filtered}
              onChangeFilter={this.handleChangeFilter}
              onDeleteCompletedTasks={this.handleDeleteCompletedTasks}
              countNotCompletedTasks={countNotCompletedTasks}
              countCopmletedTasks={countCopmletedTasks}
            />
          </section>
        </section>
      </>
    );
  }
}

export default App;
