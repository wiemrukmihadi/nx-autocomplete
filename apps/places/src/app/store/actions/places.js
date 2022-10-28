import {
  FETCH_PLACES_ERROR,
  FETCH_PLACES_START,
  FETCH_PLACES_SUCCESS,
 
} from '../actionTypes';

export function fetchAPIStart() {
  return {
    type: FETCH_PLACES_START,
  };
}

export function fetchAPISuccess(payload) {
  return {
    type: FETCH_PLACES_SUCCESS,
    payload,
  };
}

export function fetchAPIError() {
  return {
    type: FETCH_PLACES_ERROR,
  };
}

