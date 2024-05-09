import React, { useState, useEffect, useContext, useCallback } from 'react';
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

// DetailedQuestions.tsx

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

  const openai = new OpenAI({ apiKey: JSON.parse(localStorage.getItem('MYKEY') as string), dangerouslyAllowBrowser: true });

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

  // Use useCallback to prevent resetting the function reference on every render
  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setProgress(0);
    setDetailedAnswers(Array(detailedQuestions.length).fill(''));
  }, [detailedQuestions.length]);

  useEffect(() => {
    // Initialize/reset the quiz state on mount or load
    resetQuiz();
  }, [resetQuiz]);

  const handleInputChange = (text: string) => {
    const updatedAnswers = [...detailedAnswers];
    updatedAnswers[currentQuestionIndex] = text;
    setDetailedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (detailedAnswers[currentQuestionIndex].trim() !== '') {
      if (currentQuestionIndex < detailedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (progress === currentQuestionIndex) {
          setProgress(progress + 1);
        }
      } else {
        setProgress(progress + 1);
        generateReport();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const generatePrompt = (questions: string[], answers: string[]) => {
    let QandAprompt = '';
    for (let i = 0; i < questions.length; i++) {
      QandAprompt += `${questions[i]}: ${answers[i]}\n`;
    }
    return `
      Create a career recommender report based on the following questions and answers.
      1. List three key personality traits that the individual seems to exhibit.
      2. Recommend three suitable career paths along with specific job titles and salary ranges.
      Here are the questions and answers:
      ${QandAprompt}
    `;
  };

  const generateReport = async () => {
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
    changePage('DetailedReport');

    // Reset the quiz after the report is shown
    resetQuiz();
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
                  {currentQuestionIndex < detailedQuestions.length - 1 ? (
                    <button onClick={handleNext} disabled={detailedAnswers[currentQuestionIndex].trim() === ''}>Next</button>
                  ) : (
                    <button onClick={handleNext} disabled={detailedAnswers[currentQuestionIndex].trim() === ''}>Submit</button>
                  )}
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
