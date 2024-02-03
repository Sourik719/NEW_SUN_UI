import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        type: null, // 'success' or 'error'
        message: null
    },
    reducers: {
        setNotification(state, action) {
            const { type, message } = action.payload
            state.type = type
            state.message = message
        },
        clearNotification(state) {
            state.type = null
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.notification
            }
        })
    }
})

export const notificationReducer = notificationSlice.reducer
export const notificationActions = notificationSlice.actions
