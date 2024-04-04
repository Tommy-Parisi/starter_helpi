//import React, { useState } from 'react';
//import './App.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const toBasicQuestions = () => {
        navigate('/BasicQuestions');
    };

    return(
        <div>
            <h1>Home Page</h1>
            <Button onClick={toBasicQuestions}>Basic Questions</Button>
        </div>
    );
}

export default Home;