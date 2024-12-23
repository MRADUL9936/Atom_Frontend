import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import questionSlice from './questionSlice'
import orgauthSlice from './orgauthSlice'
import testDataReducer from './testDataSlice';

const store = configureStore({
    reducer: {
         auth : authSlice,
        //TODO: add more slices here for posts
        question:questionSlice,
        orgauth: orgauthSlice,
        testData: testDataReducer
    }
});


export default store;