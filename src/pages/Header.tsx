import React from 'react';
import './Styles.css';

interface HomeProps {
    changePage: (page: string) => void;
}

export const Header: React.FC<HomeProps> = ({ changePage }) => {
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
        </div>
    );
}
