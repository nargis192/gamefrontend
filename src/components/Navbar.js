import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Navbar.css'

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <nav>
      <div className='navbar-container'>'
     
      {!token ? (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/game">Game</Link>
          <Link to="/scores">Scores</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      </div>
      
    </nav>
  );
};

export default Navbar;
