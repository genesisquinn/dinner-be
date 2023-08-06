const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
const dotenv = require('dotenv');
const authRouter = require('./routes/oauth');
const requestRouter = require('./routes/request');
const cors = require('cors');



dotenv.config()

const app = express();
const corsOptions = {
    // origin: 'https://dinnermadeeasy.netlify.app'
    origin: 'http://localhost:5173'
}
const PORT = process.env.PORT || 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;



mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));


app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/recipes', recipeRoutes);
app.use('/oauth', authRouter);
app.use('/request', requestRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});