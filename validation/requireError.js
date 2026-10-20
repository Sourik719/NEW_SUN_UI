
const RequireError = ({ label, fieldValue, type }) => {
    let errorMessage = '';
    const today = new Date();
    const dob = new Date(fieldValue);
    let length = 0;
    if (fieldValue) {
        length = fieldValue.length;

    }

    if (length === 0 && type === 'Text') {
        errorMessage = `Enter ${label.toLowerCase()}.`;
    }
    else if (isNaN(fieldValue) && label === "Phone Number") {
        errorMessage = "Enter a valid phone number.";
    }
    else if (length < 10 && label === "Phone Number") {
        errorMessage = "Phone number must be 10 digits.";

    } else if (length < 2 && type === 'Text') {
        errorMessage = "Enter at least 2 characters.";
    } else if (dob > today && type === 'date') {
        errorMessage = "Enter a valid date of birth.";
    }
    if (errorMessage !== '') {
        return errorMessage;
    }
    else return null;
}

export default RequireError;
