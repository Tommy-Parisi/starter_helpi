import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import OpenAI from 'openai';
import ProgressBarComponent from './ProgressBarComponent';
import './ProgressBarStyle.css';
import './ParallaxStarsStyle.css';
import { ApiKey } from '../ApiKey';
import { ReportContext } from '../ReportContext';

interface BasicProps {
  changePage: (page: string) => void;
  onQuizComplete: () => void;
}

export let basicAnswers: string[] = [];

const BasicQuestions: React.FC<BasicProps> = ({ changePage, onQuizComplete }) => {
  const { setReport } = useContext(ReportContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [progress, setProgress] = useState<number>(0);

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
      changePage('Summary');
    }
    if (currentQuestionIndex === questions.length - 1 && selectedOption) {
      const allQuestionsAnswered = basicAnswers.every((answer) => answer !== '');
      if (allQuestionsAnswered) {
        onQuizComplete();
      }
      changePage('Summary');
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
    const basicPromptFirstHalf = 'Create a career recommender report that is based on the following questions and answers. The report should have 2 different sections. One should have general information about 4 traits that the person seems to exhibit based on their answers. It should also include how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. The other section should list 3 different industries and 3 specific job titles within each industry as well as their expected salary range that the quiz taker is likely to succeed in. The report does not need an introduction or conclusion. Here are the questions the user was asked and the answers they selected. The format of these questions is that the user selects which of the 2 options they feel most applies to them. In this list, the options are separated by commas: ';
    const basicPromptSecondHalf = '"The report should include 3 industries specific to the person that provided the answers. These industries should be ones that the person will likely succeed in. Also provide 3 career options and their salary range within each industry. The report does not need an introduction or conclusion. Make 2 separate sections; One should have general information about 4 traits that the person seems to exhibit and how these might impact their behavior in the workplace. This section should be concise and use bullet points with short sentences for descriptions. Don’t directly quote the given answers in this part, but find traits that they likely have based off of what they answered. The other section should only list the industries and potential careers for each."';

    return `${basicPromptFirstHalf}${QandAprompt}${basicPromptSecondHalf}`;
  };

  const openai = new OpenAI({ apiKey: JSON.parse(localStorage.getItem('MYKEY') as string), dangerouslyAllowBrowser: true });

  const showMyResults = async () => {
    const promptContent = generatePrompt(justQuestions, basicAnswers);
  
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: promptContent }],
      max_tokens: 600,
      model: 'gpt-4-turbo',
      temperature: 0.75,
    });

    const reportContent = completion.choices[0].message.content || '';
  
    setReport(reportContent);

    changePage('BasicReport');
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
        <ProgressBarComponent progress={progress} total={questions.length} progressText={`${progress}/${questions.length}`} rocketImagePath='../assets/Rocket.png' />
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
                  <div className='form'>
                    <Form.Check
                      key={index}
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
                  <button onClick={handleNext} disabled={!selectedOption}>
                    Next
                  </button>
                  <button onClick={showMyResults} disabled={currentQuestionIndex !== questions.length - 1}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>
        <p>© 2024 Helpi. All rights reserved.</p>
        <ApiKey />
      </div>
    </>
  );
};

export default BasicQuestions;
