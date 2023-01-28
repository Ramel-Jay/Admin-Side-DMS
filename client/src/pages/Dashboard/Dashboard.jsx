import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    // Legend,
} from 'chart.js';
import { format } from 'date-fns';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Home from "../Home/Home";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    // Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    ticks: {
        precision:0
    }
};

function Dashboard() {

    const [cashList, setCashList] = useState([]);

    const [inKindList, setInKindList] = useState([]);

    const [activeTab, setActiveTab] = useState('cash-approve');

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

    const toggleTab = (event) => setActiveTab(event.currentTarget.id);

    const cashApprove = cashList.filter((val) => val.request === true );
    const countCashApprove = cashApprove.length;

    const cashDisapprove = cashList.filter((val) => val.request === false );
    const countCashDisapprove = cashDisapprove.length;

    const inKindApprove = inKindList.filter((val) => val.request === true );
    const countInKindApprove = inKindApprove.length;

    const inKindDisApprove = inKindList.filter((val) => val.request === false );
    const countInKindDisapprove = inKindDisApprove.length;

    const navigate = new useNavigate();

    const getData = (data, label) => {
        const months = {
            Jan: 0,
            Feb: 0,
            Mar: 0,
            Apr: 0,
            May: 0,
            Jun: 0,
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 0,
            Nov: 0,
            Dec: 0,
        };

        if (data && data.length > 0) {
            data.forEach(post => {
                // Check the month of createdAt field, convert date using date-fns https://date-fns.org/v2.14.0/docs/format
                const monthName = format(new Date(post.createdAt), 'LLL');

                if (Object.keys(months).includes(monthName)) {
                    months[monthName] += 1;
                }
            });
        }
        
        return {
            labels: Object.keys(months),
            datasets: [{
                label,
                data: Object.values(months || []),
                borderColor: 'black',
                backgroundColor: 'blue',
            }],
        }
    };

    const getChartData = () => {
        switch (activeTab) {
            case 'cash-disapprove':
                return getData(cashDisapprove, 'Cash Disapprove');
            case 'inkind-approve':
                return getData(inKindApprove, 'In Kind Approve');
            case 'inkind-disapprove':
                return getData(inKindDisApprove, 'In Kind Disapprove');
            default:
                return getData(cashApprove, 'Cash Approve');

        }
    };

    return (
        <div>
            <Home/>

            <div className="row">
                <div className="column">
                    <div
                        className="card"
                        onClick={toggleTab}
                        id="cash-approve"
                        style={{ border: activeTab === 'cash-approve' ? '2px solid blue' : 'none' }}
                    >
                    <h3 className="cardHeader">CASH APPROVE: </h3>
                    <p className="count">{ countCashApprove }</p>
                    </div>
                </div>

                <div className="column">
                    <div
                        className="card"
                        onClick={toggleTab}
                        id="cash-disapprove"
                        style={{ border: activeTab === 'cash-disapprove' ? '2px solid blue' : 'none' }}
                    >
                    <h3 className="cardHeader">CASH DISAPPROVE: </h3>
                    <p className="count">{ countCashDisapprove }</p>
                    </div>
                </div>

                <div className="column">
                    <div
                        className="card"
                        onClick={toggleTab}
                        id="inkind-approve"
                        style={{ border: activeTab === 'inkind-approve' ? '2px solid blue' : 'none' }}
                    >
                    <h3 className="cardHeader">IN KIND APPROVE:</h3>
                    <p className="count">{ countInKindApprove }</p>
                    </div>
                </div>

                <div className="column">
                    <div
                        className="card"
                        onClick={toggleTab}
                        id="inkind-disapprove"
                        style={{ border: activeTab === 'inkind-disapprove' ? '2px solid blue' : 'none' }}
                    >
                    <h3 className="cardHeader">IN KIND DISAPPROVE:</h3>
                    <p className="count">{ countInKindDisapprove }</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 40 }} className="graph-container">
                <Bar options={options} data={getChartData()}  className="bar-graph"/>
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