import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return (
    <div className="App">
      <Map
        mapboxAccessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: 50,
          latitude: 30,
          zoom: 4
        }}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}

export default App;
