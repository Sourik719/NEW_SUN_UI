import { useAsync } from "@/hooks/use-async"
import { useHttp } from '@/hooks/use-http'
import { memberActions } from "@/store/member-slice"
import { notificationActions } from '@/store/notification-slice'
import { useRouter } from 'next/router'
import { useRef, useState } from "react"
import { useDispatch } from 'react-redux'


import Background from "@/components/login/Background"
import ForgetPassword from "@/components/login/ForgetPassword"
import Input from "@/components/login/Input"
import Container from "@/components/ui/Container"
import Loader from "@/components/ui/Loader"
import Head from "next/head"
import Link from "next/link"

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const emailRef = useRef()
    const passwordRef = useRef()
    const router = useRouter()
    const dispatch = useDispatch()
    const { catchAsync } = useAsync()
    const [httpRequest, isLoading] = useHttp()
    const [forgotPassword, setForgotPassword] = useState(false);

    const credentialsChangeHandler = (field, value) => {
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    const loginHandler = catchAsync(async () => {
        if (!credentials.email.trim()) throw new Error('Please enter your email.')
        if (!credentials.password.trim()) throw new Error('Please enter your password.')
        const { data, message } = await httpRequest('/signin', 'POST', credentials)
        const { token } = data
        localStorage.setItem('jwt-token', token)
        dispatch(memberActions.setToken(token))
        router.replace('/')
        dispatch(notificationActions.setNotification({ message }))
    })

    return (<Container className="bg-orange-300 w-full flex justify-center items-center ">
        <Head>
            <title>Login</title>
        </Head>
        {forgotPassword && <ForgetPassword onCancel={() => setForgotPassword(false)} />}
        <div className={`w-full sm:w-4/5 md:w-3/5 lg:w-2/5 p-2 ${forgotPassword && 'blur-lg'}`}>
            <div className="relative rounded-xl">
                <Background />
                <div className="relative flex flex-col justify-center items-center z-10 p-3">
                    <p className="text-xl p-3 m-2 mb-5 pointer-events-none">TEAM NEW SUN FOUNDATION</p>
                    <Input
                        label={'Email'}
                        ref={emailRef}
                        onChange={credentialsChangeHandler}
                    />
                    <Input
                        label={'Password'}
                        ref={passwordRef}
                        onChange={credentialsChangeHandler}
                        hidden
                    />
                    <div className="w-full sm:w-2/3 p-3 mt-5">
                        <button className="w-full bg-blue-500 p-2 text-center rounded-lg hover:bg-blue-700 focus:bg-blue-700 text-white transition-colors duration-300"
                            onClick={loginHandler}
                        >
                            {isLoading ? <Loader /> : 'Login as Member'}
                        </button>
                    </div>
                    <div className="text-sm mb-2 justify-center items-center text-center cursor-pointer hover:text-blue-800 font-bold text-blue-500 " onClick={() => setForgotPassword(true)}>
                        Forgot Password ?
                    </div>

                    <div className="text-sm flex justify-center items-center mb-5">
                        <span>Not a member yet?</span>
                        <Link href="/join-us" className="text-blue-500 hover:text-blue-700 px-1 cursor-pointer">Join us</Link>
                    </div>
                </div>
            </div>
        </div>
    </Container>)
}

export default Login