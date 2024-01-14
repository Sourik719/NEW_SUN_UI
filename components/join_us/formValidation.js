
const formValidation = (formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const today = new Date();
    const dob = new Date(formData.dob);
    const errors = {};

    if (formData.profileImage === null) {
        errors.profileImage = "Profile Image is required";
    }

    if (!formData.firstName.trim()) {
        errors.firstName = "First Name is required";
    } else if ((formData.firstName.length) < 2) {
        errors.firstName = "Input too short";
    }
    if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
    } else if ((formData.lastName.length) < 2) {
        errors.lastName = "Input too short";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email"
    }

    if (!formData.address.trim()) {
        errors.address = "Address is required";
    } else if ((formData.address.length) < 2) {
        errors.address = "Input too short";
    }

    if (!formData.phoneNo.trim()) {
        errors.phoneNo = "Phone number is required";
    } else if (isNaN(formData.phoneNo) || (formData.phoneNo.length !== 9)) {
        errors.phoneNo = "Invalid Phone No.";
    }

    if (!formData.dob.trim()) {
        errors.dob = "Date of birth is required";
    } else if (today < dob) {
        errors.dob = "Invalid D.O.B.";
    }

    if (!formData.gender) {
        errors.gender = "Gender is required";
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
