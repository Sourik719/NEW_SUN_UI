import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return {
                    ...state,
                    ...action.payload.user,
                }
            })
    }
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
