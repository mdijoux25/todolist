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
    const alltasks = await TaskModel.find(); // Fetch all tasks from the database
    res.render('index', { todos: alltasks }); 
  } catch (error) {
    console.error('DB connection error', error);
     res.status(500).json({ error: 'DB connection error' });
  }
});

app.post('/addtasks', async (req, res) => {
  try {
    const { name, title, description, priority } = req.body; 
    const task = new TaskModel({ name, title, description, priority });
  await task.save();
  res.redirect('/')
  } catch (error) {
    console.error('Error creating task', error);
    res.status(500).json({error: 'Error creating task.'});
  }
});

app.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await TaskModel.findByIdAndDelete(id);
    console.log( id+' Task deleted successfully.');
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting task', error);
     res.status(500).json({ error: 'Error deleting task.' });
  }
});

app.post('/edit/:id', async (req, res) => {
  try {
    const { id } =req.params;
    const { title, name, description, priority } = req.body;
    await TaskModel.findByIdAndUpdate(id, { title, name, description, priority });
    res.status(200).json({ message: +id+' Task updated successfully.' });
    
  } catch (error) {
    console.error('Error editing task', error);
    res.status(500).json({ error: 'Error editing task.' });
  }
});

app.listen(port, () => {
  console.log(`Program:\t${package.name}`)
  console.log(`Version:\t${package.version}`)
  console.log(`Author:\t\t${package.author}`)
  console.log(`\n-----------------------------------------`)
  console.log(`Starting server --> listening on port ${port}`)
  });
