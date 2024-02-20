import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAsync } from "@/hooks/use-async"
import { useHttp } from "@/hooks/use-http"
import { registrationActions } from "@/store/registration-slice"
import { notificationActions } from "@/store/notification-slice"
import { hasUntouched } from "@/validation/registration"

import Head from "next/head"
import Link from "next/link"
import Container from "@/components/ui/Container"
import Loader from "@/components/ui/Loader"
import Background from "@/components/registration/Background"
import ImageField from "@/components/registration/ImageField"
import Inputs from "@/components/registration/Inputs"
import EmailVerifier from "@/components/registration/EmailVerifier"

const JoinUs = () => {
    const dispatch = useDispatch()
    const { fields, errors } = useSelector(state => state.registration)
    const { catchAsync } = useAsync()
    const [httpRequest, isLoading] = useHttp()
    const [isVerifying, setIsVerifying] = useState(false)

    const signupHandler = catchAsync(async () => {
        if (hasUntouched(errors)) throw new Error('Please fill all your details to be a member.')
        const { message } = await httpRequest('/signup', 'POST', fields)
        setIsVerifying(true)
        dispatch(notificationActions.setNotification({ message }))
    })

    return (<Container className="bg-slate-200 w-full flex justify-center items-center" >
        <Head>
            <title>Join Us</title>
        </Head>
        {isVerifying && <EmailVerifier data={fields} onCancel={() => setIsVerifying(false)} />}
        <div className={`w-full sm:w-2/5 p-2 mb-10 ${isVerifying && 'blur-lg'}`}>
            <div className="relative rounded-xl shadow-sm">
                <Background />
                <div className="relative flex flex-col justify-center items-center z-10 p-3">
                    <ImageField
                        value={fields.image}
                        actionCreator={registrationActions.imageChangeHandler}
                    />
                    <Inputs />
                    <div className="w-full sm:w-2/3 p-3">
                        <button className="w-full bg-blue-500 p-2 text-center rounded-lg hover:bg-blue-700 focus:bg-blue-700 text-white transition-colors duration-300"
                            onClick={signupHandler}
                        >
                            {isLoading ? <Loader /> : 'Join as Member'}
                        </button>
                    </div>
                    <div className="text-sm flex justify-center items-center mb-5">
                        <span>Are you a member already?</span>
                        <Link href="/login" className="text-blue-500 hover:text-blue-700 px-1 cursor-pointer">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </Container>)
}

export default JoinUs