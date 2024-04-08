//import React, { useState } from 'react';
//import './App.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface HomeProps {
    changePage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ changePage }) => {
    return(
        <div>
            <h1>Home Page</h1>
            <Button onClick={() => changePage('Basic')}>Basic Questions</Button>
        </div>
    );
}

export default Home;