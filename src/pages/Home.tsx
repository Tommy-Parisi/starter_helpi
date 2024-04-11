import React from 'react';
import { Button } from 'react-bootstrap';
import './Home.css';

interface HomeProps {
    changePage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ changePage }) => {
    return(
        <>
        <div className="page">

            <div className="column">
                <div className="container">
                    <h2>Basic Career Questions</h2>
                    <p>Kickstart your career exploration with our Basic Career Questions! Designed to touch upon the surface aspects of various professions, these questions aim to quickly gauge your general interests, educational background, and work preferences. Perfect for those at the start of their career journey, these questions provide a straightforward way to discover potential career paths without delving into the complexities of each field.</p>
                    <Button className="customButton" onClick={() => changePage('Basic')}>Basic Questions</Button>
                </div>
            </div>

            <div className="column">
                <div className="container">
                    <h2>Detailed Career Questions</h2>
                    <p>Ready to dive deeper into your career exploration? Our Detailed Career Questions are designed to provide a comprehensive overview of various professions, including the skills required, the educational background needed, and the day-to-day responsibilities of each job. Ideal for those who have a general idea of their career interests and are looking to explore potential career paths in more detail.</p>
                    <Button className='customButton' onClick={() => changePage('Detailed')}>Detailed Questions</Button>
                </div>

            </div>

        </div>
        </>
    );
}

export default Home;
