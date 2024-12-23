import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WebCam from 'react-webcam'

export default function Permissions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  // Extract testId from location state
  const { testId } = location.state || {};
  const {testDuration}=location.state || {};
  // Function to request permissions and start the camera
  const requestPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setHasPermission(true);
      setError('');
    } catch (err) {
      setError('Permissions not granted. Please allow access to camera and microphone.');
    }
  };

  // Function to start the test
  const startTest = () => {
    if (!hasPermission) {
      setError('You need to grant permission to use camera and microphone.');
      return;
    }

    // Navigate to the start test page if permissions are granted
    navigate(`/candidate/test/${testId}`,{ state: { testDuration } }); // Use the testId in the route to start the test
  };

  // Cleanup function to stop the stream and release the camera
  useEffect(() => {
    return () => {
      if (stream) {
         stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Permissions Page</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {!hasPermission ? (
          <div className="text-center">
            <p className="mb-4 text-gray-700">
              To start the test, please grant access to your camera and microphone.
            </p>
            <button
              onClick={requestPermissions}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Grant Permissions
            </button>
          </div>
        ) : (
          <div className="text-center">
             <WebCam/> {/* render the webcam */}
            <button
              onClick={startTest}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
              Start Test
            </button>
          </div>
        )}
        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
