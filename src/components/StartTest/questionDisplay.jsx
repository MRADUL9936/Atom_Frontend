import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { markAnswer,navigateToQuestion,useCurrentQuestion } from '../../store/questionSlice';
import { useEffect } from 'react';

function QuestionDisplay({ question, QuestionLength,QuestionIndex,currentQuestionAnswer }) {
  const dispatch = useDispatch();
        
  const [selectedAnswer, setSelectedAnswer] = useState(currentQuestionAnswer);
  const [currentQuestion,setCurrentQuestion]=useCurrentQuestion(); ///custom hooks from questionSlice 
  console.log("curentQuestion",currentQuestion)
  useEffect(() => {
    setSelectedAnswer(currentQuestionAnswer);
  }, [currentQuestionAnswer]);     

   console.log(selectedAnswer,currentQuestionAnswer)

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

    const handleAnswer = (answer) => {
   dispatch(markAnswer({ questionId: question._id, answer }));
   };

  const handleNavigate = (index) => {
    setCurrentQuestion(index);
    dispatch(navigateToQuestion(index));
  };  //callback funtion for navigating to the next question after marking the answer


  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      handleAnswer(selectedAnswer);
    handleNavigate((QuestionIndex + 1) % QuestionLength)
      setSelectedAnswer(null);
    } else {
      alert('Please select an answer before proceeding.');
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <div className="mb-4">
        {question.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={handleAnswerChange}
                className="form-radio text-indigo-600"
                aria-label={`Option ${option}`}
              />
              <span className="ml-2">{option}</span>
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmitAnswer}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-700"
      >
        Next Question
      </button>
    </div>
  );
}



export default QuestionDisplay;
