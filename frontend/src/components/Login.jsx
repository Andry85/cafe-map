import './login.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState, useRef } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Login({setShowLogin, myStorage, setCurrentUser}) {

    const [error, setErrorr] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const res = await axios.post("/users/login", user);
            myStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setErrorr(false);
        } catch(err) {
            setErrorr(true);
        }

    }

    return (
        <div className="loginContainer">
            <div className="logo">
                <LocationOnIcon />
                <span>Cafe pin</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="loginButton">Login</button>

                {error && (
                    <span className="failure">Something went wrong!</span>
                )}
            </form>
            <CancelIcon className="login-cancel" onClick={()=> setShowLogin(false)} />
        </div>
    )
}