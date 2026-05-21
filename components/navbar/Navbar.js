import { useAuth } from "@/hooks/use-auth"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import Loader from "../ui/Loader"
import Account from "./Account"
import NavDropdown from "./NavButton"
import NavLink from "./NavLink"

const Navbar = () => {
    const [isAuthenticated, isAdmin, isAuthLoading] = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const { pathname } = useRouter()
    const toggleHandler = () => setIsHidden(isHidden => !isHidden)
    const resizeHandler = () => {
        const mobile = window.innerWidth < 640
        setIsMobile(mobile)
        if (mobile) setIsHidden(true)
    }

    const scrollHandler = () => {
        if (window.scrollY > 50) setIsScrolled(true)
        else setIsScrolled(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        window.addEventListener('resize', resizeHandler)
        resizeHandler()
        return () => {
            window.removeEventListener('scroll', scrollHandler)
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])
    const projects = [
        { label: 'Special Day Celebration', href: '/projects/specialdaycelebration' },
        { label: 'Agomonir Ahobane', href: '/projects/agomonirahobane' },
        { label: "Winter's Smile", href: '/projects/winterssmile' },
        { label: 'Sampreeti', href: '/projects/sampreeti' },
        { label: 'Sobujer Sondhane', href: '/projects/sobujersondhane' },
    ];
    const services = [
        { label: 'Sponsor a Celebration', href: '/donate/sponsor' },
        { label: 'Donate to a Cause', href: '/donate/cause' },
        ...isAuthenticated ? [{ label: 'Pay Member Contribution', href: '/donate/member_contribution' }] : []
    ];


    return (<header className={`fixed top-0 z-30 w-full border-b transition-all duration-300 ${isScrolled ? 'border-stone-200 bg-white/95 shadow-sm backdrop-blur' : 'border-transparent bg-white/90 backdrop-blur'}`}>
        <div className="mx-auto flex max-w-7xl flex-col px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex justify-between items-center py-3 sm:mr-3">
                <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md ">
                        <Image
                            src="/logo.png"
                            alt="TEAM NEW SUN FOUNDATION Logo"
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="48px"
                            priority
                        />
                    </div>
                    <span className="max-w-[210px] text-base font-extrabold leading-tight text-slate-950 sm:hidden lg:block">TEAM NEW SUN FOUNDATION</span>
                </Link>
                {isMobile && <button className="rounded-md border border-stone-300 p-3 text-slate-900" type="button" aria-label="Toggle navigation" onClick={toggleHandler}>{isHidden ? <FaBars /> : <FaTimes />}</button>}
            </div>
            <AnimatePresence>
                {(!isMobile || !isHidden) &&
                    <motion.div
                        className={`w-full flex flex-col sm:flex-row sm:justify-between sm:items-center ${isMobile && 'rounded-md border border-stone-200 bg-white p-3 shadow-xl mb-4'}`}
                        initial={{ translateY: -50 }}
                        animate={{ translateY: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="sm:w-auto w-full">
                            <div className="container mx-auto w-full sm:w-auto">
                                <section className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-between mx-auto">
                                    <NavLink label={'Home'} href={'/'} />
                                    <NavLink label={'About'} href={'/about'} />
                                    <NavDropdown label={'Projects'} items={projects} />
                                    <NavDropdown label={'Donate'} items={services} />
                                    <NavLink label={'Gallery'} href={'/gallery'} />
                                    {isAuthenticated && isAdmin && <NavLink label={'Admin Panel'} href={"/adminpanel"} />}
                                </section>
                            </div>
                        </div>
                        <section className="p-2 mx-3 my-1">
                            {isAuthLoading ? <Loader /> : isAuthenticated
                                ? <Account />
                                : <div className={`flex flex-col gap-2 sm:flex-row ${isMobile && 'items-stretch'}`}>
                                    <Link href={'/join-us'} onClick={() => setIsHidden(true)} className={`rounded-md border px-4 py-2 text-center font-bold transition hover:bg-stone-100 ${pathname === '/join-us' ? 'border-slate-900 bg-stone-100 text-slate-950' : 'border-stone-300 text-slate-800'}`}>Join us</Link>
                                    <Link href={'/donate/cause'} onClick={() => setIsHidden(true)} className="rounded-md bg-orange-600 px-4 py-2 text-center font-bold text-white transition hover:bg-orange-700">Donate</Link>
                                    <Link href={'/login'} onClick={() => setIsHidden(true)} className={`rounded-md px-4 py-2 text-center font-bold text-slate-700 transition hover:bg-stone-100 ${pathname === '/login' ? 'bg-stone-100 text-slate-950' : ''}`}>Login</Link>
                                </div>
                            }
                        </section>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    </header>)
}

export default Navbar
