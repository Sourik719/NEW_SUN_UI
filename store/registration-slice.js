import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { regex } from "@/validation/registration"

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        fields: { email: '', password: '', firstname: '', lastname: '', dob: '', phone: '', image: '', address: '', sex: '', bloodGroup: '' },
        errors: { email: null, password: null, firstname: null, lastname: null, dob: null, phone: null, sex: null, bloodGroup: null }
    },
    reducers: {
        emailChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.email = value
            if (!value) {
                state.errors.email = 'You missed to fill email.'
            } else if (!regex.email.test(value)) {
                state.errors.email = "Your email is invalid."
            } else {
                state.errors.email = ''
            }
        },
        passwordChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.password = value
            if (!value) {
                state.errors.password = 'You missed to fill password.'
            } else if (!regex.password.test(value)) {
                state.errors.password = "Your password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
            } else {
                state.errors.password = ''
            }
        },
        firstnameChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.firstname = value
            if (!value) {
                state.errors.firstname = 'You missed to fill firstname.'
            } else if (value.length < 3) {
                state.errors.firstname = "Your firstname is too short."
            } else {
                state.errors.firstname = ''
            }
        },
        lastnameChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.lastname = value
            if (!value) {
                state.errors.lastname = 'You missed to fill lastname.'
            } else if (value.length < 3) {
                state.errors.lastname = "Your lastname is too short."
            } else {
                state.errors.lastname = ''
            }
        },
        dobChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.dob = value
            if (!value) {
                state.errors.dob = 'You missed to fill date of birth.'
            } else if (value >= new Date().toISOString()) {
                state.errors.dob = 'Your date of birth is invalid.';
            } else {
                state.errors.dob = ''
            }
        },
        phoneChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.phone = value
            if (!value) {
                state.errors.phone = 'You missed to fill mobile number.'
            } else if (!regex.phone.test(value)) {
                state.errors.phone = 'Your mobile number is invalid'
            } else {
                state.errors.phone = ''
            }
        },
        imageChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.image = value
        },
        addressChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.address = value
        },
        sexChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.sex = value
            if (!value) state.errors.sex = 'You missed to fill sex.'
            else state.errors.sex = ''
        },
        bloodGroupChangeHandler(state, action) {
            const value = action.payload.trim()
            state.fields.bloodGroup = value
            if (!value) state.errors.bloodGroup = 'You missed to fill sex.'
            else state.errors.bloodGroup = ''
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