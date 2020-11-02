const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/api/v1', (req, res) => res.send('Welcome to this awesome API!'));
app.get('/api/v1/restaurants', (req, res) => res.send('Get all restaurants'));
app.get('/api/v1/restaurant/:id', (req, res) => res.send('get one restaurant'));
app.post('/api/v1/restaurant', (req, res) => res.send('add restaurant'));
app.put('api/v1/restaurant/:id', (req, res) => res.send('update restaurant'));
app.delete('api/v1/restaurant/:id', (req, res) => res.send('delete restaurant'));



app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });