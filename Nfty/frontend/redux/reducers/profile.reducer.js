import { IMAGE_UPLOAD } from '../types'

const INITIAL_STATE = {
    img: null
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case IMAGE_UPLOAD:
        return {
            ...state,
            img: action.payload
        };
      default:
        return { ...state };
    }
  };