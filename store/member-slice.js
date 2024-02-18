import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        token: null,
        member: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        clearToken(state) {
            state.token = null
        },
        setMember(state, action) {
            state.member = action.payload
        },
        clearMember(state) {
            state.member = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.member
            }
        })
    }
})

export const memberReducer = memberSlice.reducer
export const memberActions = memberSlice.actions