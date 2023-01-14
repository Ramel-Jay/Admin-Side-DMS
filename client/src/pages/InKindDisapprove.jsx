import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

function InKindDisapprove() {
    const [listOfPosts, setListOfPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/inkind").then((response) => {
            setListOfPosts(response.data);
        });
    }, []);

    return(
        <>
            <h1>This is the InKind Disapprove Request</h1>
            <table className="tblRequest">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Address</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Rider Name</th>
                        <th>Rider Number</th>
                        <th>Status</th>
                        <th>Disapprove by</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOfPosts.filter(value => value.request === false).map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.email}</td>
                                    <td>{value.number}</td>
                                    <td>{value.address}</td>
                                    <td>{value.type}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.rName}</td>
                                    <td>{value.rNum}</td>
                                    <td>{value.request.toString()}</td>
                                    <td>{value.username}</td>
                                    <td><button type="submit" onClick={() => {navigate(`/inkindupdaterequest/${value.id}`)}}>Edit</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
};

export default InKindDisapprove;