import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import OpenAI from 'openai';
import ProgressBarComponent from './ProgressBarComponent';
import './ProgressBarStyle.css';
import './ParallaxStarsStyle.css';
import './PlanetStyles.css';
import { ApiKey } from '../ApiKey';
import { ReportContext } from '../ReportContext';
//import { parse } from 'path';
//import { report } from 'process';

interface BasicProps {
  changePage: (page: string) => void;
  onQuizComplete: () => void;
}

export let basicAnswers: string[] = [];



const BasicQuestions: React.FC<BasicProps> = ({ changePage, onQuizComplete }) => {
  const { setBasicReport } = useContext(ReportContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [reportContent, setReportContent] = useState<string>('');

  const questions = [
    {
      question: 'Question 1',
      options: ['I prefer working with numbers and data.', 'I prefer working with words and languages.'],
    },
    {
      question: 'Question 2',
      options: ['I prefer working with other people.', 'I prefer working by myself.'],
    },
    {
      question: 'Question 3',
      options: ['I prefer to be in charge.', 'I prefer to be told what to do.'],
    },
    {
      question: 'Question 4',
      options: ['I prefer my work to be predictable and consistent.', 'I prefer my work to have variety and opportunity for creativity.'],
    },
    {
      question: 'Question 5',
      options: ['I prefer active and hands-on tasks.', 'I prefer working on a computer.'],
    },
    {
      question: 'Question 6',
      options: ['I prefer working to improve quality of life (e.g., healthcare, education).', 'I prefer working in entertainment and leisure (e.g., gaming, sports)'],
    },
    {
      question: 'Question 7',
      options: ['I prefer science and technology.', 'I prefer design and communication.'],
    },
  ];

  const justQuestions = questions.map((question) => question.question);

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
      if (basicAnswers[currentQuestionIndex + 1] !== '') {
        setSelectedOption(basicAnswers[currentQuestionIndex + 1]);
      } else {
        setSelectedOption('');
      }
    } else if (selectedOption && progress === currentQuestionIndex) {
      setProgress(progress + 1);
      showMyResults();
    }
  };

  const handleBack = () => {
    basicAnswers[currentQuestionIndex] = selectedOption;
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(basicAnswers[currentQuestionIndex - 1]);
    }
  };

  const generatePrompt = (questions: string[], answers: string[]) => {
    let QandAprompt = '';
    for (let i = 0; i < questions.length; i++) {
      QandAprompt += `${i}: ${questions[i]} ${basicAnswers[i]}\n`;
    }
    const basicPromptText = `Create a career recommender report that is based on the following questions and answers. The report should have 2 different sections. One should have general information about 4 traits that the person seems to exhibit based on their answers. It should also include how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. 

    The other section should list 3 different industries and 3 specific job titles within each industry as well as their expected salary range and a brief description. The report SHOULD NOT have an introduction or conclusion or a description of the report. The report should be written like you are talking directly to the person who took the quiz. Only include the two sections described in the report and this text below them: "These recommended industries and job titles align with your strengths and interests, providing avenues for professional growth and fulfillment based on your career preferences. Consider exploring opportunities within these areas to leverage your skills effectively and achieve your career goals.
    
    This report aims to guide you towards potential career paths that resonate with your personality traits and preferences. Good luck on your career journey!"
    
    Your response should be formatted with ** at the start of each part you want to be a header, and - to at the start of each point for the content in that section.
    
    Here are the questions the user was asked and the answers they selected. The format of these questions is that the user selects which of the 2 options they feel most applies to them. In this list, the question number is given, followed by the question, and then the answer that was selected:     
    `
    //const basicPromptFirstHalf = 'Create a career recommender report that is based on the following questions and answers. The report should have 2 different sections. One should have general information about 4 traits that the person seems to exhibit based on their answers. It should also include how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. The other section should list 3 different industries and 3 specific job titles within each industry as well as their expected salary range that the quiz taker is likely to succeed in. The report does not need an introduction or conclusion. Here are the questions the user was asked and the answers they selected. The format of these questions is that the user selects which of the 2 options they feel most applies to them. In this list, the options are separated by commas: ';
    //const basicPromptSecondHalf = '"The report should include 3 industries specific to the person that provided the answers. These industries should be ones that the person will likely succeed in. Also provide 3 career options and their salary range within each industry. The report does not need an introduction or conclusion. Make 2 separate sections; One should have general information about 4 traits that the person seems to exhibit and how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. The other section should only list the industries and potential careers for each."';

    return `${basicPromptText}${QandAprompt}`;
  };

  const openai = new OpenAI({ apiKey: JSON.parse(localStorage.getItem('MYKEY') as string), dangerouslyAllowBrowser: true });

  const showMyResults = async () => {
    setIsLoading(true);
    const promptContent = generatePrompt(justQuestions, basicAnswers);

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: promptContent }],
      max_tokens: 600,
      model: 'gpt-4-turbo',
      temperature: 0.75,
    });

    const reportContent = completion.choices[0].message.content || '';
    //export const parsedReport = parseReport(reportContent);


    setBasicReport(reportContent);
    setReportContent(reportContent);
    setIsLoading(false);

    changePage('BasicReport');

    // Clear the quiz after the report is set and the page changes
    resetQuiz();
  };

  const resetQuiz = () => {
    basicAnswers = [];
    setCurrentQuestionIndex(0);
    setProgress(0);
    setSelectedOption('');
  };

  const parseReport = (report: string) => {
    if (!report) return null;

    const sections = report.split('**').filter((section) => section.trim());
    return (
      <div>
        {sections.map((section, index) => {
          const lines = section.trim().split('-').filter((line) => line.trim());
          const title = lines[0];
          const content = lines.slice(1).map((line, idx) => <li key={idx}>{line.trim()}</li>);
          return (
            <div key={index}>
              <h3>{title}</h3>
              <ul>{content}</ul>
            </div>
          );
        })}
      </div>
    );
  };


  useEffect(() => {
    // Initialize/reset the quiz state on mount or load
    resetQuiz();
  }, []);

  
  return (
    <>

      <div className='pageTop'>
        <h2 className='styledText'>Basic Career Questions</h2>
        <ProgressBarComponent progress={progress} total={questions.length} progressText={`${progress}/${questions.length}`} rocketImagePath='../assets/Rocket.png' />
      </div>
        
      <div id='planet' className={`planetLayer ${isLoading ? 'spin' : ''}`}>
          {isLoading && <div className="loadingText">Loading...</div>}
      </div>
        
      <div className='pageBody'>
        <div className='parallax-scrolling'>
          <div id='stars1' className='parallax-star-layer'></div>
          <div id='stars3' className='parallax-star-layer'></div>
          <div className='container1'>
            <div className='column'>
              <div className='customButton1'>
                <h2>{questions[currentQuestionIndex].question}</h2>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <div className='form' key={index}>
                    <Form.Check
                      type='radio'
                      name={`question${currentQuestionIndex + 1}`}
                      label={option}
                      onChange={() => handleOptionChange(option)}
                      checked={selectedOption === option}
                    />
                  </div>
                ))}
                <div className='buttons'>
                  <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
                    Back
                  </button>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button onClick={handleNext} disabled={!selectedOption}>
                      Next
                    </button>
                  ) : (
                    <button onClick={handleNext} disabled={!selectedOption}>
                      Submit
                    </button>
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
        {/* Conditionally render parsed report content */}
        {reportContent && (
        <div className='parsedReport'>
          {parseReport(reportContent)}
        </div>
      )}
    </>
  );
};

export default BasicQuestions;