import { useDispatch } from "react-redux"
import { notificationActions } from "@/store/notification-slice"

export const useAsync = () => {
    const dispatch = useDispatch()
    const catchAsync = asyncFunction => {
        return async () => {
            try {
                const result = await asyncFunction();
                return result;
            } catch (error) {
                dispatch(notificationActions.setNotification({
                    type: 'error',
                    message: error.message
                }));
            }
        }
    }
    return catchAsync
}
