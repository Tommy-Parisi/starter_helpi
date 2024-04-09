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
            <h1>Detailed Career Questions</h1>
            <p>Explore the depths of your chosen career with our Detailed Career Questions. Here, you'll find intricate insights into specific professions, from the skills you’ll need to thrive to the educational paths that lead there. Perfect for those ready to narrow down their career options or seeking comprehensive guidance, these questions help you uncover what it truly takes to excel in your desired field.</p>
            <Button onClick={() => changePage('Detailed')}>Detailed Questions</Button>
        </div>
    );
}

export default Home;
