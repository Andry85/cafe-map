import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import './app.css';
import Map, {Marker, Popup} from 'react-map-gl';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';




function App() {

  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [ispopupVisible, setIspopupVisible] = useState(true);
  const [newPalce, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: 35,
    latitude: 49,
    zoom: 6
  });

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  


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

  const handleMarkerClick = (id,lat,long) => {
    setCurrentPlaceId(id);
    setIspopupVisible(true)
    setViewport({
      ...viewport,
      longitude: long,
      latitude: lat,
    })
  }

  const handleClose = () => {
    setIspopupVisible(false);
  }

  const handleAddClick = (e) => {
    
    const {lat, lng} = e.lngLat;
    setNewPlace({
      lat,
      long: lng
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPalce.lat,
      long: newPalce.long,
    }

    try {

      const res = await axios.post("pins", newPin)
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch(err) {
      console.log(err);
    }

  }

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }




  return (
    <div className="App">
      <Map
        mapboxAccessToken = {process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={viewport}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
      >
        {pins.map((p) =>(
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
              <LocationOnIcon 
                sx={{ fontSize: 40, color: p.username === currentUser ? "tomato" : "slateblue" }} 
                onClick={()=>handleMarkerClick(p._id, p.lat, p.long)}
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
                        {Array(p.rating).fill(<StarIcon className="star" />)}
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

            
            {newPalce && (
              <Popup 
                longitude={newPalce.long} 
                latitude={newPalce.lat}
                anchor="bottom"
                onClose={() => setNewPlace(null)}
                >
                <div>
                  <form className="pin-form" onSubmit={handleSubmit}>
                      <label>Title</label>
                      <input placeholder="add title" onChange={(e) => setTitle(e.target.value)}/>
                      <label>Review</label>
                      <textarea placeholder="say something about the place" onChange={(e) => setDescription(e.target.value)}></textarea>
                      <label>Rating</label>
                      <select  onChange={(e) => setRating(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button className="submitButton" type="submit">Add pin</button>
                  </form>
                </div>
              </Popup>
            )}      
            </>
        ))}

        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>Log Out</button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={()=> setShowLogin(true)}>Login</button>
            <button className="button register" onClick={()=> setShowRegister(true)}>Register</button>
          </div>
        ) }

        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}
        
      </Map>
    </div>
  );
}

export default App;
