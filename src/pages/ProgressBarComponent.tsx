import { ProgressBar } from 'react-bootstrap';
import './ProgressBarStyle.css';


export type ProgressBarProps= {
   progress: number;
   total: number;
   progressText?: string;
   rocketImagePath: string;
}


const ProgressBarComponent = ({ rocketImagePath, total, progress, progressText = "" }: ProgressBarProps) => {
   const percentage = (progress / total) * 100;
  
   return (
      <div className='wrapper'>
         <ProgressBar now={percentage} label={`${progressText} (${percentage.toFixed(0)}%)`} className="custom-progress-bar"/>
         {/* Rocket image that moves along with the progress */}
         <div
         id = "rocket"
         style={{
            backgroundImage: `url(${rocketImagePath})`,
            left: `calc(${percentage}% - 20px)`,
            top: '50%',
            transform: 'translateY(-50%)',
         }}
         />
      </div>
   );
}

export default ProgressBarComponent;
