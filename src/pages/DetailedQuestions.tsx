import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ProgressBarComponent from './ProgressBarComponent';
import './ProgressBarStyle.css'; 
import './ParallaxStarsStyle.css';
import { ApiKey } from '../ApiKey';

interface DetailedProps {
    changePage: (page: string) => void;
}

export let detailedAnswers: string[] = [];

const DetailedQuestions: React.FC<DetailedProps> = ({ changePage }) => {

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

    const detailedQuestions = [
        { questionNumber: "Question 1", question: "What hobbies/activities do you engage in during your free time?" },
        { questionNumber: "Question 2", question: "What are your top three skills or strengths?" },
        { questionNumber: "Question 3", question: "What is your ideal working environment?" },
        { questionNumber: "Question 4", question: "What are your long-term career goals?" },
        { questionNumber: "Question 5", question: "What type of tasks do you find most fulfilling? Include the topic and type." },
        { questionNumber: "Question 6", question: "What are your favorite subjects or topics to learn about?" },
        { questionNumber: "Question 7", question: "What are the three most predominant qualities of your personality?" }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(detailedQuestions.length).fill(""));
    const [progress, setProgress] = useState(0);

    const handleInputChange = (text: string) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = text;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (answers[currentQuestionIndex].trim() !== "") {
            detailedAnswers[currentQuestionIndex] = answers[currentQuestionIndex];
            if (currentQuestionIndex < detailedQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setProgress(progress + 1);
            } else {
                console.log(answers);
                changePage('DetailedReport');
            }
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <>
            <div className='pageTop'>
                <h2 className='styledText'>Detailed Career Questions</h2>
                <ProgressBarComponent 
                    progress={progress} 
                    total={detailedQuestions.length} 
                    progressText={`${progress}/${detailedQuestions.length}`} 
                    rocketImagePath="../assets/Rocket.png"
                />
            </div>
            <div className="pageBody">
                <div className='parallax-scrolling'>
                    <div id='stars1' className="parallax-star-layer"></div>
                    <div id='stars3' className="parallax-star-layer"></div>
                    <div className='container1'>
                        <div className="column">
                            <div className="customButton1">
                                <h2>{detailedQuestions[currentQuestionIndex].questionNumber}</h2>
                                <p>{detailedQuestions[currentQuestionIndex].question}</p>
                                <div className='form'>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={answers[currentQuestionIndex]}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    placeholder="Enter your response here"
                                />
                                </div>
                                <div className='buttons'>
                                <button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
                                <button onClick={handleNext} disabled={answers[currentQuestionIndex].trim() === ""}>Next</button>
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

export default DetailedQuestions;
