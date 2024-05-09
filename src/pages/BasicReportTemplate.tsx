import React, { useEffect, useContext } from 'react';
import './Styles.css';
import { Button } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import './ParallaxStarsStyle.css';
import { ReportContext } from '../ReportContext';
        

interface BasicReportProps {
  changePage: (page: string) => void;
  basicQuizCompleted: boolean;
}

const BasicReport: React.FC<BasicReportProps> = ({ changePage, basicQuizCompleted }) => {


  const { basicReport } = useContext(ReportContext);

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
              <Button className='customButton2' onClick={handleStartBasicQuiz}>
                {basicReport ? (
                  <div>
                    <h3>Career Report</h3>
                    <p>{basicReport}</p>
                  </div>
                ) : (
                'Take the Basic Quiz to get your result!'
                )}
              </Button>
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
