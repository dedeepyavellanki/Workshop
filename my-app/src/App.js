import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Statistics from './components/Statistics';
import Repository from './components/Repository';
import Workshops from './components/workshops/Workshops';
import Login from './components/Login/Login';
import NavBar from './components/navbar/NavBar'; // Import the NavBar component

function App() {
  return (
    <Router>
      <NavBar /> {/* Add the NavBar component here */}
      <div className="App">
        <header className="App-header">
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/repository" element={<Repository />} />
          <Route path="/workshops" element={<Workshops />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
