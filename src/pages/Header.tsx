import React from 'react';
import './Styles.css';
//import { Button } from 'react-bootstrap';

interface HeaderProps {
    changePage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ changePage }) => {
    const style = {
        header: {
            textAllign: 'center',
            display: 'flex',
            width: `100%`,
            height: '50px',
            justifyContent: 'space-between',
        },
        logoImage: { // Style for the image
            height: '40px', 
            marginRight: '10px', 
        }
    };

    return (
        <div style={style.header} className='header'>
            <div style={{ display: 'flex', alignItems: 'center' }} className='titleStyledText' onClick={() => changePage('Home')}>
                <img src="/LaunchPadLogo.png" alt="error" style={style.logoImage} />
                <div className='titleStyledText'>Launch Pad</div>
            </div>
            <div className='headerButtonStylesText' onClick={() => changePage('BasicReport')}>Basic Report</div>
        </div>
    );
}
