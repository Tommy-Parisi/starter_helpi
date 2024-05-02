import React from 'react';

interface BasicReportProps {
    changePage: (page: string) => void;
    basicQuizCompleted: boolean; 
}
const BasicReport: React.FC<BasicReportProps> = ({ changePage, basicQuizCompleted }) => {
    const handleStartBasicQuiz = () => {
        // Navigate to the Basic Quiz page
        changePage('Basic');
    };

    return (
        <>
        <div className='pageTop'>
            <h2 className='styledText'>Basic Career Assessment Report</h2>
        </div>

        <div className="pageBody">
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
                        <h2>Option 1: ...</h2>
                        <p>Learn More</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className='containerReportPage'>
                    <p>Complete the basic quiz to get your results!</p>
            </div>
        )}
            {/* Button to take the Basic Quiz */}
                {!basicQuizCompleted && (
                    <div className="containerReportPage">
                        <button className="startQuizButton" onClick={handleStartBasicQuiz}>Take the Basic Quiz Now!</button>
                    </div>
            )}
        </div>
    </>
    );
}

export default BasicReport;