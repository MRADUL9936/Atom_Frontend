import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  newquestions:[],
  users: [],
  newusers:[]
};

const testDataSlice = createSlice({
  name: "testData",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    addQuestion(state, action) {
      state.newquestions.push(action.payload);
    },
    updateQuestion(state, action) {
      const { questionId, updatedData } = action.payload;
      const index = state.questions.findIndex((q) => q._id === questionId);
      if (index !== -1) {
        state.questions[index] = { ...state.questions[index], ...updatedData };
      }
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      state.newusers.push(action.payload);
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  updateQuestion,
  setUsers,
  addUser,
} = testDataSlice.actions;

export default testDataSlice.reducer;
