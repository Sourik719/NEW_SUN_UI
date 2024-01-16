import { useHttp } from '@/hooks/use-http';
import { userActions } from '@/store/user-slice';
import { useRouter } from 'next/router';
import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
const login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [httpRequest, isLoading] = useHttp();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const handleFieldChange = (fieldName, value) => {
        setLoginData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };
    const handleSignin = async () => {
        try {
            const responseData = await httpRequest('/signin', 'POST', loginData);
            return responseData;
        } catch (error) {
            console.error('Error during signin:', error.message);
            throw error;
        }
    };
    const handleSubmit = async () => {
        const errors = {};
        if (!loginData.email.trim()) {
            errors.email = "Email is required";
        }
        if (!loginData.password.trim()) {
            errors.password = "Password is required";
        }
        if (Object.keys(errors).length === 0) {
            const responseData = await handleSignin();
            const token = responseData.token;
            console.log(token);
            dispatch(userActions.setToken(token));
            const userId = responseData.id;
            console.log(userId);
            router.push(`/users/${userId}`);
        }
        else {
            const errorsMessage = JSON.stringify(errors, null, 2);
            window.alert(`${errorsMessage}`);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col bg-white boder-2 rounded-lg w-1/3 p-5 my-20 items-center">
                <p className="text-black px-5 text-2xl pb-5">SIGN IN</p>
                <div className="relative pt-5 w-full px-5">
                    {emailRef.current && emailRef.current.value.trim() !== '' && <label className="absolute text-black top-1 left-5 bg-white px-1 py-1 transition-all duration-300 z-10 text-sm">
                        Email:
                    </label>
                    }
                    <input
                        onInput={(event) => handleFieldChange('email', event.target.value)}
                        placeholder="Email"
                        className="text-black w-full py-2 px-2 my-1 border-b-2 border-yellow-500  border-0 focus:outline-none focus:border-b-4 focus:border-blue-300"
                        datatype="Email"
                        ref={emailRef} />
                </div>
                <div className="relative py-5 w-full px-5">
                    {passwordRef.current && passwordRef.current.value.trim() !== '' && <label className="absolute text-black top-1 left-5 bg-white px-1 py-1 transition-all duration-300 z-10 text-sm">
                        Password:
                    </label>
                    }
                    <div className="relative">
                        <input
                            onInput={(event) => handleFieldChange('password', event.target.value)}
                            placeholder="Password"
                            className="text-black w-full py-2 px-2 my-1  border-b-2 border-yellow-500  border-0 focus:outline-none focus:border-b-4 focus:border-blue-300"
                            type={showPassword ? "text" : "password"}
                            ref={passwordRef} />
                        <button onClick={() => setShowPassword(!showPassword)} className="text-black absolute top-5 right-2">
                            {showPassword ?
                                <FaRegEye /> :
                                <FaRegEyeSlash />
                            }</button>
                    </div>
                </div>
                <div>
                    <button className="bg-green-500 px-2 py-2 my-1 text-center text-white border-2 rounded-lg hover:bg-blue-500" onClick={handleSubmit}>{isLoading ? "Signing In" : "Sign In"}</button>
                </div>
                <div className="text-black flex items-center text-center mt-3">
                    <p className="px-2">Not a member yet?</p>
                    <a className="focus:border-b-2 focus:text-black text-blue-400 hover:border-b-2" href='/join_us'>Join Us</a>
                </div>
            </div>
        </div>
    )
}

export default login