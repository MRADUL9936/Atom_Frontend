import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams,useNavigate,useLocation } from 'react-router-dom';
import { fetchQuestions, submitAnswers, resetTest } from '../../store/questionSlice';
import QuestionDisplay from './questionDisplay';
import QuestionNavigation from './questionNavigation';
import Timer from './timer';

export default function StartTest() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
   const location = useLocation();

   const {testDuration}=location.state || {};
  const { testId } = useParams();
  console.log("inside starttest",testDuration)
  const questions = useSelector(state => state.question.questions);
  const currentQuestion = useSelector(state => state.question.currentQuestion);
  const answers = useSelector(state => state.question.answers);
  const status = useSelector(state => state.question.status);
  const submitStatus = useSelector(state => state.question.submitStatus);
  const email = useSelector((state) => state.auth.userData); //get email from authSlice
 
  let currentQuestionAnswer =  null; ///check the answer of the current question
      if(answers[currentQuestion]!==undefined){
        currentQuestionAnswer = answers[currentQuestion].answer
      }

  useEffect(() => {
    dispatch(fetchQuestions(testId));

    return () => {
      dispatch(resetTest());
    };
  }, [dispatch, testId]);

       console.log("reloading parent ")

  const handleSubmit = () => {
    dispatch(submitAnswers({email, testId,answers}));
    navigate('/candidate/submit')
  };

  return (
    <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:w-2/3">
        {status === 'loading' && <p>Loading questions...</p>}
        {status === 'failed' && <p>Error loading questions.</p>}
        {status === 'succeeded' && questions.length > 0 && (
          <>
            <QuestionDisplay
              question={questions[currentQuestion]}
              QuestionIndex={currentQuestion}
              QuestionLength={questions.length}
              currentQuestionAnswer={currentQuestionAnswer}
            />
            <Timer onTimeUp={handleSubmit} testDuration={testDuration}/>
          </>
        )}
      </div>
      <div className="md:w-1/3">
        <QuestionNavigation
        questionLength={questions.length}
        currentQuestion={currentQuestion}
        answers={answers}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
          disabled={submitStatus === 'loading'}
        >
          {submitStatus === 'loading' ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
}
