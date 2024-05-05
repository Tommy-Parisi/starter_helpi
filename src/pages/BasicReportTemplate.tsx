import React, { useEffect } from 'react';

interface BasicReportProps {
    changePage: (page: string) => void;
    basicQuizCompleted: boolean; 
}
const BasicReport: React.FC<BasicReportProps> = ({ changePage, basicQuizCompleted }) => {
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

    const handleStartBasicQuiz = () => {
        // Navigate to the Basic Quiz page
        changePage('Basic');
    };

    return (
        <>
        <div className='pageTop'>
            <h2 className='styledText'>Basic Career Assessment Report</h2>
        </div>

        <div className="pageBodyReportPages">
        <div className ='parallax-scrolling'>
            <div id='stars1' className="parallax-star-layer"></div>
            <div id='stars3' className="parallax-star-layer"></div>
            {basicQuizCompleted ? (
                <div className='containerReportPage'>
                    <div className="column">
                        <div className="customButtonReportPages">
                            <h1>General Information</h1>
                            <p>Based on your answers, you showed the following raits of people in industries...</p>
                        </div>
                    </div>

                    <div className="column">
                    <div className="customButtonReportPages">
                        <h1>Recommended Industries</h1>
                        <div className="option">
                            <div>Option 1: ...</div>
                        </div>
                        <div className="learn">
                        <div>Learn More</div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className='quizPromptLine'>
                    <p>Complete the basic quiz to get your results!</p>
            </div>
        )}
            {/* Button to take the Basic Quiz */}
                {!basicQuizCompleted && (
                    <div className='reportPageButtons'>
                        <button className="startQuizButton" onClick={handleStartBasicQuiz}>Take the Basic Quiz Now!</button>
                    </div>
            )}
        </div>
        </div>
    </>
    );
}

export default BasicReport;