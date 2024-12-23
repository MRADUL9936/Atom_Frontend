import React from 'react';
import { useDispatch } from 'react-redux';
import { navigateToQuestion } from '../../store/questionSlice';

function QuestionNavigation({ questionLength, currentQuestion, answers }) {
  const dispatch=useDispatch()
  const handleNavigate = (index) => {
    dispatch(navigateToQuestion(index));
  };  //callback funtion for navigating to the next question after marking the answer

      console.log("Realoading question navigation")
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <h3 className="text-lg font-bold mb-4">Question Navigation</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: questionLength }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(index)}
            className={`p-2 rounded-full ${
              currentQuestion === index
                ? 'bg-indigo-600 text-white'
                : answers[index]
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
            } hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            aria-label={`Go to question ${index + 1}`}
            aria-current={currentQuestion === index ? 'true' : 'false'}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}



export default QuestionNavigation;
