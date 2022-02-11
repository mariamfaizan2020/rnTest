import {combineReducers} from 'redux'
import {user} from './user'
import {events} from './events'



const Reducers = combineReducers({
    userState:user,
    eventState:events
  



})
export default Reducers