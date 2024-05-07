import React, { useState, useEffect } from 'react';
import './Styles.css';
import logo from '../assets/LaunchPadLogo.png';

interface HeaderProps {
    changePage: (page: string) => void;
    isHome: boolean;
}

export const Header: React.FC<HeaderProps> = ({ changePage, isHome }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        if (isHome) { 
            const handleScroll = () => {
                const shouldStick = window.scrollY > 50; // Threshold of scroll Y to trigger sticky header
                setIsSticky(shouldStick);
                document.body.style.paddingTop = shouldStick ? '70px' : '0'; // Add this line
            };
            window.addEventListener('scroll', handleScroll);

            // Clean up event listener
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isHome]);

    const style = {
        header: { 
            display: isSticky ? 'flex' : 'none',
            width: `100%`,
            height: '70px',
            justifyContent: 'space-between',
            position: (isSticky ? 'fixed' : 'static') as 'fixed' | 'static',
            top: isSticky ? 0 : 'auto', // Keep at top when sticky
            left: 0,
            right: 0,
            boxShadow: isSticky ? '0 2px 10px rgba(0,0,0,0.1)' : 'none', // Optional: add shadow when sticky
            zIndex: 100 // Ensure it's on top of other elements
        },
        logoImage: { 
            height: '55px', 
            marginRight: '10px',
            marginLeft: '10px',
        }
    };

    return (
        <div style={style.header} className='header'>
            <div style={{ display: 'flex', alignItems: 'center' }} className='titleStyledText' onClick={() => changePage('Home')}>
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
