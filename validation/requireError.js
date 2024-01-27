
const RequireError = ({ label, fieldValue, type }) => {
    let errorMessage = '';
    const today = new Date();
    const dob = new Date(fieldValue);
    let length = 0;
    if (fieldValue) {
        length = fieldValue.length;
    }

    if (length === 0) {
        errorMessage = `${label} is required.`;
    }
    else if (isNaN(fieldValue) && label === "Phone No.") {
        errorMessage = "Invalid Phone No.";
    }
    else if (length < 10 && label === "Phone No.") {
        errorMessage = "Ten digits required.";

    } else if (length < 2 && type === 'Text') {
        errorMessage = "Too short input.";
    } else if (dob > today && type === 'Date') {
        errorMessage = "Invalid D.O.B";
    }
    if (errorMessage !== '') {
        return errorMessage;
    }
    else return null;
}

export default RequireError;
