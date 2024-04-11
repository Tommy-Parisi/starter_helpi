import React from 'react';
import { Button } from 'react-bootstrap';

interface HomeProps {
    changePage: (page: string) => void;
}

export const Header: React.FC<HomeProps> = ({ changePage }) => {
    const style = {
        header: {
            textAllign: 'center',
            display: 'flex',
            fontSize: '50px',
            backgroundColor: '#273469',
            width: `100%`,
            height: '75px',
            color: '#E4D9FF'
        },
        customButton: {
            backgroundColor: '#1E2749',
            color: '#E4D9FF',
        }
    };
    return (
        <div style={style.header}>
            <div style={style.header}>Helpi</div>
            <Button style={style.customButton} onClick={() => changePage('Home')}>Home Page</Button>
        </div>
    );
}
