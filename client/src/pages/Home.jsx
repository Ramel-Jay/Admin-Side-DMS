import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home(){

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(()=>{
        axios.get("http://localhost:3001/home", { withCredentials: true }).then((response) => {
            if(response.data.error){
                navigate("/login");
            }else{
                setUser(response.data);
            }
        })
    },[]);

    if (!user) {
        return <p>Loading user information...</p>;
    }

    return(
        <div>
            <button><Link to="/">Home </Link></button>
            <button><Link to="/cashdisapprove">Cash Disapprove </Link></button>
            <button><Link to="/cashapprove">Cash Approve </Link></button>
            <button><Link to="/post">Post </Link></button>
            <button><Link to="/inkindapprove">InKind Approve </Link></button>
            <button><Link to="/inkinddisapprove">InKind Disapprove </Link></button>
            <button><Link to="/registration">Registration</Link></button>
            <button><Link to="/logout">Log Out</Link></button>

            <h1>This is the home page</h1>

            <p>Username: {user.username}</p>
            <img src={user.image} />
        </div>
    )
};

export default Home;