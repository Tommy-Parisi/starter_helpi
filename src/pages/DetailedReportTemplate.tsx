import React, { useEffect, useContext } from 'react';
import './Styles.css';
import { Button } from 'react-bootstrap';
import { ApiKey } from '../ApiKey';
import './ParallaxStarsStyle.css';
import { ReportContext } from '../ReportContext';
interface DetailedReportProps {
    changePage: (page: string) => void;
    detailedQuizCompleted: boolean;
}

const DetailedReport: React.FC<DetailedReportProps> = ({ changePage, detailedQuizCompleted}) => {
  
  const parseReport = (report: string): JSX.Element | null => {
    if (!report.trim()) return null;
  
    const sections = report.split('**').map((section) => section.trim());
    
    return (
      <div>
        {sections.map((section, index) => {
          if (!section) return null;
  
          const lines = section.split('\n').map((line) => line.trim());
          const title = lines[0];
          const content = lines.slice(1).filter((line) => line.trim().startsWith('-'));
  
          return (
            <div key={index}>
              <h3>{title}</h3>
              <ul>
                {content.map((item, idx) => (
                  <li key={idx}>{item.trim().substring(1)}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  /*const parseReport = (report: string): JSX.Element | null => {
    if (!report.trim()) return null;
  
    const sections = report.split('###').map((section) => section.trim());
    
    let traitsSection: JSX.Element | null = null;
    const recommendedPaths: JSX.Element[] = [];
  
    sections.forEach((section, index) => {
      if (!section) return;
  
      const lines = section.split('\n').map((line) => line.trim());
      if (lines.length === 0) return;
  
      const title = lines[0];
  
      if (title.startsWith("Personal Traits and Workplace Behavior")) {
        // Parse and format personal traits and workplace behavior
        const traitsContent = lines.slice(1).filter((line) => line.trim().startsWith('-'));
        const traitsList = traitsContent.map((item, idx) => {
          const [trait, ...descriptions] = item.substring(1).split(':').map((part) => part.trim());
          const description = descriptions.join(': '); // Handle multi-part descriptions
          return (
            <li key={idx}>
              <strong>{trait}</strong>: {description}
            </li>
          );
        });
  
        traitsSection = (
          <div key={index}>
            <h2>{title}</h2>
            <ul>{traitsList}</ul>
          </div>
        );
      } else if (title.startsWith("Recommended Career Paths")) {
        // Parse and format recommended career paths
        const industriesAndJobs = lines.slice(1).join('\n').split('**Industry: ');
  
        industriesAndJobs.forEach((industryJobs, idx) => {
          if (idx === 0) return; // Skip first empty split
          const [industry, ...jobs] = industryJobs.split(/\d+\. /);
  
          const jobsList = jobs.map((job, jobIdx) => {
            const jobDetails = job.split(/\n(?=\d+\. )/);
            const jobTitle = jobDetails[0].trim();
            const jobDetailsList = jobDetails.slice(1).map((detail) => detail.trim());
  
            return (
              <div key={jobIdx}>
                <h3>{jobTitle}</h3>
                <ul>
                  {jobDetailsList.map((detail, detailIdx) => (
                    <li key={detailIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            );
          });
  
          recommendedPaths.push(
            <div key={idx}>
              <h2>{industry}</h2>
              {jobsList}
            </div>
          );
        });
      }
    });
  
    // Render the parsed sections
    return (
      <div>
        {traitsSection}
        {recommendedPaths}
      </div>
    );
  };
  */

  const { detailedReport } = useContext(ReportContext);

    const handleStartDetailedQuiz = () => {
        // Navigate to the Detailed Quiz page
        changePage('Detailed');
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

    return(
        <>
           <div className='pageTop'>
        <h2 className='styledText'>Detailed Report</h2>
      </div>
      <div className='pageBody'>
        <div className='parallax-scrolling'>
          <div id='stars1' className='parallax-star-layer'></div>
          <div id='stars3' className='parallax-star-layer'></div>
          <div className='container1'>
            <div className='column'>
              
              {/* Button showing the generated career report or a placeholder */}
              {!detailedReport ? (
              <Button className='customButton2' onClick={handleStartDetailedQuiz}>
              Take the Detailed Quiz to get your result!</Button>
                ) : 
                null
                }
                {detailedReport ? (
                  <div className='reportContainer' >
                    <h3>Career Report</h3>
                    <p>{parseReport(detailedReport)}</p>
                  </div>
                ) : null}
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
}

export default DetailedReport;
