/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useContext} from 'react'
import RestaurantFinderApi from '../apis/RestaurantFinderApi'
import { RestaurantContext } from '../context/RestaurantContext'
import {useHistory} from 'react-router-dom'

export const RestaurantList = () => {
const {restaurants, setRestaurants} = useContext(RestaurantContext);
let history = useHistory()

async function getRestaurants(){
    try{
        const List = await RestaurantFinderApi.get("/restaurants")
        console.log(List.data.restaurants)
        setRestaurants(List.data.restaurants)
    }
    catch (err) {
         console.log(err)
    }
}

    useEffect(()=>{
       getRestaurants()
    }, [])

    const handleDelete = async(e, id) => {
        e.stopPropagation();
        try{
           const response = await RestaurantFinderApi.delete(`/restaurant/${id}`)
           console.log('delete response' , response)
           setRestaurants(restaurants.filter(rest => {
               return rest.id !== id
           }))
        }
        catch (err) {
           console.log('delete error', err)
        }

    }

    const handleUpdate = (e, id) => {
     e.stopPropagation();
     history.push(`/restaurant/${id}/update`)
    }
    const handleRestaurantSelect = (id) =>{
        history.push(`/restaurant/${id}`)
    }

    return (
        <div className="list-group">
          <table className="table table-hover table-dark">
              <thead>
                  <tr className="bg-primary">
                    <th scope="col">Retaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
              </thead>
              <tbody>
                  {restaurants ? 
                  restaurants.map(restaurant => {
                      return(
                          <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                              <td>{restaurant.name}</td>
                              <td>{restaurant.location}</td>
                              <td>{"$".repeat(restaurant.price_range)}</td>
                              <td>Reviews</td>
                              <td> <button className="btn btn-warning" onClick={(e) => handleUpdate(e, restaurant.id)}>Update</button></td>
                              <td> <button className="btn btn-danger" onClick={(e) => handleDelete(e, restaurant.id)}>Delete</button></td>
                          </tr>
                      )

                  }) 
                  : <p>No Restaurants Yet</p>
                  }
              </tbody>
          </table>
        </div>
    )
}
