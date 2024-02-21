import { Roboto } from "next/font/google"
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/Navbar'
import Feedbackbtn from '@/components/ui/Feedbackbtn'
import Notification from '@/components/ui/Notification'
import Feedbackbtn from '@/components/ui/Feedback'
import Footer from '@/components/ui/Footer'

const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const Container = ({ children, className }) => {
    const router = useRouter()
    const { message } = useSelector(state => state.notification)

    return (<div className="flex flex-col justify-between bg-black">
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