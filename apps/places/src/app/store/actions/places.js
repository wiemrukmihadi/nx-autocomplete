import { ofType } from 'redux-observable';
import { catchError, delay, from, map, mergeMap, Observable, of, takeUntil } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import {
  FETCH_PLACES_ERROR,
  FETCH_PLACES_START,
  FETCH_PLACES_SUCCESS,
 
} from '../actionTypes';

export const fetchAddress = (_service, _request, _googleMap) => ({ 
    type: FETCH_PLACES_START, 
    service: _service,
    request: _request,
    googleMap: _googleMap,
  });

// const fetchAPISuccess = (payload) => async (dispatch) => {
//     dispatch({
//       FETCH_PLACES_SUCCESS,
//       payload,
//     })
//   }
//   const fetchAPIError = (payload) => async (dispatch) => {
//     dispatch({
//       FETCH_PLACES_ERROR,
      
//     })
//   }
const fetchAPISuccess = payload => ({ type: FETCH_PLACES_SUCCESS, payload });
const fetchAPIError = () => ({type: FETCH_PLACES_ERROR});

const getAddress = (_action) =>  { 
  
  return new Promise((_resolve, _reject ) =>  _action.service.findPlaceFromQuery(
    _action.request, 
    ( results, status ) => {
      // _resolve(results)
        if (status === _action.googleMap.places.PlacesServiceStatus.OK && results) {
          const prediction = results?.map((predictionItem) => ({
                        location: predictionItem.geometry.location,
                        formatted_address: predictionItem.formatted_address,
                        name: predictionItem.name,
              }),
          );
          console.log(prediction);
          _resolve({
            type: FETCH_PLACES_SUCCESS,
            payload: prediction
          });
        }else{
          _resolve({
            type: FETCH_PLACES_ERROR,
            msg: status
          });
        }
      }
  ));


}
export const fetchAddressEpic = (action$) => {
  return action$
  .pipe( 
    ofType(FETCH_PLACES_START),
    mergeMap((action) => from(getAddress(action).then((_result) => {
      console.log('_result', _result)
      return _result;
    }))),
    catchError(err => {
      return of({
        type: FETCH_PLACES_ERROR,
        payload: err.message
      });
    })
  )
};



