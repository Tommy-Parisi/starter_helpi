import { ProgressBar } from 'react-bootstrap';


export type ProgressBarProps= {
   progress: number;
   total: number;
   progressText?: string;
}


const ProgressBarComponent = ({ total, progress, progressText = "" }: ProgressBarProps) => {
   const percentage = (progress / total) * 100;
  
   return (
       <ProgressBar now={percentage} label={`${progressText} (${percentage.toFixed(0)}%)`} />
   );
}

export default ProgressBarComponent;
