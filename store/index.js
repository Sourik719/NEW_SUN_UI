import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { userReducer } from "./user-slice"

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export const wrapper = createWrapper(() => store)