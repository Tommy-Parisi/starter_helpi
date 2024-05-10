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
    if (!report) return null;
    const sections = [];
    const sectionRegex = /(?<=\*\*).*?(?=\*\*)/gs; // Regex to match content between '**' as sections
    const lineRegex = /- (.*?):(.*?)$/gm; // Regex to match lines in the format '- Key: Value'
    let match;
    let lastIndex = 0;
      // Extract sections from report content
    while ((match = sectionRegex.exec(report))) {
      const sectionTitle = match[0].trim();
      const sectionContent = report.substring(lastIndex, match.index).trim();

        // Extract lines from section content
      const items: { key: string; value: string }[] = [];
      let lineMatch;
      while ((lineMatch = lineRegex.exec(sectionContent))) {
        const key = lineMatch[1].trim();
        const value = lineMatch[2].trim();
        items.push({ key, value });
      }

        // Add section to the sections array
      sections.push({ title: sectionTitle, items });
      lastIndex = match.index + match[0].length;
    }

      // Render sections as JSX
    return (
      <div className="parsedReport">
        {sections.map((section, index) => (
          <div key={index}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.key}</strong>: {item.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

//export default parseReport;

  /*const parseReport = (report : string) => {
    if (!basicReport) return null;
  
    const sections = basicReport.split('**').map((section) => section.trim()).filter((section) => section);
  
    return (
      <div className="parsedReport">
        {sections.map((section, index) => {
          const lines = section.split('-').map((line) => line.trim()).filter((line) => line);
  
          return (
            <div key={index} className="reportSection">
              {lines.map((item, idx) => {
                const [key, value] = item.split(':').map((part) => part.trim());
                return (
                  <div key={idx} className="reportItem">
                    <strong>{key}</strong>: {value}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
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
  };   */

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
