import './App.css';
import * as React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Question1Page from './pages/Question1Page';
import Question2Page from './pages/Question2Page';
import Question3Page from './pages/Question3Page';
import Question4Page from './pages/Question4Page';
import { UserProvider } from "./context/UserContext";
import ResultPage from './pages/ResultPage';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div className="Representation-of-header">
        <Router>
          <UserProvider>
          <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/question1/" element={<Question1Page/>}/>
            <Route path="/question2/" element={<Question2Page/>}/>
            <Route path="/question3/" element={<Question3Page/>}/>
            <Route path="/question4/" element={<Question4Page/>}/>
            <Route path="/result/" element={<ResultPage/>}/>
          </Routes>
          </UserProvider>
        </Router>
        </div>
      </header>
    </div>
  );
}

export default App;

