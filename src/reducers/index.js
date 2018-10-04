import { combineReducers } from 'redux';
import userReducer from './reducer_users';
//get all reducers and pass it on to each component when called
const rootReducer = combineReducers({
user: userReducer,
});

export default rootReducer;
