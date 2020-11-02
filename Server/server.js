const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./Db')

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/api/v1', (req, res) => res.send('Welcome to this awesome API!'));

app.get('/api/v1/restaurants', async (req, res) => {
    try{
        const result = await db.query('select * from restaurants') 
        res.status(200).json({
            status: 'success',
            results: result.rows.length,
            restaurants: result.rows
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'failed',
            Error: e
        })
    }
   
});
app.get('/api/v1/restaurant/:id', (req, res) => res.send('get one restaurant'));
app.post('/api/v1/restaurant', (req, res) => res.send('add restaurant'));
app.put('api/v1/restaurant/:id', (req, res) => res.send('update restaurant'));
app.delete('api/v1/restaurant/:id', (req, res) => res.send('delete restaurant'));



app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });