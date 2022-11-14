import '../assets/MapFindMyPet.css'
import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const GoogleMapComponent = (props) => {

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

/*   console.log('location', state)
 */  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
  let markersList = [
    { lat: state.latitude, lng: state.longitude },
    /*   { lat: state.latitude, lng: state.asdasdlongitude} */
  ]
  let [markers, setMarkers] = useState(markersList);
  const mapStyles = {
    width: '80vw',
    height: '30vh',
    margin: 'auto',
    position:'relative',
 


  };

  let onMarkerDragEnd = (coord, index, markers) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    markers[index] = { lat, lng };
    setMarkers(markers);
    let finalPosition = {
      lat: lat,
      lng: lng
    }
    props.newLocation(finalPosition)
  }

  let myMarkers = markers && Object.entries(markers).map(([key, val]) => (
    <Marker key={key} id={key} position={{
      lat: state.latitude,
      lng: state.longitude
    }}
      onClick={() => console.log("Clicked")}
      draggable={true}
      onDragend={(t, map, coord) => onMarkerDragEnd(coord, key, markers)}
    />
  ))
  return (
    <>
      <div>
        <div className="row d-flex justify-content-center text-center mapaMascotaEncontrada">

          <Map
            google={props.google}
            zoom={13}
            style={mapStyles}
            center={
              {
                lat: state.latitude,
                lng: state.longitude
              }
            }
          >
            {myMarkers}
          </Map>
        </div>
      </div>
    </>
  );
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0',

})(GoogleMapComponent);
