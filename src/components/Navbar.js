import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
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
    </nav>
  );
};

export default Navbar;
