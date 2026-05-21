import { useAsync } from "@/hooks/use-async"
import { useHttp } from "@/hooks/use-http"
import { notificationActions } from "@/store/notification-slice"
import { hasErrors, hasUntouched } from "@/validation/registration"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import EmailVerifier from "@/components/registration/EmailVerifier"
import ImageField from "@/components/registration/ImageField"
import Inputs from "@/components/registration/Inputs"
import Container from "@/components/ui/Container"
import Loader from "@/components/ui/Loader"
import Head from "next/head"
import Link from "next/link"

const JoinUs = () => {
    const dispatch = useDispatch()
    const { fields, errors } = useSelector(state => state.registration)
    const { catchAsync } = useAsync()
    const [httpRequest, isLoading] = useHttp()
    const [isVerifying, setIsVerifying] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const signupHandler = catchAsync(async () => {
        if (hasUntouched(errors)) throw new Error('Please complete all required member details.')
        if (hasErrors(errors)) {
            throw new Error(`Please fix the highlighted fields before continuing.`);
        }
        const formData = new FormData();
        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                formData.append(key, fields[key]);
            }
        }
        if (imageFile) {
            formData.append('image', imageFile);
        }
        const { message } = await httpRequest('/signup', 'POST', formData, true)
        setIsVerifying(true)
        dispatch(notificationActions.setNotification({ message }))
    })
    const handleImageSelected = (file) => {
        setImageFile(file);
    };
    return (<Container className="w-full bg-stone-50 px-5 py-16 sm:px-8" >
        <Head>
            <title>Join Us | Team New Sun Foundation</title>
        </Head>
        {isVerifying && <EmailVerifier fields={fields} onCancel={() => setIsVerifying(false)} />}
        <main className={`mx-auto grid max-w-6xl overflow-hidden rounded-md border border-stone-200 bg-white shadow-xl lg:grid-cols-[0.85fr_1.15fr] ${isVerifying && 'blur-lg'}`}>
            <section className="bg-slate-950 p-8 text-white sm:p-10">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Become a member</p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">Join the volunteer community behind the work.</h1>
                <p className="mt-5 text-lg leading-8 text-stone-300">Create your member profile and stay connected with initiatives, contributions, and upcoming events.</p>
            </section>
            <section className="relative p-4 sm:p-6">
                <div className="relative flex flex-col justify-center items-center z-10">
                    <ImageField
                        actionCreator={handleImageSelected}
                    />
                    <Inputs />
                    <div className="w-full p-3 sm:w-2/3">
                        <button className="w-full rounded-md bg-orange-600 p-3 text-center font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
                            onClick={signupHandler}
                        >
                            {isLoading ? <Loader /> : 'Create Member Account'}
                        </button>
                    </div>
                    <div className="text-sm flex justify-center items-center mb-5">
                        <span>Already a member?</span>
                        <Link href="/login" className="text-blue-500 hover:text-blue-700 px-1 cursor-pointer">Login</Link>
                    </div>
                </div>
            </section>
        </main>
    </Container>)
}

export default JoinUs
