import GoogleMapReact from 'google-map-react';

const Gmap = ({ onGoogleApiLoaded }) => {
    const mapStyle = [
        {
          featureType: 'poi.school',
          elementType: 'labels.icon',
          stylers: [{ visibility: '#on' }, { color: '#2C94FD' }],
        },
        {
          featureType: 'poi.government',
          stylers: [{ visibility: '#on' }],
        },
        {
          featureType: 'poi.medical',
          stylers: [{ visibility: '#on' }],
        },
        {
          featureType: 'poi.place_of_worship',
          stylers: [{ visibility: '#on' }],
        },
        {
          featureType: 'poi.business',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
      ];
    return (
        <div style={{ height: '50vh', width: '50%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{
            key: process.env.NX_GOOGLE_API_KEY,
            language: 'id',
            region: 'id',
            libraries: ['places'],
            }}
            options={{ styles: [...mapStyle] }}
            // layerTypes={['place', 'TransitLayer']}
            center={{ lat: -7.250445, lng: 112.768845 }}
            zoom={19}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
                onGoogleApiLoaded(map, maps);
            }}
            />
    </div>
    )
};

export default Gmap;