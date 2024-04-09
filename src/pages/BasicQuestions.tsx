import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

interface BasicProps {
    changePage: (page: string) => void;
}

const BasicQuestions: React.FC<BasicProps> = ({ changePage }) => {

    return (
        <div className = "BasicQuestions">
            <h1>Basic Career Questions</h1>
            <p>Begin your journey to discovering your ideal career path with our Basic Career Questions. This section is designed to lightly touch upon your preferences, education, and general interests, guiding you towards potential career fields without overwhelming detail. Ideal for getting started on your career exploration journey.</p>
            <Button onClick={() => changePage('Home')} >Back</Button>
            <h2>Question 1</h2>
            <Form.Check type="radio" name="question1" label="I prefer working with numbers and data." />
            <Form.Check type="radio" name="question1" label="I working with words and languages." />
            <h2>Question 2</h2>
            <Form.Check type="radio" name="question2" label="I prefer working with other people." />
            <Form.Check type="radio" name="question2" label="I working by myself." />
            <h2>Question 3</h2>
            <Form.Check type="radio" name="question3" label="I prefer to be in charge." />
            <Form.Check type="radio" name="question3" label="I prefer to be told what to do." />
            <h2>Question 4</h2>
            <Form.Check type="radio" name="question4" label="I prefer my work to be predictable and consistent." />
            <Form.Check type="radio" name="question4" label="I prefer my work to have variety and opportunity for creativity." />
            <h2>Question 5</h2>
            <Form.Check type="radio" name="question5" label="I prefer active and hands on tasks." />
            <Form.Check type="radio" name="question5" label="I prefer working on a computer." />
            <h2>Question 6</h2>
            <Form.Check type="radio" name="question6" label="I prefer working to improve quality of life (e.g., healthcare, education)." />
            <Form.Check type="radio" name="question6" label="I prefer working in entertainment and leisure (e.g., gaming, sports)" />
            <h2>Question 7</h2>
            <Form.Check type="radio" name="question7" label="I prefer science and technology." />
            <Form.Check type="radio" name="question7" label="I prefer design and communication." />
        </div>
    );
}

export default BasicQuestions;
