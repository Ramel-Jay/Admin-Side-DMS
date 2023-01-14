import React from 'react';
import { useState, useEffect } from 'react';
import Home from "../Home/Home";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {

    const [cashList, setCashList] = useState([]);

    const [inKindList, setInKindList] = useState([]);

    const navigate = new useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/cash", { withCredentials: true }).then((response) => {
            if(response.data.error)
            {
                alert(response.data.error);
            }else{
                setCashList(response.data);
            }
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/inkind", { withCredentials: true }).then((response) => {
            if(response.data.error){
                navigate("/login");
            }else{
                toast.success('User Authenticated', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                });
                setInKindList(response.data);
            }
        });
    }, []);

    const cashApprove = cashList.filter((val) => val.request === true );
    const countCashApprove = cashApprove.length;

    const cashDisapprove = cashList.filter((val) => val.request === false );
    const countCashDisapprove = cashDisapprove.length;

    const inKindApprove = inKindList.filter((val) => val.request === true );
    const countInKindApprove = inKindApprove.length;

    const inKindDisApprove = inKindList.filter((val) => val.request === false );
    const countInKindDisapprove = inKindDisApprove.length;

    return (
        <div>
            <Home/>

            <div class="row">
                <div class="column">
                    <div class="card">
                    <h3 className="cardHeader">CASH APPROVE: </h3>
                    <p className="count">{ countCashApprove }</p>
                    </div>
                </div>

                <div class="column">
                    <div class="card">
                    <h3 className="cardHeader">CASH DISAPPROVE: </h3>
                    <p className="count">{ countCashDisapprove }</p>
                    </div>
                </div>
                
                <div class="column">
                    <div class="card">
                    <h3 className="cardHeader">IN KIND APPROVE:</h3>
                    <p className="count">{ countInKindApprove }</p>
                    </div>
                </div>
                
                <div class="column">
                    <div class="card">
                    <h3 className="cardHeader">IN KIND DISAPPROVE:</h3>
                    <p className="count">{ countInKindDisapprove }</p>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default Dashboard