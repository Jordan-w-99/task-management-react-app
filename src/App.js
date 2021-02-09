import './App.css';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      dragPos: { top: 0, left: 0, x: 0, y: 0 }
    }
  }

  render() {
    return (
      <div className="app" id="app" onMouseDownCapture={this.mouseDown} onMouseMove={this.mouseMove} onMouseUpCapture={this.mouseUp}>
        <Columns />
      </div>
    );
  }

  mouseDown = (e) => {
    if ((e.target.id === "app" || e.target.id === "columns") && this.state.dragging === false) {
      let updatedState = this.state;
      const appElem = document.getElementById("app");

      updatedState.dragPos = {
        // The current scroll 
        left: appElem.scrollLeft,
        top: appElem.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };
      updatedState.dragging = true;

      this.setState(updatedState);
    }
  }

  mouseMove = (e) => {
    if ((e.target.id === "app" || e.target.id === "columns") && this.state.dragging === true) {
      const appElem = document.getElementById("app");

      // How far the mouse has been moved
      const dx = e.clientX - this.state.dragPos.x;
      const dy = e.clientY - this.state.dragPos.y;

      // Scroll the element
     
      appElem.scrollTop = this.state.dragPos.top - dy;
      appElem.scrollLeft = this.state.dragPos.left - dx;
    }
  }

  mouseUp = (e) => {
    if ((e.target.id === "app" || e.target.id === "columns") && this.state.dragging === true) {
      let updatedState = this.state;
      updatedState.dragging = false;
      this.setState(updatedState);
    }
  }
}

class Columns extends React.Component {
  constructor(props) {
    super(props);
    this.state = { columns: JSON.parse(localStorage.getItem("userData")) };
  }

  save = () => {
    localStorage.setItem("userData", JSON.stringify(this.state.columns));
  }

  moveTask = (colId, taskId) => {
    const oldCol = taskId.split("-")[0];
    const oldRow = taskId.split("-")[1];
    const task = this.state.columns[oldCol].tasks[oldRow];

    let updatedState = this.state;
    updatedState.columns[oldCol].tasks.splice(oldRow, 1); // Remove from old col
    updatedState.columns[colId].tasks.push(task); // Add to new col

    this.save();
    this.setState(updatedState);
  }

  deleteTask = (input) => {
    const id = input.target.id;
    const col = id.split("-")[0];
    const row = id.split("-")[1];

    let updatedState = this.state;
    updatedState.columns[col].tasks.splice(row, 1);

    this.save();
    this.setState(updatedState);
  }

  deleteColumn = (col) => {
    let updatedState = this.state;
    updatedState.columns.splice(col, 1);

    this.save();
    this.setState(updatedState);
  }

  updateTaskTitle = (taskId, value) => {
    const id = taskId;
    const col = id.split("-")[0];
    const row = id.split("-")[1];

    let updatedState = this.state;
    updatedState.columns[col].tasks[row].title = value;

    this.save();
    this.setState(updatedState);
  }

  updateTitle = (colId, value) => {
    let updatedState = this.state;
    updatedState.columns[colId].title = value;

    this.save();
    this.setState(updatedState);
  }

  newTask = (input) => {
    const col = input.target.id.split("-")[1];

    let updatedState = this.state;
    updatedState.columns[col].tasks.push({ title: "" });

    this.save();
    this.setState(updatedState);
  }

  newColumn = () => {
    let updatedState = this.state;
    updatedState.columns.push(
      {
        title: "",
        tasks: []
      }
    );

    this.save();
    this.setState(updatedState);
  }

  render() {
    return (
      <div className="columns" id="columns">

        {this.state.columns.map((value, index) => {
          return (
            <Column
              key={index}
              colId={index}
              title={value.title}
              tasks={value.tasks}
              deleteColumn={this.deleteColumn}
              deleteTask={this.deleteTask}
              updateTitle={this.updateTitle}
              updateTaskTitle={this.updateTaskTitle}
              newTask={this.newTask}
              moveTask={this.moveTask}
            />
          )
        })}

        <NewColumn clicked={this.newColumn} />
      </div>
    );
  }
}

class Column extends React.Component {
  delete = () => {
    this.props.deleteColumn(this.props.colId);
  }

  render() {
    return (
      <div className="column droppable" id={`column-${this.props.colId}`} onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e, this.props.colId)}>
        <ColumnTitle title={this.props.title} colId={this.props.colId} updateTitle={this.props.updateTitle} defaultEdit={this.props.title === "" ? true : false} />
        <Tasks tasks={this.props.tasks} colId={this.props.colId} delete={this.props.deleteTask} updateTaskTitle={this.props.updateTaskTitle} />

