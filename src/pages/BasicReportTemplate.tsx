import React from 'react';

interface BasicReportProps {
    changePage: (page: string) => void;
    basicQuizCompleted: boolean; // Define the basicQuizCompleted prop
}
const BasicReport: React.FC<BasicReportProps> = ({ changePage, basicQuizCompleted }) => {
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
                            <p>Based on your answers, you showed the following raits of people in industries....</p>
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
                    <p>Complete the Basic quiz to get your results!</p>
            </div>
        )}
    </div>
    </>
    );
}

export default BasicReport;