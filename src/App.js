import './App.css';
import React from 'react';
//import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Diet from './components/Diet';
import Health from './components/Health';

function App() {
  return (
    <Router>
      <div className="Router-Routes">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Diet" element={<Diet />} />
          <Route path="/Health" element={<Health />} />
          {/* 다른 페이지 라우트를 여기에 추가 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
