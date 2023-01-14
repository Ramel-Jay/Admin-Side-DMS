import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom" 


function Registration() {

    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        address: "",
        gender: "",
        email: "",
        number: "",
        adminType: "",
        image: null,
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(2).required(),
        lastName: Yup.string().min(2).required(),
        address: Yup.string().min(10).required(),
        gender: Yup.string().min(4).max(6).required(),
        email: Yup.string().min(10).required(),
        number: Yup.number().required(),
        adminType: Yup.string().required(),
        image: Yup.mixed().required("You need to provide a file"),
        username: Yup.string().min(3).max(20).required(),
        password: Yup.string().min(2).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data, { withCredentials: true })
        .then((response) => {
            if(response.data.error){
                console.log(response.data.error);
            }else{
                console.log(data);
                navigate("/");
            }
        });
    };


    return (
        <div className="centerForm">
            <h1>Registration</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({
                    setFieldValue
                }) => (
                <Form className="registrationForm">
                    <label className="registrationLabel">First Name</label>
                    <ErrorMessage name="firstName" component="span"/>
                    <Field
                        autoComplete="off"
                        id="firstName"
                        name="firstName"
                        placeholder= "First Name"
                        className="registrationField"
                    />
                    <label className="registrationLabel">Last Name</label>
                    <ErrorMessage name="lastName" component="span"/>
                    <Field
                        autoComplete="off"
                        id="lastName"
                        name="lastName"
                        placeholder= "Last Name"
                        className="registrationField"
                    />
                    <label className="registrationLabel">Address</label>
                    <ErrorMessage name="address" component="span"/>
                    <Field
                        autoComplete="off"
                        id="address"
                        name="address"
                        placeholder= "address"
                        className="registrationField"
                    />
                    <label className="registrationLabel">Gender</label>
                    <ErrorMessage name="gender" component="span"/>
                    <Field
                        autoComplete="off"
                        id="gender"
                        name="gender"
                        placeholder= "gender"
                        className="registrationField"
                    />
                    <label className="registrationLabel">Email</label>
                    <ErrorMessage name="email" component="span"/>
                    <Field
                        autoComplete="off"
                        id="email"
                        name="email"
                        placeholder= "email"
                        className="registrationField"
                    />
                    <label className="registrationLabel">Number</label>
                    <ErrorMessage name="number" component="span"/>
                    <Field
                        type="number"
                        autoComplete="off"
                        id="number"
                        name="number"
                        placeholder= "number"
                        className="registrationField"
                    />
                    <label className="registrationLabel">Admin Type</label>
                    <ErrorMessage name="adminType" component="span"/>
                    <Field
                        autoComplete="off"
                        id="adminType"
                        name="adminType"
                        placeholder= "admin"
                        className="registrationField"
                    />
                    <label className="registrationLabel">Image</label>
                    <ErrorMessage name="image" component="span"/>
                    <input
                        autoComplete="off"
                        id="image"
                        name="image"
                        type="file"
                        onChange={event => setFieldValue("image", event.currentTarget.files[0])}
                        className="registrationField"
                    />
                    <label className="registrationLabel">Username</label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        id="username"
                        name="username"
                        placeholder="Ex. guko"
                        className="registrationField"
                    />
                    <label className="registrationLabel">Password</label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ex. guko1234"
                        className="registrationField"
                    />
                    <button type="submit" className="registrationButton">Register</button>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default Registration
