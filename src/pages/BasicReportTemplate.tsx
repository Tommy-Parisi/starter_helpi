import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

interface BasicReportProps {
    changePage: (page: string) => void;
}
const BasicReport: React.FC<BasicReportProps> = ({ changePage }) => {
    return (
        <div>
            <h1>Basic Career Assessment Report</h1>
        </div>
    );
}

export default BasicReport;