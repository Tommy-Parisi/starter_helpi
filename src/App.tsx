import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import BasicQuestions from './pages/BasicQuestions';
import DetailedQuestions from './pages/DetailedQuestions';
import BasicReport from './pages/BasicReportTemplate';
import { Header } from './pages/Header';


function App() {
  const [currentPage , setCurrentPage] = useState<string>('Home'); //for the current page the user is on

  /* State change to navigate to different pages */
  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case 'Basic':
        return <BasicQuestions changePage={setCurrentPage} />;
      case 'Detailed':
        return <DetailedQuestions changePage={setCurrentPage} />;
      default:
        return <Home changePage = {setCurrentPage}/>;
      case 'BasicReport':
        return <BasicReport changePage={setCurrentPage} />;
      case 'DetailedReport':
        return <DetailedQuestions changePage={setCurrentPage} />;
    }
  }

  return (
    <div className="App">
      <Header changePage={setCurrentPage}/>

      {renderPage()}

    
    </div>
  );
}

export default App;