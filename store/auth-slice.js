import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        signup: {

        },
        signin: {

        }
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.auth
            }
        })
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions