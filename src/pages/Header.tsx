import React, { useState, useEffect } from 'react';
import './Styles.css';
import logo from '../assets/LaunchPadLogo.png';

interface HeaderProps {
    changePage: (page: string) => void;
    isHome: boolean;
}

export const Header: React.FC<HeaderProps> = ({ changePage, isHome }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    //Useffect to handle header visibility
    useEffect(() => {
        if (isHome) { 
            const handleScroll = () => {
                const shouldStick = window.scrollY > 50; 
                setIsSticky(shouldStick);
                setIsHeaderVisible(true);
                document.body.style.paddingTop = shouldStick ? '70px' : '0'; 
            };
            window.addEventListener('scroll', handleScroll);

            
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isHome]);
        // Handle logo click event
    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsHeaderVisible(false);
        changePage('Home');
        document.body.style.paddingTop = '0';
    };
     // Inline styles for the Header component
    const style = {
        header: { 
            display: (isSticky && isHeaderVisible) ? 'flex' : 'none',
            width: `100%`,
            height: '70px',
            justifyContent: 'space-between',
            position: (isSticky ? 'fixed' : 'static') as 'fixed' | 'static',
            top: isSticky ? 0 : 'auto', 
            left: 0,
            right: 0,
            boxShadow: isSticky ? '0 2px 10px rgba(0,0,0,0.1)' : 'none', 
            zIndex: 100 
        },
        logoImage: { 
            height: '55px', 
            marginRight: '10px',
            marginLeft: '10px',
        }
    };

    return (
        <div style={style.header} className='header'>
            <div style={{ display: 'flex', alignItems: 'center' }} className='titleStyledText' onClick={handleLogoClick}>
                <img src= {logo} alt="Logo" style={style.logoImage} />
                <div className='titleStyledText'>Launch Pad</div>
            </div>
            <div className='headerRightButtons'>
                <div className='headerBasicButtonStylesText' onClick={() => changePage('BasicReport')}>Basic Report</div>
                <div className='verticalLine'></div>
                <div className='headerDetailedButtonStylesText' onClick={() => changePage('DetailedReport')}>Detailed Report</div>
            </div>
        </div>
    );
}
