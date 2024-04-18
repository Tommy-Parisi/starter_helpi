import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import ProgressBarComponent from './ProgressBarComponent';

interface BasicProps {
    changePage: (page: string) => void;
}

const BasicQuestions: React.FC<BasicProps> = ({ changePage }) => {
    const questions = [
        {
            question: "Question 1",
            options: [
                "I prefer working with numbers and data.",
                "I prefer working with words and languages."
            ]
        },
        {
            question: "Question 2",
            options: [
                "I prefer working with other people.",
                "I prefer working by myself."
            ]
        },
        {
            question: "Question 3",
            options: [
                "I prefer to be in charge.",
                "I prefer to be told what to do."
            ]
        },
        {
            question: "Question 4",
            options: [
                "I prefer my work to be predictable and consistent.",
                "I prefer my work to have variety and opportunity for creativity."
            ]
        },
        {
            question: "Question 5",
            options: [
                "I prefer active and hands on tasks.",
                "I prefer working on a computer."
            ]
        },
        {
            question: "Question 6",
            options: [
                "I prefer working to improve quality of life (e.g., healthcare, education).",
                "I prefer working in entertainment and leisure (e.g., gaming, sports)"
            ]
        },
        {
            question: "Question 7",
            options: [
                "I prefer science and technology.",
                "I prefer design and communication."
            ]
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption("");
            } else {
                changePage('Summary');
            }
        }, 600);
    };

    const question = questions[currentQuestionIndex];
    const totalQuestions = 7;
    const [progress, setProgress] = useState<number>(0);

    
    const handleAnswer = (questionNumber: number) => (event: React.MouseEvent<HTMLInputElement>) =>{
        if(progress <= questionNumber){
            setProgress(progress + 1);
        }
   }


    return (
        <>
            <div className='pageTop'>
                <h2 className='styledText'>Basic Career Questions</h2>
                <ProgressBarComponent progress={progress} total={totalQuestions} progressText={`${progress}/${totalQuestions}`} />
            </div>
            <div className="pageBody1">
                <div className='container1'>
                    <div className="column">
                        <Button className="customButton1" onClick={() => {}}>
                            <h2>{question.question}</h2>
                            {question.options.map((option, index) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    name={`question${currentQuestionIndex + 1}`}
                                    label={option}
                                    onChange={() => handleOptionChange(option)}
                                    checked={selectedOption === option}
                                    onClick={handleAnswer(currentQuestionIndex)}
                                />
                            ))}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="footer1">
                <p>© 2024 Helpi. All rights reserved.</p>
                <ApiKey />
            </div>
        </>
    );
};

export default BasicQuestions;
