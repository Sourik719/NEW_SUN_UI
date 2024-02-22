import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAsync } from "@/hooks/use-async"
import { useHttp } from "@/hooks/use-http"
import { notificationActions } from "@/store/notification-slice"

import Loader from "../ui/Loader"

const Timer = ({ fields }) => {
    const dispatch = useDispatch()
    const [seconds, setSeconds] = useState(300)
    const [isResent, setIsResent] = useState(false)
    const { catchAsync } = useAsync()
    const [httpRequest, isLoading] = useHttp()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    const resendOtpHandler = catchAsync(async () => {
        const { message } = await httpRequest('/signup', 'POST', fields)
        dispatch(notificationActions.setNotification({ message }))
        setIsResent(true)
        setTimeout(() => setIsResent(false), 5000)
        setSeconds(300)
    })

    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return (<div className="w-full flex justify-between text-sm text-center mb-5">
        {seconds >= 0 ?
            <section className="flex">
                <p>Your OTP will expire in</p>
                <p className="font-bold float-right px-1">{minutes < 10 ? '0' + minutes : minutes}:{remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}</p>
            </section> :
            <p>Your OTP has expired</p>
        }
        {isLoading ? <Loader /> :
            <button className="text-blue-600 hover:underline" onClick={resendOtpHandler}>{isResent ? 'OTP Resent' : 'Resend'}</button>
        }
    </div >)
}

export default Timer
