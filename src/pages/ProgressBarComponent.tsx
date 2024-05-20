import { ProgressBar } from 'react-bootstrap';
import './ProgressBarStyle.css';
import rocket from '../assets/Rocket.png';


export type ProgressBarProps= {
   progress: number; 
   total: number; 
   progressText?: string; 
   rocketImagePath: string; 
}


const ProgressBarComponent = ({ rocketImagePath, total, progress, progressText = "" }: ProgressBarProps) => {
   const percentage = (progress / total) * 100;
  //Progress Bar structure and Behavior
   return (
      <div className='wrapper'>
         <ProgressBar now={percentage} label={`${progressText} (${percentage.toFixed(0)}%)`} className="custom-progress-bar"/>
         {/* Rocket image that moves along with the progress */}
         <div
         id ='rocket' 
         style={{
            backgroundImage: `url(${rocket})`, 
            left: `calc(${percentage - 1}%)`, 
            top: '-33px', 
            transform: 'translateY(-20px)', 
            animation: 'idleRocket 2s ease-in-out infinite', 
         }}
         />
      </div>
   );
}

export default ProgressBarComponent;
