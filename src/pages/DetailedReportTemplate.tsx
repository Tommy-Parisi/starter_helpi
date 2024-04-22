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
        </>
        );
}

export default DetailedReport;
