const express = require('express');
const app = express();
const cors = require('cors');
const Port = 8080;
const connection = require('./db');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

//routes
app.get('/tasks', (req, res) => {
  const taskQuery = "SELECT * FROM todotaskmanager.tasks";
  connection.query(taskQuery, (err, resp) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching tasks");
    } else {
      res.send(resp);
    }
  });
});

app.post('/addTask', (req, res) => {
  const task = req.body.task;
  const addQuery = `INSERT INTO todotaskmanager.tasks (tasks) VALUES ('${task}')`;
  connection.query(addQuery, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding task");
    } else {
      res.send("Task added");
    }
  });
});

 app.delete('/deleteTask/:taskid', (req,res)=>{
    
    const DELETE_Query= `delete from todotaskmanager.tasks where(taskid=${req.params.taskid})`
    connection.query(DELETE_Query, (err) => {
        if (err) {
          console.error(err);
          res.status(404).send("Delete unsuccesful");
        } else {
          res.send("Task Deleted");
        }
      });
 })


app.listen(Port, () => {
  console.log(`Server listening at http://localhost:${Port}`);
});
