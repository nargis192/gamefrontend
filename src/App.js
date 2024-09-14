import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Game from './components/Game';
import Scores from './components/Scores';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleSetToken = (newToken, newUserId) => {
    setToken(newToken);
    setUserId(newUserId);
    if (newToken) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('userId', newUserId); // Ensure userId is saved
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  };
  

  return (
    <Router>
      <Navbar token={token} setToken={handleSetToken} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={handleSetToken} setUserId={setUserId} />} />
        <Route
          path="/game"
          element={
            <PrivateRoute token={token}>
              <Game token={token} userId={userId} />
            </PrivateRoute>
          }
        />
        <Route
          path="/scores"
          element={
            <PrivateRoute token={token}>
              <Scores userId={userId} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
