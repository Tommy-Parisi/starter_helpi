//import React, { useState } from 'react';
//import logo from './logo.svg';
//import './App.css';
import { Button } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

const BasicQuestions = () => {
    const navigate = useNavigate();

    const toHome = () => {
        navigate('/');
    };

    return (
        <div className = "BasicQuestions">
            <h1>Basic Questions</h1>
            <Button onClick ={toHome}>Back</Button>
        </div>
    );
}

export default BasicQuestions;