import React from 'react'
import StarRating from './StarRating'

const Review = ({reviews}) => {
    console.log(reviews)
    return (
        <div className="row row-cols-3 mb-2">
       { reviews.length ? 
       reviews.map((rev) => {
          return(
            <div className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: "30%"}} key={rev.id}>
            <div className="card-header d-flex justify-content-between">
                <span>{rev.name}</span>
                <span><StarRating rating={rev.rating}/></span>
            </div>
            <div className="card-body">
              <p className="card-text">{rev.review}</p>
            </div>
       </div>
          )
       }) : null}
        </div>
    )
}

export default Review
