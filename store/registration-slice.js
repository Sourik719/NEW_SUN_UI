import { regex } from "@/validation/registration"
import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        fields: { email: '', password: '', firstname: '', lastname: '', dob: '', phone: '', address: '', sex: '', bloodGroup: '' },
        errors: { email: null, password: null, firstname: null, lastname: null, dob: null, phone: null, sex: null }
    },
    reducers: {
        emailChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.email = value
            if (!value) {
                state.errors.email = 'Enter your email address.'
            } else if (!regex.email.test(value)) {
                state.errors.email = "Enter a valid email address."
            } else {
                state.errors.email = ''
            }
        },
        passwordChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.password = value
            if (!value) {
                state.errors.password = 'Create a password.'
            } else if (!regex.password.test(value)) {
                state.errors.password = "Use at least 8 characters with uppercase, lowercase, number, and special character."
            } else {
                state.errors.password = ''
            }
        },
        firstnameChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.firstname = value
            if (!value) {
                state.errors.firstname = 'Enter your first name.'
            } else if (value.length < 3) {
                state.errors.firstname = "First name must be at least 3 characters."
            } else {
                state.errors.firstname = ''
            }
        },
        lastnameChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.lastname = value
            if (!value) {
                state.errors.lastname = 'Enter your last name.'
            } else if (value.length < 3) {
                state.errors.lastname = "Last name must be at least 3 characters."
            } else {
                state.errors.lastname = ''
            }
        },
        dobChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.dob = value
            if (!value) {
                state.errors.dob = 'Enter your date of birth.'
            } else if (value >= new Date().toISOString()) {
                state.errors.dob = 'Enter a valid date of birth.';
            } else {
                state.errors.dob = ''
            }
        },
        phoneChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.phone = value
            if (!value) {
                state.errors.phone = 'Enter your mobile number.'
            } else if (!regex.phone.test(value)) {
                state.errors.phone = 'Enter a valid 10-digit mobile number.'
            } else {
                state.errors.phone = ''
            }
        },
        addressChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.address = value
        },
        sexChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.sex = value
            if (!value) state.errors.sex = 'Select your gender.'
            else state.errors.sex = ''
        },
        bloodGroupChangeHandler(state, action) {
            const value = action.payload.trim()
            if (value) state.fields.bloodGroup = value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.registration
            }
        })
    }
})

export const registrationReducer = registrationSlice.reducer
export const registrationActions = registrationSlice.actions
