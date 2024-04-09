import { Button } from 'react-bootstrap';

interface BasicProps {
    changePage: (page: string) => void;
}

const BasicQuestions: React.FC<BasicProps> = ({ changePage }) => {

    return (
        <div className = "BasicQuestions">
            <h1>Basic Career Questions</h1>
            <p>Begin your journey to discovering your ideal career path with our Basic Career Questions. This section is designed to lightly touch upon your preferences, education, and general interests, guiding you towards potential career fields without overwhelming detail. Ideal for getting started on your career exploration journey.</p>
            <Button onClick={() => changePage('Home')} >Back</Button>
        </div>
    );
}

export default BasicQuestions;
