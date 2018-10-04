import { LOGIN_USER, FETCH_USER, CREATE_USER } from '../actions/index';

const INITIAL_STATE = { user: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
        case LOGIN_USER:
        return { ...state, user: action.payload.data };
        case FETCH_USER:
        return { ...state, user: action.payload.data };
        case CREATE_USER:
        return { ...state, user: action.payload.data };
        default:
        return state;
  }
}
