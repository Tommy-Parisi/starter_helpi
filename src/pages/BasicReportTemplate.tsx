import React, { useEffect, useContext } from 'react';
import './Styles.css';
import { Button } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import './ParallaxStarsStyle.css';
import { ReportContext } from '../ReportContext';
//import { parsedReport } from './BasicQuestions';
        

interface BasicReportProps {
  changePage: (page: string) => void;
  basicQuizCompleted: boolean;
}

const BasicReport: React.FC<BasicReportProps> = ({ changePage, basicQuizCompleted }) => {

  const parseReport = (report: string): JSX.Element | null => {
    if (!report.trim()) return null;
  
    const sections = report.split('**').map((section) => section.trim());
  
    return (
      <div>
        {sections.map((section, index) => {
          if (!section) return null;
  
          const lines = section.split('\n').map((line) => line.trim());
          const title = lines[0];
          const content = lines.slice(1).filter((line) => line.startsWith('-'));
  
          return (
            <div key={index}>
              <h3>{title}</h3>
              <ul>
                {content.map((item, idx) => (
                  <li key={idx}>{item.substring(1).trim()}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

//export default parseReport;


  const { basicReport } = useContext(ReportContext);
  const parsedReport = parseReport(basicReport);

  const handleStartBasicQuiz = () => {
    // Navigate to the Basic Quiz page
    changePage('Basic');
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
        <h2 className='styledText'>Basic Report</h2>
      </div>
      <div className='pageBody'>
        <div className='parallax-scrolling'>
          <div id='stars1' className='parallax-star-layer'></div>
          <div id='stars3' className='parallax-star-layer'></div>
          <div className='container1'>
            <div className='column'>
              {/* Button showing the generated career report or a placeholder */}
                {!basicReport ? (
                  <Button className='customButton2' onClick={handleStartBasicQuiz}>
                  'Take the Basic Quiz to get your result!' </Button>
                ) : 
                null
                }
              {basicReport ? <div>
                    <h3>Career Report</h3>
                    <p>{parsedReport}</p>
                  </div> : null}
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

export default BasicReport;
