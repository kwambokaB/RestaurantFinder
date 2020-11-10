/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinderApi from '../apis/RestaurantFinderApi';
import AddReview from '../components/AddReview';
import Review from '../components/Review';
import StarRating from '../components/StarRating';
import { RestaurantContext } from '../context/RestaurantContext';

export const RestaurantDetails = () => {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext);

    const fetchData = async () => {
        try{
            const response = await RestaurantFinderApi.get(`/restaurant/${id}`)
            console.log('restaurant details response', response.data.data)
            // selectedRestaurant(response.data.data)
            setSelectedRestaurant(response.data.data)
            
          
        }
        catch (err) {
            console.log('restaurant details error', err)
        }
    }

    useEffect(()=> {  
      fetchData()
    }, [])

    return (
        <div>

           {selectedRestaurant && (
              <>
               <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1> 
              <div className="mt-3">
                  <Review reviews={selectedRestaurant.reviews}/>
              </div>
              <AddReview />
              </>
            )} 
            
        </div>
    )
}
