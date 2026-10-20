import { useAsync } from "@/hooks/use-async"
import { useHttp } from "@/hooks/use-http"
import { memberActions } from "@/store/member-slice"
import { notificationActions } from "@/store/notification-slice"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { FaXmark } from "react-icons/fa6"
import { useDispatch } from "react-redux"

import Loader from "../ui/Loader"
import Timer from "./Timer"

const arrayOfSix = [...Array(6)]

const EmailVerifier = ({ fields, onCancel }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [otp, setOtp] = useState('')
    const otpRefs = useRef(arrayOfSix.map(() => useRef(null)))
    const { catchAsync } = useAsync()
    const [httpRequest, isLoading] = useHttp()

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

    const emailVerificationHandler = catchAsync(async () => {
        if (otp.length < 6) throw new Error('Enter the 6-digit verification code.')
        const otpString = otp.join('');
        const { data, message } = await httpRequest('/signup-verify', 'POST', { email: fields.email, otp: otpString })
        const { token } = data
        localStorage.setItem('jwt-token', token)
        dispatch(memberActions.setToken(token))
        router.replace('/')
        dispatch(notificationActions.setNotification({ message }))
    })

    return (<div className="absolute w-full sm:w-[550px] z-10 top-50 sm:top-1/4 p-2 my-5">
        <div className="relative bg-white text-center flex flex-col justify-center items-center shadow rounded-md p-5">
            <button className="absolute right-4 top-4" onClick={onCancel}>
                <FaXmark />
            </button>
            <h4 className="text-3xl p-3 my-5">Verify your email</h4>
            <p className="text-sm mb-5">We sent a 6-digit verification code to <span className="font-bold px-1">{fields.email}</span></p>
            <div className="mb-1">
                <section className="flex flex-row mb-10 justify-center items-center">
                    {arrayOfSix.map((_, index) => (
                        <input
                            ref={otpRefs.current[index]}
                            key={index}
                            value={otp[index] || ''}
                            onChange={(event) => otpChangeHandler(event, index)}
                            onKeyDown={(event) => otpKeyDownHandler(event, index)}
                            maxLength="1"
                            autoComplete="off"
                            className="w-9 sm:w-12 h-9 sm:h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-1"
                        />
                    ))}
                </section>
                <Timer fields={fields} />
            </div>
            <div className="w-full sm:w-1/3 p-3">
                <button className="w-full bg-blue-500 p-2 text-center rounded-lg hover:bg-blue-700 focus:bg-blue-700 text-white transition-colors duration-300"
                    onClick={emailVerificationHandler}
                >
                    {isLoading ? <Loader /> : 'Verify Email'}
                </button>
            </div>
        </div>
    </div >)
}

export default EmailVerifier
