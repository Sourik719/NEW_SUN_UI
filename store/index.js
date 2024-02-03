import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { userReducer } from "./user-slice"
import { notificationReducer } from "./notification-slice"

const store = configureStore({
    reducer: {
        user: userReducer,
        notification: notificationReducer
    }
})

export const wrapper = createWrapper(() => store)