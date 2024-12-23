import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Test() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL       
  useEffect(() => {
    // Fetch data from backend
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/test`,{
          withCredentials: true,
        });
        setTests(response.data); // Store fetched tests in state
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };

    fetchTests();
  }, []);


  ///function after use click on the start test
  function startTest(testId,testDuration) {
    navigate('/candidate/tests/permissions', { state: { testId,testDuration } });
    // Navigate to the test page or start the test logic here
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Tests</h1>
      {tests.map((test) => (
        <div
          key={test._id}
          className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold">{test.title}</h2>
          <p className="text-gray-600 mb-4">{test.description}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => startTest(test._id,test.duration)}
          >
            Start Test
          </button>
        </div>
      ))}
    </div>
  );


}
