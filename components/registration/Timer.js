import { useAsync } from '@/hooks/use-async';
import { useHttp } from '@/hooks/use-http';
import { notificationActions } from '@/store/notification-slice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const Timer = ({ data }) => {
    const [seconds, setSeconds] = useState(10);
    const [httpRequest] = useHttp();
    const catchAsync = useAsync();
    const dispatch = useDispatch();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleSignup = async () => {
        console.log(data);
        const responseData = await httpRequest('/signup', 'POST', data);
        return responseData;
    };
    const onClick = async () => {
        const responseData = await catchAsync(handleSignup)();
        if (responseData) {
            dispatch(notificationActions.setNotification({
                type: 'success',
                message: responseData.message,
            }));
        }
        setSeconds(10);
    }

    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div>
            {seconds >= 0 ?
                < p className='text-sm float-right px-2 py-2'>{minutes < 10 ? '0' + minutes : minutes}:{remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}</p>
                : <a className='text-sm float-right px-2 py-2 hover:underline text-blue-400 ' href="#" onClick={onClick}>Resend OTP</a>
            }
        </div >
    );
};

export default Timer;
