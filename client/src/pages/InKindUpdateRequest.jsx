import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function InKindRequestApprove() {
    let { id } = useParams();
    const [inKindObject, setInKindObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/inkind/byId/${id}`).then((response) => {
            setInKindObject(response.data);
        });
    });

    const ApproveRequest = (Option) => {
        if (Option === "approve"){
            let request = 1;
            let username = "";
            axios.put("http://localhost:3001/inkind/approverequest", {
                approve: request,
                username: username, 
                id: id
            }, { withCredentials: true }
            ).then((response) => {
                if(response.data.error){
                    alert("Flied to approve your request");
                }else {
                    setInKindObject({ ...inKindObject, request: request, username: username});
                    alert("Request Approved");
                }
            });
        }else {
            alert("Error to Approve the request please contact the developer");
        }
    };

    const DisapproveRequest = (disapproveOption) => {
        if (disapproveOption === "disapprove") {
            let disapproved = 0;
            let username = "";
            axios.put("http://localhost:3001/inkind/disapproverequest", {
                disapproved: disapproved,
                username: username, 
                id: id
            }, { withCredentials: true }
            ).then((response) => {
                if(response.data.error){
                    alert("Flied to Disapprove");
                }else{
                    setInKindObject({ ...inKindObject, request: disapproved, username: username });
                    alert("request Disapprove");
                }
            });
        } else {
            alert("Field to Update the request please contact the dev");
        }
    }

    return (   
        <div>
            <h1>This is a test</h1>
            <div>
                {inKindObject.firstName}
                <br/>
                {inKindObject.lastName}
                <br/>
                {inKindObject.email}
                <br/>
                {inKindObject.number}
                <br/>
                {inKindObject.address}
                <br/>
                {inKindObject.type}
                <br/>
                {inKindObject.quantity}
                <br/>
                {inKindObject.amount}
                <br/>
                {inKindObject.rName}
                <br/>
                {inKindObject.rNum}
                <br/>
                {inKindObject.username}
                <br/>
                <button onClick={() => {ApproveRequest("approve")}}>Approve</button>
                <button onClick={() => {DisapproveRequest("disapprove")}}>Disapprove</button>
            </div>
        </div>
    )
}

export default InKindRequestApprove;