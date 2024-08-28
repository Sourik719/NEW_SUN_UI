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
                state.errors.email = 'You missed to fill email.';
            } else if (!regex.email.test(value)) {
                state.errors.email = "Your email is invalid.";
            } else {
                state.errors.email = '';
            }
        },
        firstnameChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.firstname = value;
            if (!value) {
                state.errors.firstname = 'You missed to fill firstname.';
            } else if (value.length < 3) {
                state.errors.firstname = "Your firstname is too short.";
            } else {
                state.errors.firstname = '';
            }
        },
        lastnameChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.lastname = value;
            if (!value) {
                state.errors.lastname = 'You missed to fill lastname.';
            } else if (value.length < 3) {
                state.errors.lastname = "Your lastname is too short.";
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
                state.errors.eventdate = 'You missed to fill date of event.';
            } else if (selectedDate < today) {
                state.errors.eventdate = 'Your selected date of event is invalid.';
            } else {
                state.errors.eventdate = '';
            }
        },
        phoneChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.phone = value;
            if (!value) {
                state.errors.phone = 'You missed to fill mobile number.';
            } else if (!regex.phone.test(value)) {
                state.errors.phone = 'Your mobile number is invalid.';
            } else {
                state.errors.phone = '';
            }
        },
        causeChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.cause = value;
            if (!value) state.errors.cause = 'Specify your cause';
            else state.errors.cause = '';
        },
        budgetChangeHandler(state, action) {
            const value = action.payload.trim();
            state.fields.budget = value;
            if (!value) state.errors.budget = 'Specify your budget';
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
