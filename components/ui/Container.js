import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Roboto } from "next/font/google"

import Navbar from '@/components/navbar/Navbar'
import Notification from '@/components/ui/Notification'
import Feedbackbtn from '@/components/ui/Feedback'
import Footer from '@/components/footer/footer'

const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const Container = ({ children, className }) => {
    const router = useRouter()
    const { message } = useSelector(state => state.notification)

    return (<div className="flex flex-col justify-between">
        <div className={`${roboto.className} min-h-screen pt-20 ${className}`}>
            <Navbar />
            {message && <Notification />}
            {children}
            {router.pathname !== '/join-us' && router.pathname !== '/login' &&
                <Feedbackbtn />
            }
        </div>
        <Footer />
    </div>)
}

export default Container