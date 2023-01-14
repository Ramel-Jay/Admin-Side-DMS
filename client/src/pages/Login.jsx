import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

function Login() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    const Login = () => {
        const data = {username: username, password: password};
        axios.post("http://localhost:3001/auth/login", data, {withCredentials: true}).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }else {
                alert("Log In Successfully");
                navigate("/");
            }
        });
    };

    return (
        <div>
            <h1>LogIn</h1>
            <input 
                type="text"
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
            />
            <input
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <button type='submit' onClick={Login}>Login</button>
        </div>
    )
}

export default Login
