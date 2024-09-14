import React, { useState, useEffect } from 'react';
import { getScores } from '../services/api';

const Scores = ({ token }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const data = await getScores(userId);
          setScores(data);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, [token]);

  return (
    <div>
      <h2>Scoreboard</h2>
      <ul>
        {scores.length > 0 ? (
          scores.map((score) => (
            <li key={score._id}>
              Score: {score.score}, Date: {new Date(score.date).toLocaleDateString()}
            </li>
          ))
        ) : (
          <p>No scores available.</p>
        )}
      </ul>
    </div>
  );
};

export default Scores;


