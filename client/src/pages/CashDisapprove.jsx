import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CashDisapprove() {

    const [listOfPost, setListOfPost] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/cash").then((response) => {
            setListOfPost(response.data);
        });
    }, []);

return (
        <>
            <table className="tblRequest">
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                        <th>Request</th>
                        <th>Disapprove By</th>
                        <th>Edit</th>
                    </tr>
                    {
                        listOfPost.filter(value => value.request === false).map((value, key)=>{
                            return (
                                <tr key={key}>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.email}</td>
                                    <td>{value.number}</td>
                                    <td>{value.address}</td>
                                    <td>{value.gender}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.transactionID}</td>
                                    <td>{value.request.toString()}</td>
                                    <td>{value.username}</td>
                                    <td><button type='submit' onClick={() => {navigate(`/cashupdaterequest/${value.id}`)}}>Edit</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </>
)
}

export default CashDisapprove
