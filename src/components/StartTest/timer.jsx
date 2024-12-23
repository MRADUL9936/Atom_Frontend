import React, { useEffect, useState } from 'react';

export default function Timer({ onTimeUp,testDuration }) {
  
  const [timeLeft, setTimeLeft] = useState(() => Number(testDuration) * 60); // Set test duration in seconds (1 hour)
 console.log("reloading timer")
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          onTimeUp(); // Call onTimeUp when time runs out
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Time Remaining</h3>
      <p className="text-3xl font-bold text-red-600">{formatTime(timeLeft)}</p>
    </div>
  );
}


