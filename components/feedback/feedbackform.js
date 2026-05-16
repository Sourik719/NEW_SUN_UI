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
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();
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
        if (responseData) {
            dispatch(notificationActions.setNotification({
                message: responseData.message
            }));
            onclick();
        }
        return responseData;
    };

    const handleFormSubmit = async () => {
        const errors = FeedbackError(feedback);
        setValidationError(errors);
        if (Object.keys(errors).length === 0) {
            const responseData = await catchAsync(handleFeedBack)();
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
        <div className="w-[calc(100vw-2rem)] max-w-[460px] rounded-md border border-stone-200 bg-white p-5 shadow-2xl">
            <button className='absolute right-3 top-3 rounded-md p-2 text-slate-600 transition hover:bg-stone-100 hover:text-slate-950' onClick={onclick} aria-label="Close feedback form">
                <FaXmark />
            </button>
            <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Feedback</p>
            <h2 className='mt-2 text-2xl font-extrabold text-slate-950'>Share your experience</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Your feedback helps the team improve future events and community work.</p>
            <div className="mt-4">
                <label className="mb-1 block text-sm font-bold text-slate-700">Rating</label>
                <StarRating totalStars={5} onStarChange={(star) => setSelectedStars(star)} validationError={validationError.rating} givenStars={0} editAble={true} />
                {validationError.rating && <p className="text-sm font-semibold text-red-600">{validationError.rating}</p>}
            </div>
            <label className="mt-3 block text-sm font-bold text-slate-700">Email</label>
            <input
                ref={emailRef}
                placeholder="Email"
                onChange={(event) => handleFieldChange('email', event.target.value)}
                className={`my-1 w-full rounded-md border px-3 py-3 outline-none transition ${validationError.email ? 'border-red-500 ring-2 ring-red-100' : 'border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'}`}
            />
            {validationError.email && <p className="text-sm font-semibold text-red-600">{validationError.email}</p>}
            <label className="mt-3 block text-sm font-bold text-slate-700">Name</label>
            <input
                ref={nameRef}
                placeholder="Name"
                onChange={(event) => handleFieldChange('name', event.target.value)}
                className={`my-1 w-full rounded-md border px-3 py-3 outline-none transition ${validationError.name ? 'border-red-500 ring-2 ring-red-100' : 'border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'}`}
            />
            {validationError.name && <p className="text-sm font-semibold text-red-600">{validationError.name}</p>}
            <label className="mt-3 block text-sm font-bold text-slate-700">Experience</label>
            <textarea
                ref={contentRef}
                placeholder="Describe Your Experience"
                onChange={(event) => handleFieldChange('content', event.target.value)}
                className={`my-1 min-h-[110px] w-full resize-none rounded-md border px-3 py-3 outline-none transition ${validationError.content ? 'border-red-500 ring-2 ring-red-100' : 'border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'}`}
            />
            {validationError.content && <p className="text-sm font-semibold text-red-600">{validationError.content}</p>}
            <button className="mt-4 w-full rounded-md bg-orange-600 px-4 py-3 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70" onClick={handleFormSubmit} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </button>
        </div>
    );
};

export default FeedBack;
