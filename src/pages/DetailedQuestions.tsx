import { Button } from 'react-bootstrap';

interface DetailedProps {
    changePage: (page: string) => void;
}

const DetailedQuestions: React.FC<DetailedProps> = ({ changePage }) => {
    
    return (
        <div>
            <h1>Detailed Questions</h1>
            <p>Dive into the nuances of your dream career with our Detailed Career Questions. This section is crafted for those who seek an in-depth understanding of specific roles, including the skills required, the educational pathways, and the daily responsibilities involved. It's the perfect tool for refining your career choices, offering a comprehensive look into each profession to ensure you’re well-informed and ready to make your next big career decision.</p>
            <Button onClick={() => changePage('Home')} >Back</Button>
        </div>
    );
}

export default DetailedQuestions;

