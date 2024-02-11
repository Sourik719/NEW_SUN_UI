import { useDispatch } from "react-redux"
import { notificationActions } from "@/store/notification-slice"

export const useAsync = () => {
    const dispatch = useDispatch()
    const catchAsync = asyncFunction => {
        return () => {
            asyncFunction().catch(error => {
                dispatch(notificationActions.setNotification({
                    type: 'error',
                    message: error.message
                }))
            })
        }
    }
    return { catchAsync }
}