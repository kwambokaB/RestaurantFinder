import React, { useContext, useState } from 'react'
import RestaurantFinderApi from '../apis/RestaurantFinderApi';
import { RestaurantContext } from '../context/RestaurantContext';

export const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState(0);
    const {addRestaurant} = useContext(RestaurantContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
        const response = await RestaurantFinderApi.post('/restaurant', {name, location, price_range: priceRange})
        console.log(response.data.data)
        addRestaurant(response.data.data)
        }
        catch (error){
            console.log('Post error', error)
        }
    }

    return (
        <div className="nb-4">
            <form action="">
             <div className="form-row">
                 <div className="col">
                 <input type="text" className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                 </div>
                 <div className="col">
                 <input type="text" className="form-control" placeholder="Locaton" value={location} onChange={e => setLocation(e.target.value)}/>
                 </div>
                 <div className="col">
                     <select className="custom-select my-1 mr-sm-2"  onChange={e => setPriceRange(e.target.value)}>
                         <option disabled>Price Range</option> 
                         <option value="1">$</option>
                         <option value="2">$$</option>
                         <option value="3">$$$</option>
                         <option value="4">$$$$</option>
                         <option value="5">$$$$$</option>
                     </select>
                 </div>
                 <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add</button>
             </div>
            </form>
        </div>
    )
}
