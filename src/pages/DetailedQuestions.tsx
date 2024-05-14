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
  const { setDetailedReport } = useContext(ReportContext);
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
      QandAprompt += `${i + 1}: ${questions[i]} - ${answers[i]}\n`;
    }
  
    const promptText = `Create a career recommender report based on the questions and answers provided. The report should consist of two sections:
  1. **Personal Traits and Workplace Behavior** - Summarize 4 traits the person exhibits, explaining how these might influence their workplace behavior. Use concise bullet points.
  2. **Recommended Career Paths** - List 3 industries and within each, 3 job titles, including salary ranges, workplace environments, and educational requirements.
  End the report with: "These recommended industries and job titles align with your strengths and interests, providing avenues for professional growth and fulfillment based on your career preferences. Consider exploring opportunities within these areas to leverage your skills effectively and achieve your career goals. This report aims to guide you towards potential career paths that resonate with your personality traits and preferences. Good luck on your career journey!"
  Ensure the response is formatted to be correctly parsed by the provided parseReport function.
  Make the response such that it will work perfectly with this parseReport function that will be used to parse it:
  const parseReport = (report: string): JSX.Element | null => {
    if (!report.trim()) return null;
  
    const sections = report.split('**').map(section => section.trim());
  
    return (
      <div className="reportContainer">
        {sections.map((section, index) => {
          if (!section) return null;
  
          // Splitting section into lines, assuming the first line is the title
          const lines = section.split('\n').map(line => line.trim());
          const title = lines[0]; // First line is the section title
          const content = lines.slice(0); // The rest are content lines

          return (
            <div key={index} className="reportSection">
              <h2 className="sectionTitle">{title}</h2>
              <ul className="sectionContent">
                {content.map((item, idx) => (
                  // Items are expected to start with '-', strip the '-' and trim the content
                  item.startsWith('-') ? <li key={idx}>{item.substring(1).trim()}</li> : null
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };
  `;
  
    return `${promptText}${QandAprompt}`;
  };
  

  const generateReport = async () => {
    setIsLoading(true);
    const promptContent = generatePrompt(
      detailedQuestions.map((q) => q.question),
      detailedAnswers
    );

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: promptContent }],
      max_tokens: 800,
      model: 'gpt-4-turbo',
      temperature: 0.5,
    });

    const reportContent = completion.choices[0].message.content || '';

    setDetailedReport(reportContent);
    setIsLoading(false);
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
