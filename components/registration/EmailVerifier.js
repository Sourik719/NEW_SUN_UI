import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import { FaXmark } from "react-icons/fa6";

import Timer from "./Timer";

const EmailVerifier = ({ data, onCancel }) => {
    const otpRef = useRef();
    const { catchAsync } = useAsync();
    const [httpRequest] = useHttp();
    const dispatch = useDispatch();

    const [verifyData, setVerifyData] = useState({
        email: data.email,
        otp: ''
    });

    const handleVerification = async () => {
        const responseData = await httpRequest('/signup-verify', 'POST', verifyData);
        console.log(responseData);
        return responseData;
    };
    const handleChange = useCallback((event) => {
        setVerifyData((prevData) => ({
            ...prevData,
            otp: event.target.value,
        }));
    }, []);
    const handleSubmit = async () => {
        const errors = {};
        if (!verifyData.otp.trim()) {
            errors.otp = "Please enter your otp.";
        }
        if (Object.keys(errors).length === 0) {
            const responseData = await catchAsync(handleVerification)();
            if (responseData) {
                const { token } = responseData.data;
                dispatch(notificationActions.setNotification({
                    type: 'success',
                    message: responseData.message
                }));
                localStorage.removeItem('jwt-token');
                localStorage.setItem('jwt-token', token);

            }
        }
        else {
            const errorsMessage = JSON.stringify(errors.otp, null, 2);
            dispatch(notificationActions.setNotification({
                type: 'error',
                message: errorsMessage
            }));
        }
    };
    return (<div className="w-full h-full absolute z-10 flex justify-center items-start">
        <div className="flex flex-col justify-center items-center shadow-md bg-white border-2">
            <div className="w-full bg-blue-600 px-2 py-2 text-md text-white flex flex-row justify-between">
                <h4 className="px-3">Verify your email</h4>
                <button className='hover:bg-red-500 text-black text-xl' onClick={onCancel}>
                    <FaXmark />
                </button>
            </div>
            <div className="px-2 py-2 text-md my-1">
                <p className="my-1 mb-2">A 6-digit verification otp has been sent to your registered email id.</p>
                <input
                    ref={otpRef}
                    placeholder="Enter 6-Digit Verification Code"
                    className="w-full border-2 px-2 py-1 mt-1"
                    onChange={handleChange}
                />
                <Timer data={data} />
            </div>
            <button className="px-2 py-2 bg-blue-800 hover:scale-105 my-1 text-white rounded-md" onClick={handleSubmit}>
                Verify
            </button>
        </div>
    </div>)
}

export default EmailVerifier