        <div className="column-options">
          <NewTask clicked={this.props.newTask} colId={this.props.colId} />
          <EditButton icon={faTrash} editing={true} clicked={this.delete} />
        </div>
      </div>
    );
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, colId) => {
    let taskId = e.dataTransfer.getData("taskId");

    this.props.moveTask(colId, taskId);
  }
}

class ColumnTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.defaultEdit
    }
  }

  startEditing = () => {
    this.setState({ editing: true });
  }

  updateTitle = (colId, value) => {
    this.props.updateTitle(colId, value);
  }

  stopEditing = (e, colId, inpElem) => {
    if (e.type === "blur" || (e.type === "keypress" && e.code === "Enter")) {
      if (inpElem.value === "") this.updateTitle(colId, "Untitled Task.");
      this.setState({ editing: false });
    }
  }

  render() {
    if (this.state.editing === true) {
      return (
        <input
          autoFocus
          type="text"
          placeholder="Enter Column Title"
          value={this.props.title}
          onChange={(e) => this.updateTitle(this.props.colId, e.target.value)}
          onKeyPress={(e) => this.stopEditing(e, this.props.colId, e.target)}
          onBlur={(e) => this.stopEditing(e, this.props.colId, e.target)}
          className="column-title column-title-input"
          id="activeInput"
        />
      );
    }
    else {
      return (
        <h3 className="column-title" id={`title-${this.props.colId}`} onClick={this.startEditing}>{this.props.title}</h3>
      );
    }
  }
}

class Tasks extends React.Component {
  render() {
    return (
      <div className="tasks-list">
        {this.props.tasks.map((value, index) => {
          return (
            <Task
              key={index}
              defaultEdit={value.title === "" ? true : false}
              taskId={`${this.props.colId}-${index}`}
              title={value.title}
              delete={this.props.delete}
              updateTaskTitle={this.props.updateTaskTitle}
            />
          )
        })}
      </div>
    );
  }
}

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.defaultEdit
    }
  }

  updateTaskTitle = (taskId, value) => {
    this.props.updateTaskTitle(taskId, value);
  }

  stopEditing = (e, taskId, inpElem) => {
    if (e.type === "click" || e.type === "mouseleave" || (e.type === "keypress" && e.code === "Enter")) {
      if (inpElem.value === "") this.updateTaskTitle(taskId, "Untitled Task.");

      this.setState({ editing: false });
    }
  }

  delete = (e) => {
    if (e.button === 2 && this.state.editing === false) this.props.delete(e);
  }

  edit = (e) => {
    if (e.button === 0) this.setState({ editing: true });
  }

  componentDidMount() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  };

  onDragStart(e, taskId) {
    e.dataTransfer.setData("taskId", taskId);
  }

  render() {
    if (this.state.editing === true) {
      return (
        <div className="task-card" id={this.props.taskId} onMouseLeave={(e) => this.stopEditing(e, this.props.taskId, document.getElementById("activeInput"))} onMouseDownCapture={this.delete} onKeyPress={(e) => this.stopEditing(e, this.props.taskId, document.getElementById("activeInput"))}>
          <input autoFocus type="text" placeholder="Enter A Task Name" value={this.props.title} onChange={(e) => this.updateTaskTitle(this.props.taskId, e.target.value)} className="task-title task-title-input" id="activeInput" />
          <EditButton editing={true} clicked={(e) => this.stopEditing(e, this.props.taskId, document.getElementById("activeInput"))} />
        </div>
      );
    }
    else {
      return (
        <div draggable className="task-card draggable" id={this.props.taskId} onMouseDownCapture={this.delete} onDragStart={(e) => this.onDragStart(e, this.props.taskId)}>
          <div className="task-title" id={this.props.taskId}>{this.props.title}</div>
          <EditButton editing={false} clicked={this.edit} />
        </div>
      );
    }
  }
}

class EditButton extends React.Component {
  render() {
    if (this.props.icon) {
      return (
        <button className="edit-task-button" onClick={this.props.clicked} style={{ opacity: 1 }}>
          <FontAwesomeIcon icon={this.props.icon} />
        </button>
      );
    }
    else if (this.props.editing === true) {
      return (
        <button className="edit-task-button" onClick={this.props.clicked} style={{ opacity: 1 }}>
          <FontAwesomeIcon icon={faSave} />
        </button>
      );
    }
    else {
      return (
        <button className="edit-task-button" onClick={this.props.clicked}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      );
    }
  }
}

class NewTask extends React.Component {
  render() {
    return (
      <button className="new-task-button" onClick={this.props.clicked} id={`newTask-${this.props.colId}`}>+ New Task</button>
    );
  }
}

class NewColumn extends React.Component {
  render() {
    return (
      <button className="new-column-button" onClick={this.props.clicked}>+ New Column</button>
    );
  }
}

export default App;