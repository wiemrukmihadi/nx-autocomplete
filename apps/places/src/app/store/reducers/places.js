import {
    FETCH_PLACES_START,
    FETCH_PLACES_SUCCESS,
    FETCH_PLACES_ERROR,
  } from '../actionTypes';
  
  const initialState = {
    loading: false,
    data: [],
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_PLACES_START: {
        return {
            ...state,
            loading: true,
        };
      }
      case FETCH_PLACES_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      }
      case FETCH_PLACES_ERROR:
        return initialState;
      case 'persist/REHYDRATE':
        return initialState;
      default:
        return state;
    }
  }
  