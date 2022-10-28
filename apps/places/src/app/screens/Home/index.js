import React, { useEffect, useState } from "react";
import debounce from 'lodash';
import Gmap from "../../components/Gmap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPIError, fetchAPIStart, fetchAPISuccess } from "../../store/actions/places";
import PlaceSelector from '../../store/selectors/places'
import { Autocomplete, TextField } from "@mui/material";

let searchDebounce;

const Home = () => {
    const [map, setMap] = useState();
    const [googleMap, setGoogleMap] = useState();
    const places = useSelector(PlaceSelector);
    
    const dispatch = useDispatch();
    const addressMapSearch = async (query) => {
        dispatch(fetchAPIStart());
        const request = {
          query,
          fields: ['name', 'geometry', 'formatted_address'],
        };
    
        const service = new googleMap.places.PlacesService(map);
    
        try {
          await service.findPlaceFromQuery(
            request,
            (
              results,
              status,
            ) => {
              if (status === googleMap.places.PlacesServiceStatus.OK && results) {
                const prediction = results?.map(
                  (predictionItem) => ({
                    location: predictionItem.geometry.location,
                    formatted_address: predictionItem.formatted_address,
                    name: predictionItem.name,
                  }),
                );
                dispatch(fetchAPISuccess(prediction));
              } else {
                dispatch(fetchAPIError());
              }
            },
          );
        } catch (error) {
            dispatch(fetchAPIError());
        }
    
      };
    
    
    useEffect(() => {
        console.log('service', process.env.NX_GOOGLE_API_KEY);        

    }, []);   
    return (
        <div style={{ width: '100%'}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Gmap onGoogleApiLoaded={(map, maps) => {
                setMap(map);
                setGoogleMap(maps);
            }}/>
            </div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
            <Autocomplete
                loading={places?.loading}
                options={places?.data}
                getOptionLabel={(option) => option.formatted_address}
                renderInput={(params) => (
                    <TextField {...params} label="Place" placeholder="Place" />
                )}
                sx={{ width: '500px' }}
                onInputChange={(event, value) => {
                    console.log('__text', value);
                    clearTimeout(searchDebounce);
                    searchDebounce = setTimeout(() => {
                    addressMapSearch(value);
                    }, 700);
                }}
                onChange={(event, value) => {
                    console.log('__text', value);
                }}
                />
            </div>
        </div>
    );
}

export default Home;