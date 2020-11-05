import React, { useState } from 'react'

const AddReview = () => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')
    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group-col-8">
                        <label htmlFor="name">Name</label>
                        <input id="name" placeholder="name" type="text" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div className="form-group-col-4">
                        <label htmlFor="ratiing">Rating</label>
                        <select 
                        id="rating"  
                        className="custom-select"
                        value={rating} 
                        onChange={(e)=> setRating(e.target.value)}
                        >
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea id="review" className="form-control" value={review} onChange={(e)=> setReview(e.target.value)}></textarea>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview
