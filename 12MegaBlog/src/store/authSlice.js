import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log("Login action called with payload:", action.payload);
            state.status = true;
            state.userData = action.payload;
            console.log("New auth state:", state);
        },
        logout: (state) => {
            console.log("Logout action called");
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;