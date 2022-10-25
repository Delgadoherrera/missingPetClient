import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import '../assets/globals.css'
export default function Home({ state }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0",
  });
/*   console.log('homeMap', state) */
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;


  function Map() {
    const center = useMemo(() => ({ lat: state.latitude, lng: state.longitude }), []);
  

    return (
      <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
      </GoogleMap>
    );
  }
}


