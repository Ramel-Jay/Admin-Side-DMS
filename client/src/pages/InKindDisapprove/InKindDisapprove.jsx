import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import Home from "../Home/Home";
import { FaSearch } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import * as XLSX  from "xlsx";

function InKindDisapprove() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [ searchId, setSearchId ] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/inkind", { withCredentials: true }).then((response) => {
            if(response.data.error){
                navigate("/login");
            }else{
                setListOfPosts(response.data);
            }
        });
    }, []);

    const download = () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(listOfPosts.filter((value) => value.request === false));

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "Cash_Disapprove_Table.xlsx");
    }

    const items = listOfPosts.filter((value) => value.request === false);
    const countedItems = items.length;

    return(
        <>
            <Home/>
            <div className="pending-request-container">
                <p style={{ paddingLeft:"2vw" }}>Pending Request: { countedItems }</p>
            </div>
            <h2 className="headerTitle">IN KIND DISAPPROVE</h2>
            <FaSearch className="searchIcon"/>
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
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Rider Name</th>
                        <th>Rider Number</th>
                        <th>Status</th>
                        <th>Disapprove by</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOfPosts.filter((value) => {
                            if( searchId === "" ){
                                return value.request === false;
                            }else if (value.firstName.toLowerCase().includes(searchId.toLowerCase().trim())){
                                return value.request === false;
                            }
                        }).map((value, key) => {
                            return (
                                <tr key={key}>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.type}</td>
                                    <td>{value.quantity}</td>
                                    <td>{value.rName}</td>
                                    <td>{value.rNum}</td>
                                    <td>{value.request}Disapprove</td>
                                    <td>{value.username}</td>
                                    <td><BsFillCheckCircleFill type="submit" onClick={() => {navigate(`/inkindupdaterequest/${value.id}`)}}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
            <button onClick={download} className="btnDownload">Download</button>
        </>
    )
};

export default InKindDisapprove;