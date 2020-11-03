/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RestaurantFinderApi from '../apis/RestaurantFinderApi'

const UpdateRestaurantPage = (props) => {
    const {id} = useParams(); 
    console.log(id)
    
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')

    let history = useHistory();

    async function getRestaurant(){
        try{
            const List = await RestaurantFinderApi.get(`restaurant/${id}`)
            console.log(List.data.data)
            setName(List.data.data.name)
            setLocation(List.data.data.location)
            setPriceRange(List.data.data.price_range)
        }
        catch (err) {
             console.log(err)
        }
    }

   useEffect(()=>{
     getRestaurant()
   },[])

   const handleSubmit = async (e) => {
       e.preventDefault();
       try{
         const UpdatedRest = await RestaurantFinderApi.put(`/restaurant/${id}`, {name, location, price_range: priceRange})
         console.log('update response', UpdatedRest.data)
         history.push("/")
       }
       catch (err) {
           console.log('update error', err)
       }
   }

    return (
        <div>
            <form action="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input id="location" className="form-control" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
            <div className="form-group">
                <label htmlFor="pricerange">Price Range</label>
                <input id="priceRange" className="form-control" type="number" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
                </div>
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurantPage
