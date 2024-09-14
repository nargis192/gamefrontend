import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Fetch user scores
export const getScores = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/scores/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
};


// Login user
export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, data);
    console.log('Login response:', res.data); // Log the response
    return res.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


// Submit score
// In api.js
export const submitScore = async (userId, score) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/scores/submit`, { userId, score });
    return res.data;
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
};


// Signup user
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};


