const express = require('express');
const bodyParser = require ('body-parser');
const connectToDatabase = require('../libraries/db');
const package = require('../package.json');
const Task = require ("./models/tasks")
const TaskModel = Task.model;

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async(req,res) => {
  try {
    await connectToDatabase();
    TaskModel.find().then((alltasks) =>{
      res.status(200).send(alltasks)
    });
    
  }catch (error){
    console.error('DB connection error', error);
     res.status(500).json({ error: 'DB connection error' });
  }
});


app.listen(port, () => {
  console.log(`Program:\t${package.name}`)
  console.log(`Version:\t${package.version}`)
  console.log(`Author:\t\t${package.author}`)
  console.log(`\n-----------------------------------------`)
  console.log(`Starting server --> listening on port ${port}`)
  });
