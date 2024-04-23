import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

interface DetailedProps {
    changePage: (page: string) => void;
}

let detailedAnswers: string[] = [];

const DetailedQuestions: React.FC<DetailedProps> = ({ changePage }) => {
    // Function to record the user's responses to the detailed questions, call report generator, and move to report page
    const handleClick = () => {
        detailedAnswers.push((document.getElementById("question1") as HTMLTextAreaElement).value);
        detailedAnswers.push((document.getElementById("question2") as HTMLTextAreaElement).value);
        detailedAnswers.push((document.getElementById("question3") as HTMLTextAreaElement).value);
        detailedAnswers.push((document.getElementById("question4") as HTMLTextAreaElement).value);
        detailedAnswers.push((document.getElementById("question5") as HTMLTextAreaElement).value);
        detailedAnswers.push((document.getElementById("question6") as HTMLTextAreaElement).value);
        detailedAnswers.push((document.getElementById("question7") as HTMLTextAreaElement).value);
        console.log(detailedAnswers);
        changePage('DetailedReport')
    }
    
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
            id = "question1"
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>2. What are your top three skills or strengths?</Form.Label>
            <Form.Control
            id = "question2"
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>3. What is your ideal working environment?</Form.Label>
            <Form.Control
            id = "question3"
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>4. What are your long-term career goals?</Form.Label>
            <Form.Control
            id = "question4"
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>5. What type of tasks do you find most fulfilling? Include the topic and type.</Form.Label>
            <Form.Control
            id = "question5"
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>6. What are your favorite subjects or topics to learn about?</Form.Label>
            <Form.Control
            id = "question6"
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
            <Form.Label>7. What are the three most predominant qualities of your personality?</Form.Label>
            <Form.Control
            id = "question7"
            as="textarea"
            rows={3}
            placeholder="Enter your response here"/>
        </div>
        <Button onClick={() => handleClick()}>Submit</Button>
        </>
    );
}

export default DetailedQuestions;

