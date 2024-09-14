import React, { useState } from 'react';
import { submitScore } from '../services/api';

const Game = ({ token, userId }) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmitScore = async () => {
    if (!userId || !score) {
      setMessage('User ID or score is missing.');
      return;
    }
  
    try {
      const result = await submitScore(userId, score);
      if (result) {
        setHighScore(result.highScore);
        setMessage('Score submitted successfully!');
      }
    } catch (error) {
      console.error('Error in handleSubmitScore:', error.response?.data || error.message); // Log detailed error
      setMessage('Failed to submit score.');
    }
  };
  
  

  return (
    <div>
      <h2>Play Game</h2>
      <p>Current Score: {score}</p>
      <button onClick={() => setScore(score + 1)}>Increase Score</button>
      <button onClick={handleSubmitScore}>Submit Score</button>
      {highScore && <p>Your High Score: {highScore}</p>}
      <p>{message}</p>
    </div>
  );
};

export default Game;

