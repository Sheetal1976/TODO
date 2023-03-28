import React from 'react';
import axios from 'axios';
import '../App.css'

class Tasklist extends React.Component {
  state = {
    task: '',
    tasklist: [],
    
  };
 
  componentDidMount(){
    this.getTask();
  }

 

  getTask = () => {
    axios.get('http://localhost:8080/tasks').then((res) => {
      this.setState({ tasklist: res.data });
    });
  };

  onDeleteClick = taskid => {
    axios.delete(`http://localhost:8080/deleteTask/${taskid}`)
    this.getTask();
  };

  onDoneClick = (taskid) => {
    const taskIndex = this.state.tasklist.findIndex((task) => task.taskid === taskid);
    const updatedTask = { ...this.state.tasklist[taskIndex], completed: !this.state.tasklist[taskIndex].completed };
    const updatedTasklist = [...this.state.tasklist];
    updatedTasklist[taskIndex] = updatedTask;
    this.setState({ tasklist: updatedTasklist });
  }

  onSubmitClick = () => {
    axios.post('http://localhost:8080/addTask', {
      task: this.state.task,
    });
    
    this.setState({task:''})
    this.getTask();
  };

  render() {
    console.log(this.state.task);
    return (
      <div className='parent'>
        <h3>Tasklist</h3>
        <div className='ui input input-field'>
          <input
            value={this.state.task}
            onChange={(e) =>
              this.setState({
                task: e.target.value,
              })
            }
            placeholder='your task...'
          />
        </div>

        <button
          className='big ui black button'
          onClick={() => this.onSubmitClick()}
        >
          Submit
        </button>
        <hr /> <hr />
        <div className='ui cards'>
          {this.state.tasklist.map((task) => (
            <div className={`card ${task.completed ? 'completed' : ''}`} key={task.taskid}>
              <div className='content'>
                <div className='meta'>{task.tasks}</div>
              </div>
              <div className='extra content'>
                <div className='ui two buttons'>
                  <div className='ui basic green button' onClick={() => this.onDoneClick(task.taskid)}>Done</div>
                  <div
                    className='ui basic red button'
                    onClick={() => this.onDeleteClick(task.taskid)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Tasklist;