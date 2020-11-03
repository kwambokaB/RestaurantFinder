import React from 'react'
import  {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { RestaurantDetails } from './routes/RestaurantDetails'
import { Home } from './routes/Home'
import { UpadateRestaurant } from './routes/UpadateRestaurant'
import { RestaurantContextProvider } from './context/RestaurantContext'

export const App = () => {
  return (
    <RestaurantContextProvider>
    <div className ="container">
      <Router>
      <Switch>
        <Route exact path= "/" component={Home} />
        <Route exact path= "/restaurant/:id" component={RestaurantDetails} />
        <Route exact path= "/restaurant/:id/update" component={UpadateRestaurant} />
        </Switch>
      </Router>
    </div>
    </RestaurantContextProvider>
  )
}
