const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;


mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/recipes', recipeRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});