import {combineReducers} from 'redux'
import {user} from './user'
import {events} from './events'
import { bookings } from './bookings'






const Reducers = combineReducers({
    userState:user,
    eventState:events,
    bookingState:bookings
    
  

  



})
export default Reducers