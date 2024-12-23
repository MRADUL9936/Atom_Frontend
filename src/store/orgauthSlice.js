import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    orgData: ""
}

const orgauthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.orgData = action.payload.orgData;
        },
        logout: (state) => {
            state.status = false;
            state.orgData = null;
        }
     }
})

export const {login, logout} = orgauthSlice.actions;

export default orgauthSlice.reducer;