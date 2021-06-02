import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_FAILURE, SIGNUP_SUCCESS, LOGGED_OUT } from '../types'

const INITIAL_STATE = {
    logged_in: false,
    user: undefined,
    errMess: '',
    signup: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        console.log(action.payload)
        return {
            ...state,
            logged_in: true,
            user: action.payload, 
            errMess: '',
        };
      case LOGIN_FAILURE:
        return {
            ...state,
            logged_in: false,
            errMess: action.payload
        };  
      case SIGNUP_FAILURE:
        return {
            ...state,
            signup: false,
            errMess: action.payload
        };  
      case SIGNUP_SUCCESS:
        return {
            ...state,
            signup: true,
            errMess: '',
        };  
      case LOGGED_OUT:
        return {
            ...state,
            logged_in: false,
            user: undefined,
            signup: false,
        };  
      default:
        return { ...state };
    }
  };