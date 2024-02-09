import StarRating from '@/components/feedback/starrating';
import { useAsync } from '@/hooks/use-async';
import { useHttp } from '@/hooks/use-http';
import { notificationActions } from '@/store/notification-slice';
import FeedbackError from '@/validation/feedbackerror';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
const FeedBack = ({ onclick }) => {
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const contentRef = useRef(null);
    const [selectedStars, setSelectedStars] = useState(0);
    const [httpRequest] = useHttp();
    const catchAsync = useAsync();
    const dispatch = useDispatch();

    const [validationError, setValidationError] = useState({
        name: '',
        email: '',
        content: '',
        rating: ''
    })
    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        content: '',
        rating: ''
    })

    const handleFieldChange = useCallback((fieldName, value) => {
        setFeedback((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
        setValidationError((prevData) => ({
            ...prevData,
            [fieldName]: FeedbackError({ ...feedback, [fieldName]: value }, fieldName),
        }))
    }, []);

    useEffect(() => {
        setFeedback((prevData) => ({
            ...prevData,
            rating: selectedStars,
        }))

    }, [selectedStars]);

    const handleFeedBack = async () => {
        const responseData = await httpRequest('/feedbacks', 'POST', feedback);
        console.log(responseData);
        return responseData;
    };

    const handleFormSubmit = async () => {
        console.log(feedback);
        const errors = FeedbackError(feedback);
        setValidationError(errors);
        if (Object.keys(errors).length === 0) {
            const responseData = await catchAsync(handleFeedBack)();
            if (responseData) {
                dispatch(notificationActions.setNotification({
                    type: 'success',
                    message: responseData.message
                }));
            }
        }
        else {
            const errorsMessage = JSON.stringify(errors.email || errors.name || errors.rating || errors.content, null, 2);
            dispatch(notificationActions.setNotification({
                type: 'error',
                message: errorsMessage
            }));
        }
    };

    return (
        <div className="w-[400px] flex flex-col justify-center items-center px-5 shadow-md rounded-lg py-5 bg-gray-600">
            <button className='absolute top-0 right-0  rounded-lg hover:bg-yellow-200 p-4 text-black text-xl' onClick={onclick}>
                <FaXmark />
            </button>
            <p className='text-2xl text-left py-2'>Share Your Feedback</p>
            <StarRating totalStars={5} onStarChange={(star) => setSelectedStars(star)} validationError={validationError.rating} />
            <input
                ref={emailRef}
                placeholder="Email"
                onChange={(event) => handleFieldChange('email', event.target.value)}
                className={`w-full px-3 py-2 my-1 border rounded-md ${validationError.email ? 'border-2 border-red-200' : 'border-black'}`}
            />
            <input
                ref={nameRef}
                placeholder="Name"
                onChange={(event) => handleFieldChange('name', event.target.value)}
                className={`w-full px-3 py-2 my-1 border rounded-md ${validationError.name ? 'border-2 border-red-200' : 'border-black'}`}
            />
            <textarea
                ref={contentRef}
                placeholder="Describe Your Experience"
                onChange={(event) => handleFieldChange('content', event.target.value)}
                className={`w-full px-3 py-2 my-1 border rounded-md ${validationError.content ? 'border-2 border-red-200' : 'border-black'}`}
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleFormSubmit}>Submit Feedback</button>
        </div>
    );
};

export default FeedBack;
