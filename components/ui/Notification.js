import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaXmark } from "react-icons/fa6"
import { notificationActions } from "@/store/notification-slice"

const Notification = () => {
    const dispatch = useDispatch()
    const { type, message } = useSelector(state => state.notification)
    const notificationCancelHandler = () => dispatch(notificationActions.clearNotification())

    useEffect(() => {
        const timeoutId = setTimeout(notificationCancelHandler, 5000)
        return () => clearTimeout(timeoutId)
    }, [])

    return (<div className="w-full flex justify-center fixed top-14 z-40">
        <div className={`relative w-full sm:w-2/5 p-4 m-2 rounded-md ${type === 'error' ? "bg-rose-500 text-rose-900" : type === 'success' ? "bg-lime-500 text-lime-900" : "bg-slate-100 text-slate-900"}`}>
            <span>{message}</span>
            <div
                className="absolute top-2 right-2 cursor-pointer p-1"
                onClick={notificationCancelHandler}
            >
                <FaXmark />
            </div>
        </div>
    </div>)
}

export default Notification