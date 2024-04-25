import React from 'react';

interface DetailedReportProps {
    changePage: (page: string) => void;
}

const DetailedReport: React.FC<DetailedReportProps> = ({ changePage }) => {
    return(
        <>
        <div className='pageTop'>
            <h2 className='styledText'>Detailed Career Assessment Report</h2>
        </div>
        <div className="pageBody">
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
        </div>
        </>
        );
}

export default DetailedReport;
