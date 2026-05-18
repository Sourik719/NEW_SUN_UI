
const FeedbackError = (feedback, fieldName) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};
    if (!feedback.name.trim()) {
        errors.name = "Enter your name.";
    } else if (feedback.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters.";
    }

    if (!feedback.email.trim()) {
        errors.email = "Enter your email address.";
    } else if (!emailRegex.test(feedback.email)) {
        errors.email = "Enter a valid email address."
    }

    if (feedback.rating == '') {
        errors.rating = "Choose a rating.";
    }

    if (!feedback.content.trim()) {
        errors.content = "Tell us about your experience.";
    } else if (feedback.content.trim().length < 3) {
        errors.content = "Feedback must be at least 3 characters.";
    }

    return fieldName ? errors[fieldName] : errors;

}
export default FeedbackError;
