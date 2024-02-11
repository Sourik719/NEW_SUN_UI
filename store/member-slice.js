import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        member: null
    },
    reducers: {
        setMember(state, action) {
            state.member = action.payload
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