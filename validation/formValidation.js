
const formValidation = (formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const today = new Date();
    const dob = new Date(formData.dob);
    const errors = {};


    if (!formData.firstname.trim()) {
        errors.firstname = "First Name is required";
    } else if ((formData.firstname.length) < 2) {
        errors.firstname = "Input too short";
    }
    if (!formData.lastname.trim()) {
        errors.lastname = "Last name is required";
    } else if ((formData.lastname.length) < 2) {
        errors.lastname = "Input too short";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email"
    }
    if (formData.address) {
        if ((formData.address.length) < 2) {
            errors.address = "Input too short";
        }
    }

    if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (isNaN(formData.phone) || (formData.phone.length !== 10)) {
        errors.phone = "Invalid Phone No.";
    }

    if (!formData.dob.trim()) {
        errors.dob = "Date of birth is required";
    } else if (today < dob) {
        errors.dob = "Invalid D.O.B.";
    }

    if (!formData.sex) {
        errors.sex = "Gender is required";
    }

    if (!formData.bloodGroup) {
        errors.bloodGroup = "Blood group is required";
    }
    if (!formData.password || !formData.password.trim()) {
        errors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
        errors.password = "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long"
    }

    return errors;
}

export default formValidation;
