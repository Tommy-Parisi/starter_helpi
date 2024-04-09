import React from 'react';
import { Button } from 'react-bootstrap';

interface HomeProps {
    changePage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ changePage }) => {
    return(
        <div>
            <h1>Home Page</h1>
            <h1>Basic Career Questions</h1>
            <p>Kickstart your career exploration with our Basic Career Questions! Designed to touch upon the surface aspects of various professions, these questions aim to quickly gauge your general interests, educational background, and work preferences. Perfect for those at the start of their career journey, these questions provide a straightforward way to discover potential career paths without delving into the complexities of each field.</p>
            <Button onClick={() => changePage('Basic')}>Basic Questions</Button>
        </div>
    );
}

export default Home;
