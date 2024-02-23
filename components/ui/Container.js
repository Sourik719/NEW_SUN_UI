import { Roboto } from "next/font/google"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"

import Notification from "@/components/ui/Notification"
import Feedbackbtn from "@/components/ui/Feedbackbtn"
import Footer from "@/components/ui/Footer"

const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const Container = ({ children, className }) => {
    const router = useRouter()
    const { message } = useSelector(state => state.notification)

    return (<div className="flex flex-col justify-between">
        <div className={`${roboto.className} min-h-screen pt-20 ${className}`}>
            <AnimatePresence>
                {message && <Notification />}
            </AnimatePresence>
            {children}
            {router.pathname !== '/join-us' && router.pathname !== '/login' &&
                <Feedbackbtn />
            }
        </div>
        <Footer />
    </div>)
}

export default Container