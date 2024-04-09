import { Button } from 'react-bootstrap';

interface DetailedProps {
    changePage: (page: string) => void;
}

const DetailedQuestions: React.FC<DetailedProps> = ({ changePage }) => {
    
    return (
        <div>
            <h1>Detailed Questions</h1>
            <Button onClick={() => changePage('Home')} >Back</Button>
        </div>
    );
}

export default DetailedQuestions;

