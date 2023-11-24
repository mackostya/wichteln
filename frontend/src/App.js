import './App.css';
import * as React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className="Representation-of-header">
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/question/" element={<QuestionPage/>}/>
            <Route path="/result/" element={<ResultPage/>}/>
          </Routes>
        </Router>
        </div>
      </header>
    </div>
  );
}

export default App;

