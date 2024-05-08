import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import OpenAI from 'openai';
import ProgressBarComponent from './ProgressBarComponent';
import './ProgressBarStyle.css';
import './ParallaxStarsStyle.css';
import { ApiKey } from '../ApiKey';
import { ReportContext } from '../ReportContext';

interface DetailedProps {
  changePage: (page: string) => void;
  onQuizComplete: () => void;
}

const DetailedQuestions: React.FC<DetailedProps> = ({ changePage, onQuizComplete }) => {
  const { setReport } = useContext(ReportContext);
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
  const [detailedAnswers, setDetailedAnswers] = useState(Array(detailedQuestions.length).fill(''));
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInputChange = (text: string) => {
    const updatedAnswers = [...detailedAnswers];
    updatedAnswers[currentQuestionIndex] = text;
    setDetailedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (detailedAnswers[currentQuestionIndex].trim() !== '') {
      if (currentQuestionIndex < detailedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (detailedAnswers[currentQuestionIndex + 1] === '' && progress === currentQuestionIndex) {
          setProgress(progress + 1);
        }
      } else {
        generateReport();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const openai = new OpenAI({ apiKey: JSON.parse(localStorage.getItem('MYKEY') as string), dangerouslyAllowBrowser: true });

  const generatePrompt = (questions: string[], answers: string[]) => {
    let QandAprompt = '';
    for (let i = 0; i < questions.length; i++) {
      QandAprompt += `${questions[i]}: ${answers[i]}\n`;
    }
    return `
    Create a career recommender report that is based on the following questions and answers. 
    The report should have 2 different sections. One should have general information about 4 traits that the person seems to exhibit based on their answers.
    It should also include how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. 
    Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered.
    The other section should list 3 different industries and 3 specific job titles within each industry as well as their expected salary range, a brief description of the workplace environment, and any educational requirements. 
    These jobs should be ones that the quiz taker is likely to succeed in. The report SHOULD NOT have an introduction or conclusion or a description of the report. 
    The report should be written like you are talking directly to the person who took the quiz. Only include the two sections described in the report  and this text below them: 
    "These recommended industries and job titles align with your strengths and interests, providing avenues for professional growth and fulfillment based on your career preferences. 
    Consider exploring opportunities within these areas to leverage your skills effectively and achieve your career goals.
    This report aims to guide you towards potential career paths that resonate with your personality traits and preferences. Good luck on your career journey!"
    Here are the questions the user was asked and the answers they selected. They were open ended and the user could enter as much as they wanted. 
    In this list, the question number is given, followed by the question, and then the answer that was selected: 
    ${QandAprompt}
    `;
  };

  const generateReport = async () => {
    setIsLoading(true);
    const promptContent = generatePrompt(
      detailedQuestions.map((q) => q.question),
      detailedAnswers
    );

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: promptContent }],
      max_tokens: 600,
      model: 'gpt-4-turbo',
      temperature: 0.75,
    });

    const reportContent = completion.choices[0].message.content || '';

    setReport(reportContent);
    setIsLoading(false);
    changePage('DetailedReport');
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

       <div id='planet' className={`planetLayer ${isLoading ? 'spin' : ''}`}>
          {isLoading && <div className="loadingText">Loading...</div>}
        </div>


      </div>
      <div className='pageBody'>
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
                    value={detailedAnswers[currentQuestionIndex]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Enter your response here"
                  />
                </div>
                <div className='buttons'>
                  <button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
                  <button onClick={handleNext} disabled={detailedAnswers[currentQuestionIndex].trim() === ''}>Next</button>
                  <button onClick={generateReport} disabled={currentQuestionIndex !== detailedQuestions.length - 1}>Submit</button>
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
