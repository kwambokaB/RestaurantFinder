const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./Db');


const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/api/v1', (req, res) => res.send('Welcome to this awesome API!'));

app.get('/api/v1/restaurants', async (req, res) => {
    try{
        const result = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;") 
        res.status(200).json({
            status: 'success',
            results: result.rows.length,
            restaurants: result.rows
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            status: 'request failed',
            Error: e
        })
    }
   
});

app.get('/api/v1/restaurant/:id', async (req, res) => {
try {
   const restaurant =  await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", [req.params.id]);
   const reviews = await db.query('select * from reviews where restaurant_id = $1', [req.params.id]);
   console.log(reviews.rows)

   res.status(200).json({
       status: 'success',
       data: {
           restaurant: restaurant.rows[0],
           reviews: reviews.rows
       }
   });
}
catch (e) {
    console.log(e)
        res.status(500).json({
            status: ' request failed',
            Error: e
        })
}
});


app.post('/api/v1/restaurant', async(req, res) => {
 try{
     const newRestaurant = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range] )
     res.status(200).json({
        status: 'success',
        data: newRestaurant.rows[0]
    })
 }
 catch(e) {
    console.log(e)
    res.status(500).json({
        status: ' request failed',
        Error: e
    })
 }

});


app.put('/api/v1/restaurant/:id', async(req, res) => { 

    try{
        const updatedRestaurant = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
         [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            status: 'success',
            data: updatedRestaurant.rows[0]
        })
    } 

    catch(e) {
        console.log(e)
        res.status(500).json({
            status: 'request failed',
            Error: e
        })
    }

});


app.delete('/api/v1/restaurant/:id', async (req, res) => {
   try {
       const deleteRestaurant = await db.query('DELETE FROM restaurants where id = $1', [req.params.id]);

       res.status(200).json({
        status: 'success',
        data: deleteRestaurant
    })

   }
   catch (e) {

    console.log(e)
    res.status(500).json({
        status: 'request failed',
        Error: e
    })
   }
});

app.post('/api/v1/restaurant/:id/addReview', async(req, res) => {
    try{
const addedReview = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;', [req.params.id, req.body.name, req.body.review, req.body.rating])
res.status(200).json({
    status: 'Success',
    data:{
        review: addedReview.rows[0]
    }
})
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            status: 'request failed',
            Error: err
        })
    }
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });