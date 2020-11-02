const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

//routes
app.get('/api/v1', (req, res) => res.send('Welcome to this awesome API!'));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });