const mongoose = require('mongoose');

const mongoDbUrl = 'mongodb://localhost/toDoList'; // Replace with your MongoDB URL

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDatabase;