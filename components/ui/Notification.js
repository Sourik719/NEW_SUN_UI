import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notificationActions } from "@/store/notification-slice"
import { FaCircleCheck, FaCircleInfo, FaCircleXmark, FaXmark } from "react-icons/fa6"
import { motion } from "framer-motion"

const Notification = () => {
    const dispatch = useDispatch()
    const { type, message } = useSelector(state => state.notification)
    const notificationCancelHandler = () => dispatch(notificationActions.clearNotification())
    const isError = type === 'error'

    const notificationStyle = isError
        ? {
            Icon: FaCircleXmark,
            title: 'Something needs attention',
            wrapper: 'border-red-200 bg-red-50 text-red-950 shadow-red-950/10',
            icon: 'bg-red-100 text-red-600',
            button: 'text-red-700 hover:bg-red-100 hover:text-red-950',
            progress: 'bg-red-500',
        }
        : type === 'success'
            ? {
                Icon: FaCircleCheck,
                title: 'Success',
                wrapper: 'border-emerald-200 bg-emerald-50 text-emerald-950 shadow-emerald-950/10',
                icon: 'bg-emerald-100 text-emerald-600',
                button: 'text-emerald-700 hover:bg-emerald-100 hover:text-emerald-950',
                progress: 'bg-emerald-500',
            }
            : {
                Icon: FaCircleInfo,
                title: 'Notice',
                wrapper: 'border-slate-200 bg-white text-slate-950 shadow-slate-950/10',
                icon: 'bg-slate-100 text-slate-600',
                button: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                progress: 'bg-slate-500',
            }

    const { Icon } = notificationStyle

    useEffect(() => {
        const timeoutId = setTimeout(notificationCancelHandler, 5000)
        return () => clearTimeout(timeoutId)
    }, [message])

    return (<motion.div
        className="fixed left-0 right-0 top-16 z-50 flex justify-center px-4"
        initial={{ opacity: 0, translateY: -16, scale: 0.98 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        exit={{ opacity: 0, translateY: -12, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        role={isError ? 'alert' : 'status'}
        aria-live={isError ? 'assertive' : 'polite'}
    >
        <div className={`relative flex w-full max-w-xl overflow-hidden rounded-md border p-4 pr-12 shadow-xl backdrop-blur ${notificationStyle.wrapper}`}>
            <div className={`mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notificationStyle.icon}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-extrabold">{notificationStyle.title}</p>
                <p className="mt-1 break-words text-sm font-medium leading-6">{message}</p>
            </div>
            <button
                type="button"
                aria-label="Dismiss notification"
                className={`absolute right-3 top-3 rounded-md p-2 transition ${notificationStyle.button}`}
                onClick={notificationCancelHandler}
            >
                <FaXmark />
            </button>
            <motion.div
                className={`absolute bottom-0 left-0 h-1 ${notificationStyle.progress}`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
            />
        </div>
    </motion.div>)
}

export default Notification
