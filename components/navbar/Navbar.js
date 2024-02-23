import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { FaBars, FaTimes } from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion"

import Link from "next/link"
import Loader from "../ui/Loader"
import Account from "./Account"
import NavLink from "./NavLink"

const Navbar = () => {
    const [isAuthenticated, isAuthLoading] = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const toggleHandler = () => setIsHidden(isHidden => !isHidden)
    const resizeHandler = () => setIsMobile(window.innerWidth < 640)

    const scrollHandler = () => {
        if (window.scrollY > 50) setIsScrolled(true)
        else setIsScrolled(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        window.addEventListener('resize', resizeHandler)
        if (window.innerWidth < 640) setIsMobile(true)
    }, [])

    return (<div className={`fixed top-0 z-20 w-full flex flex-col sm:flex-row justify-between ${isScrolled && 'bg-slate-200 sm:bg-opacity-95'} transition-all duration-500 py-2 px-2`}>
        <div className="flex justify-between items-center sm:mr-20 mb-5 sm:mb-0">
            <Link href={'/'} className="hover:scale-110 transition-transform duration-200 p-2 mx-3 my-1">Navbrand</Link>
            {isMobile && <span className="text-2xl p-3" onClick={toggleHandler}>{isHidden ? <FaBars /> : <FaTimes />}</span>}
        </div>
        <AnimatePresence>
            {(!isMobile || !isHidden) &&
                <motion.div
                    className={`w-full flex flex-col sm:flex-row justify-between items-center ${isMobile && 'bg-slate-300 rounded-md p-3'}`}
                    initial={{ translateY: -50 }}
                    animate={{ translateY: 0 }}
                    exit={{ opacity: 0 }}
                    onClick={toggleHandler}
                >
                    <section className="w-full sm:w-auto flex flex-col sm:flex-row">
                        <NavLink label={'Home'} href={'/'} />
                        <NavLink label={'About'} href={'/about'} />
                        <NavLink label={'Culture'} href={'/culture'} />
                        <NavLink label={'Tasks'} href={'/tasks'} />
                    </section>
                    <section className="p-2 mx-3 my-1">
                        {isAuthLoading ? <Loader /> : isAuthenticated
                            ? <Account />
                            : <div className={`space-x-10 sm:space-x-2 ${isMobile && 'flex items-center'}`}>
                                <Link href={'/join-us'} className={`hover:bg-slate-100 rounded p-2 my-1 ${isMobile && 'bg-slate-100 px-5'}`}>Join us</Link>
                                <Link href={'/login'} className={`hover:bg-slate-100 rounded p-2 my-1 ${isMobile && 'bg-slate-100 px-5'}`}>Login</Link>
                            </div>
                        }
                    </section>
                </motion.div>
            }
        </AnimatePresence>
    </div>)
}

export default Navbar