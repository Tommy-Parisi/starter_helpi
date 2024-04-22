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
    };

    return (
        <div style={style.header} className='header'>
            <div className='titleStyledText' onClick={() => changePage('Home')}>Helpi</div>
            <div className='headerRightButtonStylesText' onClick={() => changePage('BasicReport')}>Basic Report</div>
            <div className='headerRightButtonStylesText' onClick={() => changePage('DetailedReport')}>Detailed Report</div>
        </div>
    );
}
