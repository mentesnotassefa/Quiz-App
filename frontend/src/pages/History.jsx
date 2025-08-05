import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const getHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch quiz history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const headers = getHeaders();
        if (!headers.Authorization) {
          setError("Please log in to view your quiz history.");
          setLoading(false);
          return;
        }
        const response = await axios.get('http://localhost:5000/api/quizzes/history', { headers });
        setHistory(response.data);
      } catch (err) {
        console.error("Failed to fetch quiz history:", err.response?.status, err.response?.data?.message || err.message);
        setError("Failed to fetch quiz history. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-20">
      <div className="mt-8 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Quiz History</h1>
        {loading ? (
          <p className="text-center">Loading history...</p>
        ) : (
          <ul className="space-y-4">
            {history.length > 0 ? (
              history.map((h) => (
                <li key={h._id} className="p-4 rounded-lg bg-white shadow-md flex justify-between items-center">
                  <div>
                    <p className="font-bold text-xl">{h.category}</p>
                    <p className="text-sm text-gray-500">{new Date(h.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-lg font-semibold">{`Score: ${h.score} / ${h.questions.length}`}</p>
                </li>
              ))
            ) : (
              <p className="text-center">{error || "No quiz history found. Take a quiz to get started!"}</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default History;
