import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import ProgressBarComponent from './ProgressBarComponent';
import './ProgressBarStyle.css'; 
import './ParallaxStarsStyle.css';
import { useEffect } from 'react';
import OpenAI from "openai";

interface BasicProps {
    changePage: (page: string) => void;
}

export let basicAnswers: string[] = [];


const BasicQuestions: React.FC<BasicProps> = ({ changePage }) => {
    let basicPromptFirstHalf = "Create a career recommender report that is based on the following questions and answers. The report should have 2 different sections. One should have general information about 4 traits that the person seems to exhibit based on their answers. It should also include how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. The other section should list 3 different industries and 3 specific job titles within each industry as well as their expected salary range that the quiz taker is likely to succeed in. The report does not need an introduction or conclusion. Here are the questions the user was asked and the answers they selected. The format of these questions is that the user selects which of the 2 options they feel most applies to them. In this list, the options are separated by commas: "
let basicPromptSecondHalf = `"The report should include 3 industries specific to the person that provided the answers. These industries should be ones that the person will likely succeed in. Also provide 3 career options and their salary range within each industry. The report does not need an introduction or conclusion. Make 2 separate sections; One should have general information about 4 traits that the person seems to exhibit and how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. The other section should only list the industries and potential careers for each. Here is the javascript code that gives an example of the formatting of the report. Give the results back to me written in javascript. Include one sentence of detail about the traits and explain them in first person like you are talking directly to the person who took the quiz.
const BasicReport: React.FC<BasicReportProps> = ({ changePage }) => {
   return (
       <>
       <div className='pageTop'>
           <h2 className='styledText'>Basic Career Assessment Report</h2>
       </div>


       <div className="pageBody">
       <div className='container'>
           <div className="column">
               <div className = "generalInfoBasic">
                   <h1>General Information</h1>
                   <p>Based on your answers, you showed the following raits of people in industries....</p>
               </div>
           </div>


           <div className="column">
               <div className = "recIndustriesBasic">
                   <h1 className='recBasicHeader'>Recommended Industries</h1>
                   <p className="option1">Option 1: ...</p>
                  <p className="learn">Learn More</p>
               </div>
           </div>
       </div>
       </div>
       </>
       );
}
"`;
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

    const justQuestions = questions.map((question) => question.question);

  
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

    const generatePrompt = (questions: string[], answers: string[]) => {
        let QandAprompt = '';
        for (let i = 0; i < questions.length; i++) {
            QandAprompt += [i] + ':' + questions[i] + ' ' + basicAnswers[i] + '/n'
        }
        return basicPromptFirstHalf + QandAprompt + basicPromptSecondHalf;
    }

    const openai = new OpenAI({apiKey: JSON.parse(localStorage.getItem("MYKEY") as string), dangerouslyAllowBrowser: true});
    async function showMyResults() {
            const completion = await openai.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: generatePrompt(justQuestions, basicAnswers),
                    },
                ],
                max_tokens: 150,
                model: "gpt-4-turbo",
                temperature: 0.75,
            });
        
            console.log(completion.choices[0].message.content);
        }
    


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
                            <button onClick={showMyResults} disabled={currentQuestionIndex !== questions.length - 1}>Submit</button>
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