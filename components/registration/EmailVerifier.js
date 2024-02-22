import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import { useCallback, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Loader from "../ui/Loader";
import Timer from "./Timer";

const EmailVerifier = ({ data, onCancel }) => {
    const otpRefs = useRef([...Array(6)].map(() => useRef(null)));
    const { catchAsync } = useAsync();
    const [httpRequest, isLoading] = useHttp();
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

    const handleChange = useCallback((event, index) => {
        const newOtp = event.target.value;
        setVerifyData(prevData => ({
            ...prevData,
            otp: prevData.otp.substr(0, index) + newOtp + prevData.otp.substr(index + 1)
        }));
        if (newOtp && index < 5) {
            otpRefs.current[index + 1].current.focus();
        }
        (index == 5 && { handleSubmit })
    }, []);

    const handleSubmit = async () => {
        const errors = {};
        if (!verifyData.otp.trim()) {
            errors.otp = "Please enter your otp.";
        } else if (verifyData.otp.length < 6) {
            errors.otp = "OTP should have dix digits"
        }

        if (Object.keys(errors).length === 0) {
            const responseData = await catchAsync(handleVerification)();
            if (responseData) {
                const { token } = responseData.data;
                dispatch(notificationActions.setNotification({ message: responseData.message }));
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

    return (<div className="sm:w-[500px] w-full h-full absolute z-10 flex justify-center items-center ">
        <div className="relative flex flex-col justify-center items-center shadow-md bg-white rounded-md p-4">
            <button className="text-black text-xl absolute right-5 top-5" onClick={onCancel}>
                <FaXmark />
            </button>
            <h4 className="px-3 text-2xl font-bold py-1 ">Verify your email</h4>
            <p className="my-1 mb-2 text-md break-words text-center">A 6-digit verification otp has been sent to your registered email id.<span className="text-blue-600 mr-1">{verifyData.email} </span></p>
            <div className="px-2 py-2 text-md my-1 mx-1">
                {[...Array(6)].map((_, index) => (
                    <input
                        type="text"
                        key={index}
                        className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-1"
                        maxlength="1"
                        value={verifyData.otp[index] || ''}
                        onChange={(event) => handleChange(event, index)}
                        ref={otpRefs.current[index]}
                    />
                ))}
                <Timer data={data} />
            </div>
            <button className="px-2 py-2 bg-blue-800 hover:scale-105 text-white rounded-md" onClick={handleSubmit}>
                {isLoading ? <Loader /> : "Verify"}
            </button>

        </div>
    </div >)
}

export default EmailVerifier