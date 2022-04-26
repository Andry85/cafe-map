import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import './app.css';
import axios from 'axios';


function App() {

  const [pins, setPins] = useState([]);


  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);

      } catch(err) {
        console.log(err)
      }
    }
    getPins();
    console.log(pins);
  }, [])

  return (
    <div className="App">
      <Map
        mapboxAccessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: 35,
          latitude: 49,
          zoom: 6
        }}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {pins.map(p=>(
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
              <LocationOnIcon sx={{ fontSize: 60, color: "slateblue" }}  />
            </Marker>
            <Popup longitude={p.long} latitude={p.lat} anchor="left">
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.description}</p>
                <label>Rating</label>
                <div className="stars">
                  <StarIcon className="star" />
                  <StarIcon className="star"/>
                  <StarIcon className="star"/>
                  <StarIcon className="star"/>
                </div>
                <label>Information</label>
                <span className="username">Created by <b>{p.username}</b></span>
                <span className="date">1 hour ago</span>
              </div>
            </Popup>
            </>
        ))}

        
      </Map>
    </div>
  );
}

export default App;
