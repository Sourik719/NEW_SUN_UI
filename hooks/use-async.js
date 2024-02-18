import { notificationActions } from "@/store/notification-slice";
import { useDispatch } from "react-redux";

export const useAsync = () => {
    const dispatch = useDispatch();

    const catchAsync = asyncFunction => {
        return async (...args) => {
            try {
                return await asyncFunction(...args);
            } catch (error) {
                dispatch(notificationActions.setNotification({
                    type: 'error',
                    message: error.message
                }));
                throw error;
            }
        };
    };

    return { catchAsync };
};
