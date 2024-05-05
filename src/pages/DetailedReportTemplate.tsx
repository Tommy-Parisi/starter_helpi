import React from 'react';

interface DetailedReportProps {
    changePage: (page: string) => void;
    detailedQuizCompleted: boolean;
}

const DetailedReport: React.FC<DetailedReportProps> = ({ changePage, detailedQuizCompleted}) => {
    const handleStartDetailedQuiz = () => {
        // Navigate to the Detailed Quiz page
        changePage('Detailed');
    };
    return(
        <>
        <div className='pageTop'>
            <h2 className='styledText'>Detailed Career Assessment Report</h2>
        </div>
        <div className="pageBodyReportPages">
            {detailedQuizCompleted ? (
        <div className='containerReportPage'>
            <div className="column">
                <div className = "customButtonReportPages">
                    <h1>General Information</h1>
                    <p>Based on your answers, you showed the following raits of people with ... careers.</p>
                </div>
            </div>

            <div className="column">
                <div className = "customButtonReportPages">
                    <h1>Suggested Careers</h1>
                    <p>Option 1: ...</p>
                    <p>Learn More</p>
                </div>
            </div>
        </div>
        ) : (
            <div className='quizPromptLine'>
                    <p>Complete the detailed quiz to get your results!</p>
                </div>
            )}

            {/* Button to take the Basic Quiz */}
            {!detailedQuizCompleted && (
                        <div className='reportPageButtons'>
                            <button className="startQuizButton" onClick={handleStartDetailedQuiz}>Take the Detailed Quiz Now!</button>
                    </div>
            )}


        </div>
        </>
    );
}

export default DetailedReport;
