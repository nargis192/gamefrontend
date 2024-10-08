import React, { useState } from 'react';
import { signupUser } from '../services/api';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signupUser({ username, password });
      if (result.error) {
        setMessage(result.error);
      } else {
        navigate('/login');
        setMessage('Signup successful! Please login.');
      }
    } catch (err) {
      setMessage('Failed to signup. Please try again later.');
    }
  };

  return (
    <div className='signup-container'>
      <h2 >Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;


