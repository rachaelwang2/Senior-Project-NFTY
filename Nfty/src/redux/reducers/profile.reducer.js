import { IMAGE_UPLOAD, IMAGES_FETCHED } from '../types'

const INITIAL_STATE = {
    img: null,
    images: [],
    wallet: null,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case IMAGE_UPLOAD:
        return {
            ...state,
            img: action.payload.imageUrl,
            images: [...state.images, action.payload]
        };
      case IMAGES_FETCHED:
        return {
            ...state,
            images: action.payload
        };
      default:
        return { ...state };
    }
  };
