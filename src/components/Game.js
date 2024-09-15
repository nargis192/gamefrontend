import React, { useState, useEffect } from 'react';
import { submitScore, getScores } from '../services/api';
import '../components/Game.css';

const Game = ({ token, userId }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(null);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  
  useEffect(() => {
    const fetchHighScore = async () => {
      try {
        if (userId) {
          const scores = await getScores(userId);
          const userHighScore = scores.reduce((max, score) => Math.max(max, score.score), 0);
          setHighScore(userHighScore);
        }
      } catch (error) {
        console.error('Error fetching high score:', error);
      }
    };

    fetchHighScore();
  }, [userId]);

  useEffect(() => {
    const initializeCards = () => {
      const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
      const shuffledCards = cardValues.sort(() => Math.random() - 0.5).map(value => ({
        value,
        flipped: false
      }));
      setCards(shuffledCards);
    };

    initializeCards();
  }, []);


  useEffect(() => {
    let interval = null;

    if (isGameActive && !gameOver) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    if (timer >= 60) {
      clearInterval(interval);
      setGameOver(true);
      setIsGameActive(false); 
      setMessage('Game Over! Time is up.');
    }

    return () => clearInterval(interval);
  }, [isGameActive, timer, gameOver]);


  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].flipped || gameOver) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else if (flippedIndices.length === 1) {
      const [firstIndex] = flippedIndices;
      const secondIndex = index;

      if (newCards[firstIndex].value === newCards[secondIndex].value) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setScore(score + 1);

        
        if (matchedCards.length + 2 === cards.length) {
          setIsGameActive(false);
          setMessage('Congratulations! You matched all cards!');
        }
      } else {
        setTimeout(() => {
          newCards[firstIndex].flipped = false;
          newCards[secondIndex].flipped = false;
          setCards(newCards);
        }, 1000);
      }

      setFlippedIndices([]);
    }
  };

  const handleSubmitScore = async () => {
    if (!userId || score === 0) {
      setMessage('User ID or score is missing.');
      return;
    }

    try {
      const result = await submitScore(userId, score, timer);
      if (result) {
        setHighScore(result.highScore);
        setMessage('Score submitted successfully!');
      }
    } catch (error) {
      console.error('Error in handleSubmitScore:', error);
      setMessage('Failed to submit score.');
    }

    setIsGameActive(false);
  };

  return (
    <div>
      <h3>Flip Card Memory Game</h3>
      <p>Current Score: {score}</p>
      <p>High Score: {highScore}</p>
      <p>Timer: {timer} seconds</p>
      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.flipped || matchedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {card.flipped || matchedCards.includes(index) ? card.value : '?'}
          </div>
        ))}
      </div>
      {!isGameActive && !gameOver ? (
        <button className="gamebutton" onClick={() => { setIsGameActive(true); setTimer(0); setGameOver(false); setMessage(''); }}>Start Game</button>
      ) : (
        <button className="gamebutton" onClick={handleSubmitScore}>Submit Score</button>
      )}
      <p>{message}</p>
    </div>
  );
};

export default Game;
