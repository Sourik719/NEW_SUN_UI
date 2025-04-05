import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import { regex } from "@/validation/registration";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const ForgetPassword = ({ onCancel }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState('')
    const [password, setPasword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [id, setId] = useState(null);
    const [passwordShowed, setPasswordShowed] = useState(false)
    const [confirmPasswordShowed, setConfirmPasswordShowed] = useState(false)
    const [otpSent, setOtpsent] = useState(false);
    const [otpVerified, setotpVerified] = useState(false);
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();
    const arrayOfSix = [...Array(6)]
    const otpRefs = useRef(arrayOfSix.map(() => useRef(null)))
    const dispatch = useDispatch()
    const router = useRouter()

    const otpChangeHandler = (event, index) => {
        const value = event.target.value;

        if (value && isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5 && otpRefs.current[index + 1] && otpRefs.current[index + 1].current) {
            otpRefs.current[index + 1].current.focus();
        }
    };

    const otpKeyDownHandler = (event, index) => {
        if (event.key === 'Backspace') {
            if (index > 0 && !event.target.value) {
                otpRefs.current[index - 1].current.focus();
            }
            if (index >= 0) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };

    const generateOtp = catchAsync(async () => {
        if (!email.trim()) throw new Error("Please enter your email")

        const { success } = await httpRequest(`/forgot-password`, "POST", { email });
        setOtpsent(true)
    }
    );
    const verifyOtp = catchAsync(async () => {
        if (otp.length < 6) throw new Error('OTP should be 6-digit long.')
        const otpString = otp.join('');
        const { data } = await httpRequest(`/forgot-password/verify-otp`, "POST", { email: email, otp: otpString });
        console.log(data)
        setId(data._id)
        setotpVerified(true)
    }
    );
    const resetPassword = catchAsync(async () => {
        if (!password.trim()) throw new Error("Password can not be blank.")
        if (!regex.password.test(password)) throw new Error("Password must be at least 8 characters long and include a number,a lowercase letter,an uppercase letter and a special character.")
        if (password.trim() != confirmPassword.trim()) throw new Error("Both fields need to have the same value")
        const { success } = await httpRequest(`/reset-password`, "POST", { email: email, _id: id, password: password });
        dispatch(notificationActions.setNotification({ message: "Your password is updated. You can now login." }))
        router.reload();
    }
    )

    return (
        <div className="w-full sm:w-[550px] absolute z-10 top-20 sm:top-1/4 p-2 my-5">
            <div className="relative bg-white text-center flex flex-col justify-center items-center shadow rounded-md p-5">
                <button className="absolute right-4 top-4" onClick={onCancel}>
                    <FaXmark />
                </button>
                <h4 className="text-3xl p-3 my-2">Reset Your Password</h4>
                <div className="w-full flex flex-row  sm:items-center justify-center">
                    <input
                        type="email"
                        id="emailInput"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={otpVerified}
                        className="p-2 border-b focus:outline-none focus:border-blue-300  border-gray-300  mb-4 w-2/3 mx-1 flex items-center sm:mt-4"
                    />
                    <button
                        onClick={generateOtp}
                        className={`bg-blue-500 text-white h-10 p-2  rounded text-md flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        disabled={isLoading}
                        aria-label={isLoading ? "Loading, please wait." : (otpSent ? "Resend OTP" : "Send OTP")}
                    >
                        {isLoading ? "Loading.." : (otpSent ? "Resend OTP" : "Send OTP")}
                    </button>
                </div>
                {otpSent && <div className="w-full"> <p>OTP has been sent to {email}</p>
                    <div className="w-full flex flex-row items-center justify-center">

                        <section className="mt-3 w-2/3 flex flex-row items-center justify-center">
                            {arrayOfSix.map((_, index) => (
                                <input
                                    ref={otpRefs.current[index]}
                                    key={index}
                                    value={otp[index] || ''}
                                    onChange={(event) => otpChangeHandler(event, index)}
                                    onKeyDown={(event) => otpKeyDownHandler(event, index)}
                                    maxLength="1"
                                    disabled={otpVerified}
                                    autoComplete="off"
                                    className="w-8 h-8 sm:w-9 sm:h-9 text-2xl text-center border-b border-gray-300  focus:outline-none focus:border-blue-500 mx-0.5 sm:mx-1 "
                                />
                            ))}
                        </section>
                        <button
                            onClick={verifyOtp}
                            className={`h-10 text-white mx-2 p-2 rounded text-md flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : otpVerified ? "bg-green-500" : "bg-blue-500"}`}
                            disabled={isLoading || otpVerified}
                            aria-label={isLoading ? "Loading..." : (otpVerified ? "Verified" : "Verify OTP")}
                        >
                            {isLoading ? "Loading..." : (otpVerified ? "Verified" : "Verify OTP")}
                        </button>
                    </div>

                </div>
                }
                {otpVerified &&
                    <div className="flex flex-col w-full my-3 justify-center items-center">
                        <div className="w-full my-1">
                            <div className="flex flex-row items-center mb-2">
                                <span className="font-bold w-1/4">New Password:</span>
                                <input
                                    type={!passwordShowed ? 'password' : 'text'}
                                    title="Password must be at least 8 characters long and include a number,a lowercase letter,an uppercase letter and a special character."
                                    value={password}
                                    placeholder="New Password"
                                    disabled={isLoading}
                                    onChange={(e) => setPasword(e.target.value)}
                                    className={`w-2/3 px-3 py-2 border-b focus:outline-none focus:border-blue-500 mx-1`}
                                    required
                                />
                                <button className="text-slate-300 absolute right-8 z-10" onClick={() => setPasswordShowed(!passwordShowed)}>
                                    {passwordShowed ? <FaEye /> : <FaEyeSlash />}
                                </button>

                            </div>
                            <div className="flex flex-row  items-center my-2">
                                <span className="font-bold w-1/4"> Confirm Password:</span>
                                <input
                                    type='text'
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                    disabled={isLoading}
                                    className={`w-2/3 px-3 py-2 border-b focus:outline-none focus:border-blue-500 mx-1`}
                                    required
                                />
                                <button className="text-slate-300 absolute right-8 z-10" onClick={() => setConfirmPasswordShowed(!confirmPasswordShowed)}>
                                    {passwordShowed ? <FaEye /> : <FaEyeSlash />}
                                </button>

                            </div>
                        </div>
                        <button className="w-[200px] bg-green-500 p-2 items-center hover:bg-green-700 text-white mt-1 rounded-md shadow-md" onClick={resetPassword}>
                            Reset Password
                        </button>
                    </div>}

            </div>
        </div>
    );
};

export default ForgetPassword;