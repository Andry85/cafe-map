import './register.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState, useRef } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Register({setShowRegister}) {

    const [success, setSuccess] = useState(false);
    const [error, setErrorr] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            await axios.post("/users/register", newUser);
            setErrorr(false);
            setSuccess(true);
        } catch(err) {
            setErrorr(true);
        }

    }

    return (
        <div className="registerContainer">
            <div className="logo">
                <LocationOnIcon />
                <span>Cafe pin</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="email" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="registerButton">Register</button>
                {success && (
                    <span className="success">Successfull. You can login now!</span>
                )}
                {error && (
                    <span className="failure">Something went wrong!</span>
                )}
            </form>
            <CancelIcon className="register-cancel" onClick={()=> setShowRegister(false)} />
        </div>
    )
}