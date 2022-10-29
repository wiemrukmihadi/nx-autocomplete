import React, { useEffect, useState } from "react";
import debounce from 'lodash';
import Gmap from "../../components/Gmap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../../store/actions/places";
import PlaceSelector from '../../store/selectors/places'
import { Autocomplete, TextField } from "@mui/material";
import { FETCH_PLACES_ERROR, FETCH_PLACES_SUCCESS } from "../../store/actionTypes";

let searchDebounce;

const Home = () => {
    const [map, setMap] = useState();
    const [googleMap, setGoogleMap] = useState();
    const places = useSelector(PlaceSelector);
    // let service;
    const dispatch = useDispatch();
    const addressMapSearch = async (query) => {
      
        const request = {
          query,
          fields: ['name', 'geometry', 'formatted_address'],
        };
    
        const service = new googleMap.places.PlacesService(map);
        dispatch(fetchAddress(service, request, googleMap));    
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
                  // if( value !==  ''){
                    console.log('__text', value);
                    clearTimeout(searchDebounce);
                    searchDebounce = setTimeout(() => {
                    addressMapSearch(value);
                    }, 700);
                  // }
                   
                }}
                />
            </div>
        </div>
    );
}

export default Home;