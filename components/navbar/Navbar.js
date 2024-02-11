import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"

import Link from "next/link"
import Loader from "../ui/Loader"
import Account from "./Account"
import NavLink from "./NavLink"

const Navbar = () => {
    const [isAuthenticated, isAuthLoading] = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)
    const scrollHandler = () => {
        if (window.scrollY > 50) setIsScrolled(true)
        else setIsScrolled(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)

    }, [])

    return (<div className={`fixed top-0 z-20 w-full flex justify-between ${isScrolled && 'bg-slate-200 bg-opacity-95'} transition-all duration-500 py-2 px-2`}>
        <section className="flex justify-between items-center">
            <Link href={'/'} className="hover:font-bold p-2 mx-3 my-1">Navbrand</Link>
            <div className="flex flex-row ml-20">
                <NavLink label={'Home'} href={'/'} />
                <NavLink label={'About'} href={'/about'} />
                <NavLink label={'Culture'} href={'/culture'} />
                <NavLink label={'Tasks'} href={'/tasks'} />
                <NavLink label={'Join Us'} href={'/join-us'} />
            </div>
        </section>
        <span className="p-2 mx-3 my-1">
            {isAuthLoading ? <Loader /> : (isAuthenticated
                ? <Account />
                : <Link href={'/login'} className="hover:bg-slate-100 rounded px-4 py-2 mx-3 my-1">Login</Link>)
            }
        </span>
    </div>)
}

export default Navbar