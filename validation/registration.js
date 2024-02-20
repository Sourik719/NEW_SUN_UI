export const regex = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
    phone: /^\d{10}$/
}

export const hasUntouched = (obj) => {
    for (const key in obj) {
        if (obj[key] === null) return true
    }
    return false
}