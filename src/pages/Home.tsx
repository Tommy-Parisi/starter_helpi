import React, { useEffect } from 'react';
import './Styles.css';
import { Button } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import './ParallaxStarsStyle.css';

interface HomeProps {
    changePage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ changePage }) => {
    
    useEffect(() => {
        const handleScroll = () => {
            const yPos = window.scrollY;

            const stars1 = document.getElementById('stars1');
            const stars2 = document.getElementById('stars2');
            const stars3 = document.getElementById('stars3');
            
            if (stars1) stars1.style.transform = `translateY(-${yPos * 0.5}px)`;
            if (stars2) stars2.style.transform = `translateY(-${yPos * 0.3}px)`;
            if (stars3) stars3.style.transform = `translateY(-${yPos * 0.1}px)`;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
        <div className ='parallax-scrolling'>
            <div id='stars1' className="parallax-star-layer"></div>
            <div id='stars3' className="parallax-star-layer"></div>

            <div className='pageTop'>
                <h2 className='styledText'>Shoot for the moon</h2>
            </div>
       
            <div className="pageBody">
                {/*Buttons to navigate to Basic and Detailed question pages*/}
                <div className='container'>
                    <div className="column">
                        <Button className="customButton" onClick={() => changePage('Basic')}>
                        <h2>The Basic Quiz</h2>
                        <h3>(5 Mins)</h3>
                        <p>Kickstart your career exploration with our Basic Career Questions! Designed to touch upon the surface aspects of various professions, these questions aim to quickly gauge your general interests, educational background, and work preferences. Perfect for those at the start of their career journey, these questions provide a straightforward way to discover potential career paths without delving into the complexities of each field.</p>
                    </Button>
                </div>

                <div className="column">
                    <Button className='customButton' onClick={() => changePage('Detailed')}>
                        <h2>The Detailed Quiz</h2>
                        <h3>(10 Mins)</h3>
                        <p>Ready to dive deeper into your career exploration? Our Detailed Career Questions are designed to provide a comprehensive overview of various professions, including the skills required, the educational background needed, and the day-to-day responsibilities of each job. Ideal for those who have a general idea of their career interests and are looking to explore potential career paths in more detail.</p>
                    </Button>
                </div>
            </div>
        </div>

       <div className="footer">
            <p>© 2024 Helpi. All rights reserved.</p>
            <ApiKey />
        </div>
    </div>
    </>

    );
}

export default Home;
