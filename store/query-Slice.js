import { regex } from "@/validation/registration";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const querySlice = createSlice({
    name: 'query',
    initialState: {
        fields: { email: '', firstname: '', lastname: '', eventdate: '', phone: '', cause: '', budget: '' },
        errors: { email: null, firstname: null, lastname: null, eventdate: null, phone: null, cause: null, budget: null }
    },
    reducers: {
        emailChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.email = value;
            if (!value) {
                state.errors.email = 'Enter your email address.';
            } else if (!regex.email.test(value)) {
                state.errors.email = "Enter a valid email address.";
            } else {
                state.errors.email = '';
            }
        },
        firstnameChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.firstname = value;
            if (!value) {
                state.errors.firstname = 'Enter your first name.';
            } else if (value.length < 3) {
                state.errors.firstname = "First name must be at least 3 characters.";
            } else {
                state.errors.firstname = '';
            }
        },
        lastnameChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.lastname = value;
            if (!value) {
                state.errors.lastname = 'Enter your last name.';
            } else if (value.length < 3) {
                state.errors.lastname = "Last name must be at least 3 characters.";
            } else {
                state.errors.lastname = '';
            }
        },
        eventdateChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.eventdate = value;
            const today = new Date();
            const selectedDate = new Date(value);
            if (!value) {
                state.errors.eventdate = 'Choose the event date.';
            } else if (selectedDate < today) {
                state.errors.eventdate = 'Choose today or a future date.';
            } else {
                state.errors.eventdate = '';
            }
        },
        phoneChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.phone = value;
            if (!value) {
                state.errors.phone = 'Enter your mobile number.';
            } else if (!regex.phone.test(value)) {
                state.errors.phone = 'Enter a valid 10-digit mobile number.';
            } else {
                state.errors.phone = '';
            }
        },
        causeChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.cause = value;
            if (!value) state.errors.cause = 'Choose what you would like to sponsor.';
            else state.errors.cause = '';
        },
        budgetChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.budget = value;
            if (!value) state.errors.budget = 'Choose an estimated budget.';
            else state.errors.budget = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.query
            }
        });
    }
});

export const queryReducer = querySlice.reducer;
export const queryActions = querySlice.actions;
