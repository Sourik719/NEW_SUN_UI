import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { authReducer } from "./auth-slice"
import { memberReducer } from "./member-slice"
import { notificationReducer } from "./notification-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        member: memberReducer,
        notification: notificationReducer
    }
})

export const wrapper = createWrapper(() => store)