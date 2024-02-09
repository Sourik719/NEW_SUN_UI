import Container from "@/components/ui/Container";
import Loader from "@/components/ui/Loader";
import { useAsync } from "@/hooks/use-async";
import { useHttp } from '@/hooks/use-http';
import { notificationActions } from '@/store/notification-slice';
import { userActions } from '@/store/user-slice';
import decodeToken from '@/utilities/decodeToken';
import getConfig from 'next/config';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const catchAsync = useAsync();
    const { publicRuntimeConfig } = getConfig();
    const [httpRequest, isLoading] = useHttp();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const token_secret = publicRuntimeConfig.TOKEN_SECRET;

    const handleFieldChange = (fieldName, value) => {
        setLoginData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };
    const handleSignin = async () => {
        const responseData = await httpRequest('/signin', 'POST', loginData);
        console.log(responseData);
        return responseData;
    };

    const handleSubmit = async () => {
        const errors = {};
        if (!loginData.email.trim()) {
            errors.email = "Please enter your email.";
        }
        if (!loginData.password.trim()) {
            errors.password = "Please enter your password.";
        }
        if (Object.keys(errors).length === 0) {
            const responseData = await catchAsync(handleSignin)();
            if (responseData) {
                const { token } = responseData.data;
                dispatch(userActions.setToken(token));
                dispatch(notificationActions.setNotification({
                    type: 'success',
                    message: responseData.message
                }));
                localStorage.setItem('token', token);
                const userId = decodeToken(token, token_secret);
                const id = userId._id;
                router.push(`/members/${id}`);
            }
        }
        else {
            const errorsMessage = JSON.stringify(errors.email || errors.password, null, 2);
            dispatch(notificationActions.setNotification({
                type: 'error',
                message: errorsMessage
            }));
        }
    };

    return (<Container className="bg-slate-200 min-h-screen w-full flex flex-col justify-center items-center">
        <Head>
            <title>Login</title>
        </Head>
        <div className="relative w-[500px] xs:w-full rounded-xl m-3">
            <div className="absolute w-full h-full pointer-events-none">
                <Image
                    src={"/login.svg"}
                    alt="Background"
                    width={0}
                    height={0}
                    priority
                    className="rounded-xl w-full h-full object-cover"
                />
            </div>
            <div className="relative flex flex-col justify-center items-center z-10 p-3">
                <p className="text-xl p-3 m-2 mb-5 pointer-events-none">Team New Sun</p>
                <div className="flex relative w-full px-5 mb-2">
                    {emailRef.current && emailRef.current.value.trim() &&
                        <label className="pr-4 py-2 mb-2">
                            Email
                        </label>
                    }
                    <input
                        onInput={(event) => handleFieldChange('email', event.target.value)}
                        placeholder="Email"
                        className="w-full border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-300 py-2 mb-2"
                        datatype="email"
                        ref={emailRef}
                    />
                </div>
                <div className="flex relative w-full px-5 mb-2">
                    {passwordRef.current && passwordRef.current.value.trim() &&
                        <label className="pr-4 py-2 mb-2">
                            Password
                        </label>
                    }
                    <div className="w-full relative flex items-center">
                        <input
                            onInput={(event) => handleFieldChange('password', event.target.value)}
                            placeholder="Password"
                            className="w-full border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-300 py-2 mb-2"
                            type={showPassword ? "text" : "password"}
                            ref={passwordRef}
                        />
                        <button className="text-gray-400 absolute right-2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                </div>
                <div className="w-full sm:w-2/3 p-3 mt-5">
                    <button className="w-full bg-blue-500 p-2 text-center rounded-lg hover:bg-blue-700 text-white transition-colors duration-300" onClick={handleSubmit}>
                        {isLoading ? <Loader isLoading={isLoading} /> : "Login as Member"}
                    </button>
                </div>
                <div className="text-sm flex justify-center items-center mb-5">
                    <span>Not a member yet?</span>
                    <Link href="/join-us" className="text-blue-500 hover:text-blue-700 px-1 cursor-pointer">Join us</Link>
                </div>
            </div>
        </div>
    </Container>)
}

export default Login