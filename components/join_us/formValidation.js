
const formValidation = (formData) => {
    const errors = {};
    if (formData.profileImage === null) {
        errors.profileImage = "Profile Image is required";
    }
    if (!formData.firstName.trim()) {
        errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    }

    if (!formData.address.trim()) {
        errors.address = "Address is required";
    }

    if (!formData.phoneNo.trim()) {
        errors.phone = "Phone number is required";
    }

    if (!formData.dob.trim()) {
        errors.dob = "Date of birth is required";
    }

    if (!formData.gender) {
        errors.gender = "Gender is required";
    }

    if (!formData.bloodGroup) {
        errors.bloodGroup = "Blood group is required";
    }

    if (!formData.password || !formData.password.trim()) {
        errors.password = "Password is required";
    }

    if (formData.confirmpassword !== formData.password) {
        errors.confirmPassword = "Passwords don't match";
    }

    return errors;
}

export default formValidation;
