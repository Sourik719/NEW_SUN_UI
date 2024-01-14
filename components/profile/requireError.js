const RequireError = ({ label, fieldValue, type }) => {
    let errorMessage = '';

    const length = fieldValue.length;

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
    }
    if (errorMessage !== '') {
        return errorMessage;
    }
    else return null;
}

export default RequireError;
