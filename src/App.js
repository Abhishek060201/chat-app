import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SingUp/SignUp';
import Login from './components/Login/Login';
import JoinChat from './components/JoinChat/JoinChat';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;