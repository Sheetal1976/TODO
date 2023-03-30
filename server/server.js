const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
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
  const addQuery = `INSERT INTO tasks (tasks) VALUES ('${task}');
  `;
  connection.query(addQuery, [task], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding task');
    } else {
      res.send('Task added');
    }
  });
});

    
    app.delete('/deleteTask/:taskid', (req,res)=>{
      const DELETE_Query= `DELETE FROM todotaskmanager.tasks WHERE taskid=${req.params.taskid}`;
      connection.query(DELETE_Query, (err) => {
        if (err) {
          console.error(err);
          res.status(404).send("Delete unsuccessful");
        } else {
          res.send("Task Deleted");
        }
      });
    });
    
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
    
  
