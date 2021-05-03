import { LOGGED_IN } from '../types'

const INITIAL_STATE = {
    logged_in: false,
  };
  
  export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
      case LOGGED_IN:
        return { logged_in: actions.payload };
      default:
        return { ...state };
    }
  };