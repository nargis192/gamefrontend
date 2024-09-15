import React, { useState, useEffect } from 'react';
import { getScores } from '../services/api';
import './Scores.css';

const Scores = ({ userId }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const result = await getScores(userId);
        setScores(result);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };
    fetchScores();
  }, [userId]);

  return (
    <div className="scores-container">
      <h2>Your Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.score}</td>
              <td>{new Date(score.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scores;



