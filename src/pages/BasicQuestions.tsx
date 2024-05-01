import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import ProgressBarComponent from './ProgressBarComponent';
import './ProgressBarStyle.css'; 
import './ParallaxStarsStyle.css';
import { useEffect } from 'react';
import submitAnswers from './ReportResults';

interface BasicProps {
    changePage: (page: string) => void;
}

export let basicAnswers: string[] = [];


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
    const [progress, setProgress] = useState<number>(0);

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        basicAnswers[currentQuestionIndex] = selectedOption;
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            if (selectedOption && progress === currentQuestionIndex) {
                setProgress(progress + 1);
            }
            setSelectedOption("");
        } else if (selectedOption && progress === currentQuestionIndex) {
            setProgress(progress + 1);
            changePage('Summary');
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption("");
        }
    };


    


   useEffect(() => {
    const handleScroll = () => {
        const yPos = window.scrollY;

        const stars1 = document.getElementById('stars1');
        const stars2 = document.getElementById('stars2');
        const stars3 = document.getElementById('stars3');
        
        if (stars1) stars1.style.transform = `translateY(-${yPos * 0.5}px)`;
        if (stars2) stars2.style.transform = `translateY(-${yPos * 0.3}px)`;
        if (stars3) stars3.style.transform = `translateY(-${yPos * 0.1}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

return (
    <>
        <div className='pageTop'>
            <h2 className='styledText'>Basic Career Questions</h2>
            <ProgressBarComponent 
                progress={progress} 
                total={questions.length} 
                progressText={`${progress}/${questions.length}`} 
                rocketImagePath="../assets/Rocket.png"
            />
        </div>
        <div className="pageBody">
            <div className ='parallax-scrolling'>
                <div id='stars1' className="parallax-star-layer"></div>
                <div id='stars3' className="parallax-star-layer"></div>
                <div className='container1'>
                    <div className="column">
                        <div className="customButton1">
                            <h2>{questions[currentQuestionIndex].question}</h2>
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <div className='form'>
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    name={`question${currentQuestionIndex + 1}`}
                                    label={option}
                                    onChange={() => handleOptionChange(option)}
                                    checked={selectedOption === option}
                                />
                                </div>
                            ))}
                            <div className='buttons'>
                            <button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
                            <button onClick={handleNext} disabled={!selectedOption}>Next</button>
                            <button onClick={submitAnswers} disabled={currentQuestionIndex !== questions.length - 1}>Submit</button>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
        <div className="footer">
            <p>© 2024 Helpi. All rights reserved.</p>
            <ApiKey />
        </div>
    </>
);
};

export default BasicQuestions;

