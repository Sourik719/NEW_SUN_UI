
const FeedbackError = (feedback, fieldName) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};
    if (!feedback.name.trim()) {
        errors.name = "Name is required";
    } else if (feedback.name.trim().length < 2) {
        errors.name = "Input too short";
    }

    if (!feedback.email.trim()) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(feedback.email)) {
        errors.email = "Invalid email"
    }

    if (feedback.rating == '') {
        errors.rating = "Rating is required";
    }

    if (!feedback.content.trim()) {
        errors.content = "Feedback is required";
    } else if (feedback.content.trim().length < 3) {
        errors.content = "Input too short";
    }

    return fieldName ? errors[fieldName] : errors;

}
export default FeedbackError;
