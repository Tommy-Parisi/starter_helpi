import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

interface DetailedProps {
    changePage: (page: string) => void;
}

let detailedAnswers = [];
function recordAnswer(answer: string) {
    detailedAnswers.push(answer);
}
function handleClick() {
    recordAnswer((document.getElementById("question1") as HTMLInputElement).value);
    
}

const DetailedQuestions: React.FC<DetailedProps> = ({ changePage }) => {
    
    return (
        <>
        <div>
            <h1>Detailed Questions</h1>
            <p>Dive into the nuances of your dream career with our Detailed Career Questions. This section is crafted for those who seek an in-depth understanding of specific roles, including the skills required, the educational pathways, and the daily responsibilities involved. It includes seven short answer questions and is the perfect tool for refining your career choices, offering a comprehensive look into each profession to ensure you’re well-informed and ready to make your next big career decision.</p>
            <Button onClick={() => changePage('Home')} >Back</Button>
        </div>
        <div>
            {/* All of our detailed questions formatted with a textbox for the user to input their response */}
            <Form.Label>1. What hobbies/activities do you engage in during your free time?</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>2. What are your top three skills or strengths?</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>3. What is your ideal working environment?</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>4. What are your long-term career goals?</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>5. What type of tasks do you find most fulfilling? Include the topic and type.</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>6. What are your favorite subjects or topics to learn about?</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>7. What are the three most predominant qualities of your personality?</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
        </div>
        </>
    );
}

export default DetailedQuestions;

