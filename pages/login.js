import { useAsync } from "@/hooks/use-async"
import { useHttp } from '@/hooks/use-http'
import { memberActions } from "@/store/member-slice"
import { notificationActions } from '@/store/notification-slice'
import { useRouter } from 'next/router'
import { useRef, useState } from "react"
import { useDispatch } from 'react-redux'


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

    return (<Container className="w-full bg-stone-50 px-5 py-16 sm:px-8">
        <Head>
            <title>Login</title>
        </Head>
        {forgotPassword && <ForgetPassword onCancel={() => setForgotPassword(false)} />}
        <main className={`mx-auto grid max-w-5xl overflow-hidden rounded-md border border-stone-200 bg-white shadow-xl md:grid-cols-[0.85fr_1.15fr] ${forgotPassword && 'blur-lg'}`}>
            <section className="bg-slate-950 p-8 text-white sm:p-10">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Member Login</p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">Welcome back to Team New Sun Foundation.</h1>
                <p className="mt-5 text-lg leading-8 text-stone-300">Access your member profile, contribution details, and community updates.</p>
            </section>
            <section className="p-6 sm:p-8">
                <div className="relative flex flex-col justify-center items-center z-10">
                    <p className="mb-5 text-center text-2xl font-extrabold text-slate-950">Sign in</p>
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
                    <div className="mt-5 w-full p-3 sm:w-2/3">
                        <button className="w-full rounded-md bg-orange-600 p-3 text-center font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
                            onClick={loginHandler}
                        >
                            {isLoading ? <Loader /> : 'Login as Member'}
                        </button>
                    </div>
                    <div className="mb-2 cursor-pointer text-center text-sm font-bold text-orange-600 hover:text-orange-700" onClick={() => setForgotPassword(true)}>
                        Forgot Password ?
                    </div>

                    <div className="text-sm flex justify-center items-center mb-5">
                        <span>Not a member yet?</span>
                        <Link href="/join-us" className="text-blue-500 hover:text-blue-700 px-1 cursor-pointer">Join us</Link>
                    </div>
                </div>
            </section>
        </main>
    </Container>)
}

export default Login
