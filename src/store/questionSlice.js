import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  questions: [],
  questionsLength:0,
  currentQuestion: 0,
  answers: {},
  status: "idle", // To track loading status for fetching questions
  submitStatus: "idle", // To track loading status for submitting answers
  error: null, // To store any error that occurs
};

// Async thunk to fetch questions from the backend
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (testId) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${BACKEND_URL}/test/${testId}`,
      {
        withCredentials: true,
      }
    ); // fetching the test from backend
    return response.data.Questions; // Assuming the data is under the "Questions" key
  }
);

// Async thunk to submit answers to the backend
export const submitAnswers = createAsyncThunk(
  "questions/submitAnswers",
  async ({ email, testId, answers }) => {
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const formattedAnswers = Object.values(answers).map(({ questionId, answer }) => ({ questionId, answer }));
      console.log(formattedAnswers); // Log the formatted answers

      const response = await axios.post(
        `${BACKEND_URL}/test/submit?email=${email}&testId=${testId}`,
        { answers: formattedAnswers }, // Sending as part of the request body
        {
          withCredentials: true,
        }
      );
      console.log("request sent");
      return response.data;
    } catch (error) {
      console.error("Error submitting answers:", error);
      throw error;
    }
  }
);


export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    markAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      const index = state.currentQuestion;
      // updating the answer in the state
      state.answers[index] = {
        questionId,
        answer,
      };
      
      console.log(`Answer saved at index ${index}:`, state.answers[index]);
    
    },
    navigateToQuestion: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.questions.length) {
        state.currentQuestion = index;
      }
    },
    resetTest: (state) => {
      state.questions = [];
      state.currentQuestion = 0;
      state.answers = {};
      state.status = "idle";
      state.submitStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Questions Thunk
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
        state.questionsLength=state.questions.length
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Submit Answers Thunk
      .addCase(submitAnswers.pending, (state) => {
        state.submitStatus = "loading";
      })
      .addCase(submitAnswers.fulfilled, (state) => {
        state.submitStatus = "succeeded";
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.submitStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { markAnswer, navigateToQuestion, resetTest } =
  questionSlice.actions;

export default questionSlice.reducer;


//creating a custome hooks for getting the current question and changing the current question

export function useCurrentQuestion(){
  const currentQuestion = useSelector(state => state.question.currentQuestion);
  const questionsLength=useSelector(state=>state.question.questionsLength)
              const dispatch=useDispatch()
   function changeCurrentQuestion(index){
           dispatch(navigateToQuestion(index))
   }
      
   return [currentQuestion,changeCurrentQuestion];

}