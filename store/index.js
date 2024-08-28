import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { memberReducer } from "./member-slice"
import { notificationReducer } from "./notification-slice"
import { queryReducer } from "./query-Slice"
import { registrationReducer } from "./registration-slice"

const store = configureStore({
    reducer: {
        member: memberReducer,
        notification: notificationReducer,
        registration: registrationReducer,
        query: queryReducer
    }
})

export const wrapper = createWrapper(() => store)