import React from 'react';
import './Styles.css';
import logo from '../assets/LaunchPadLogo.png';

interface HeaderProps {
    changePage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ changePage }) => {
    const style = {
        header: { 
            textAllign: 'center',
            display: 'flex',
            width: `100%`,
            height: '70px',
            justifyContent: 'space-between',
           
        },
        logoImage: { 
            height: '55px', 
            marginRight: '10px',
            marginLeft: '10px'
        }
    };

    return (
        <div style={style.header} className='header'>
            <div style={{ display: 'flex', alignItems: 'center' }} className='titleStyledText' onClick={() => changePage('Home')}>
                <img src= {logo} alt="Logo" style={style.logoImage} />
                <div className='titleStyledText'>Launch Pad</div>
            </div>
            <div className='headerButtonStylesText' onClick={() => changePage('BasicReport')}>Basic Report</div>
        </div>
    );
}
