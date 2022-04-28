import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import './app.css';
import Map, {Marker, Popup} from 'react-map-gl';
import axios from 'axios';



function App() {

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [ispopupVisible, setIspopupVisible] = useState(true);



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

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    setIspopupVisible(true)
  }

  const handleClose = () => {
    setIspopupVisible(false);
  }



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
        {pins.map((p) =>(
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
              <LocationOnIcon 
                sx={{ fontSize: 60, color: "slateblue" }} 
                onClick={()=>handleMarkerClick(p._id)}
               />
              {p._id === currentPlaceId && ispopupVisible &&  (
                <>
                  <div className="popup">
                    <CloseIcon className="popup-close" onClick={handleClose} />
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
                      <span className="date">{p.createdAt}</span>
                    </div>
                  </div>
                </>
              )
            }

            </Marker>

            

            
            
            

            
            </>
        ))}

        
      </Map>
    </div>
  );
}

export default App;
