import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Submit() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /login after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000); // 10,000 milliseconds = 10 seconds

    // Clean up the timer if the component is unmounted before the timer expires
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Submission Successful</h1>
        <p className="text-gray-600 mb-6">
          Your submission has been received successfully. We will review it and get back to you soon.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => navigate('/')}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
