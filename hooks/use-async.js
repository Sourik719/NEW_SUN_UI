import { notificationActions } from "@/store/notification-slice"
import { useDispatch } from "react-redux"

export const useAsync = () => {
    const dispatch = useDispatch()
    const catchAsync = asyncFunction => {
        return (response) => {
            asyncFunction(response).catch(error => {
                dispatch(notificationActions.setNotification({
                    type: 'error',
                    message: error.message
                }))
            })
        }
    }

    return { catchAsync }
}