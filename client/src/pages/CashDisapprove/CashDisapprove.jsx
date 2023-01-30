import "./CashDisapprove.css";
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import * as XLSX  from "xlsx";
import { FaSearch } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";

function CashDisapprove() {

    const [listOfPost, setListOfPost] = useState([]);
    const [ searchId, setSearchId ] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/cash", { withCredentials: true }).then((response) => {
            if(response.data.error)
            {
                navigate("/login");
            }else{
                setListOfPost(response.data);
            }
        });
    }, []);

    const download = () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(listOfPost.filter((value) => value.request === false));

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "Cash_Disapprove_Table.xlsx");
    }

    const items = listOfPost.filter((value) => value.request === false );
    const countItems = items.length;

return (
        <div>
            <Home/>
            <div className="pending-request-container">
                <p style={{ paddingLeft:"2vw" }}>Disapprove Request: { countItems }</p>
            </div>
            <br></br>
            <h2 className="headerTitle">CASH DISAPPROVE</h2>
            <FaSearch className="search-icon"/>
            <input
                type="text"
                placeholder="Search First Name..."
                onChange={(event) => {
                    setSearchId(event.target.value);
                }}
                className="searchDonator"
                
            />

            <div style={{ overflow:"scroll", maxHeight:"28vw" }}>
                <table className="tblRequest">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Disapprove By</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody className="tblBody">
                        {
                            listOfPost.filter((value) => {
                                if( searchId === "" ){
                                    return value.request === false;
                                }else if (value.firstName.toLowerCase().includes(searchId.toLowerCase().trim())){
                                    return value.request === false;
                                }
                            }).map((value, key)=>{
                                return (
                                    <tr key={key}>
                                        <td>{value.firstName}</td>
                                        <td>{value.lastName}</td>
                                        <td>{value.amount}</td>
                                        <td>{value.transactionID}</td>
                                        <td>{value.request}Disapprove</td>
                                        <td>{value.username}</td>
                                        <td type='submit' onClick={() => {navigate(`/cashupdaterequest/${value.id}`)}}><BsFillCheckCircleFill  type='submit' onClick={() => {navigate(`/cashupdaterequest/${value.id}`)}}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
                <button onClick={download} className="btnDownload">Download</button>
        </div>
)
}

export default CashDisapprove
