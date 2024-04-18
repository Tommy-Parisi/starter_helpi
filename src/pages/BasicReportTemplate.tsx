import React from 'react';

interface BasicReportProps {
    changePage: (page: string) => void;
}
const BasicReport: React.FC<BasicReportProps> = ({ changePage }) => {
    return (
        <>
        <div className='pageTop'>
            <h2 className='styledText'>Basic Career Assessment Report</h2>
        </div>

        <div className="pageBody">
        <div className='container'>
            <div className="column">
                <div className = "generalInfoBasic">
                    <h1>General Information</h1>
                    <p>Based on your answers, you showed the following raits of people in industries....</p>
                </div>
            </div>

            <div className="column">
                <div className = "recIndustriesBasic">
                    <h1 className='recBasicHeader'>Recommended Industries</h1>
                    <p className="option1">Option 1: ...</p>
                   <p className="learn">Learn More</p>
                </div>
            </div>
        </div>
        </div>
        </>
        );
}

export default BasicReport;