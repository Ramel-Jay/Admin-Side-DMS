import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function CashUpdateRequest() {
    let { id } = useParams();
    const [cashObject, setCashObject] = useState ({});

    useEffect(() => {
        axios.get(`http://localhost:3001/cash/byId/${id}`).then((response) => {
        if(response.data.error){
            alert("User Not Authenticated");
        }else{
            setCashObject(response.data);
        }
        });
    });

    const ApproveRequest = (approveOption) => {
        if (approveOption === "approve"){
            let request = 1;
            let username = "";
            axios.put("http://localhost:3001/cash/approverequest",{
                approved: request,
                username: username,
                id: id,
            }, { withCredentials: true }
            )
            .then((response) => {
                if(response.data.error) {
                    alert("Field to approve");
                }else{
                    setCashObject({ ...cashObject, request: request, username: username });
                    alert("Request Approve");
                }
            });
        }   else {
                alert("Field to update the request please contact the dev");
            }
    }

    const DisapproveRequest = (disapproveOption) => {
        if (disapproveOption === "disapprove") {
            let disapproved = 0;
            let username = "";
            axios.put("http://localhost:3001/cash/disapproverequest", {
                disapproved: disapproved,
                username: username,
                id: id
            }, { withCredentials: true }
            ).then((response) => {
                if(response.data.error){
                    alert("Field to approve");
                }else{
                    setCashObject({ ...cashObject, request: disapproved, username: username });
                    alert("request Disapprove");
                }
            });
        } else {
            alert("Field to Update the request please contact the dev");
        }
    }

    return (
        <div>
            {cashObject.firstName}
            <br></br>
            {cashObject.lastName}
            <br></br>
            {cashObject.email}
            <br></br>
            {cashObject.number}
            <br></br>
            {cashObject.address}
            <br></br>
            {cashObject.gender}
            <br></br>
            {cashObject.amount}
            <br></br>
            {cashObject.transactionID}
            <br></br>
            {cashObject.username}
            <br></br>
            {cashObject.request}
            <br></br>
            <button onClick={() => {ApproveRequest("approve")}}>Approve</button>
            <button onClick={() => {DisapproveRequest("disapprove")}}>Disapprove</button>
        </div>
    )
}

export default CashUpdateRequest
