import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import BasicQuestions from './pages/BasicQuestions';
import DetailedQuestions from './pages/DetailedQuestions';
import { Header } from './pages/Header';
import { Footer } from './pages/Footer';

function App() {
  const [currentPage , setCurrentPage] = useState<string>('Home'); //for the current page the user is on

  /* State change for the different pages */
  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case 'Basic':
        return <BasicQuestions changePage={setCurrentPage} />;
      case 'Detailed':
        return <DetailedQuestions changePage={setCurrentPage} />;
      default:
        return <Home changePage = {setCurrentPage}/>;
    }
  }

  return (
    <div className="App">
      <Header changePage={setCurrentPage}/>

      {renderPage()}

      <Footer changePage={setCurrentPage}/>
    </div>
  );
}

export default App;