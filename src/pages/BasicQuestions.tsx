//import React, { useState } from 'react';
//import logo from './logo.svg';
//import './App.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

interface BasicProps {
    changePage: (page: string) => void;
}

const BasicQuestions: React.FC<BasicProps> = ({ changePage }) => {

    return (
        <div className = "BasicQuestions">
            <h1>Basic Questions</h1>
            <Button onClick={() => changePage('Home')} >Back</Button>
        </div>
    );
}

export default BasicQuestions;