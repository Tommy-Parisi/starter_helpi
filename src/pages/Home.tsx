import React from 'react';
import { Button } from 'react-bootstrap';

interface HomeProps {
    changePage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ changePage }) => {
    const style = {
        header: {
            textAllign: 'center',
            display: 'flex',
            padding: '10px',
            fontSize: '50px',
            backgroundColor: '#273469',
            width: `100%`,
            height: '50px',
            color: '#E4D9FF'
        },
        container: {
            display: 'flex',
            flexDirection: 'row' as const,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            marginTop: '0px',
        },
        column: { 
            flex: 1,
            padding : '10px',
            border: '1px solid black',
        },
        page: {
            marginTop: '0px',
            width: '100%',
            display: 'flex',
            backgroundColor: '#E4D9FF',
        },
        customButton: {
            backgroundColor: '#1E2749',
            color: '#E4D9FF',
        }
    }

    return(
        <>
        
        <div style={style.page}>

            <div style={style.column}>
                <h2>Basic Career Questions</h2>
                <p>Kickstart your career exploration with our Basic Career Questions! Designed to touch upon the surface aspects of various professions, these questions aim to quickly gauge your general interests, educational background, and work preferences. Perfect for those at the start of their career journey, these questions provide a straightforward way to discover potential career paths without delving into the complexities of each field.</p>
                <Button style={style.customButton} onClick={() => changePage('Basic')}>Basic Questions</Button>
            </div>

            <div style={style.column}>
                <h2>Detailed Career Questions</h2>
                <p>Ready to dive deeper into your career exploration? Our Detailed Career Questions are designed to provide a comprehensive overview of various professions, including the skills required, the educational background needed, and the day-to-day responsibilities of each job. Ideal for those who have a general idea of their career interests and are looking to explore potential career paths in more detail.</p>
                <Button style={style.customButton} onClick={() => changePage('Detailed')}>Detailed Questions</Button>
            </div>

        </div>
        </>
    );
}

export default Home;
