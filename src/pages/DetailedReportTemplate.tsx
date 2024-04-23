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
        <div className='container'>
            <div className="column">
                <div className = "generalInfoBasic">
                    <h1>General Information</h1>
                    <p>Based on your answers, you showed the following raits of people with ... careers.</p>
                </div>
            </div>

            <div className="column">
                <div className = "recIndustriesBasic">
                    <h1 className='recBasicHeader'>Suggested Careers</h1>
                    <p className="option1">Option 1: ...</p>
                   <p className="learn">Learn More</p>
                </div>
            </div>
        </div>
        </div>
        </>
        );
}

export default DetailedReport;
