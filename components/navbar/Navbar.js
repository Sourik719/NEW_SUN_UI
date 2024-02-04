import { useState, useEffect } from "react"
import NavLink from "./NavLink"

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const scrollHandler = () => {
        if (window.scrollY > 100) setIsScrolled(true)
        else setIsScrolled(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [])

    return (<div className={`fixed top-0 z-20 w-screen flex justify-between ${isScrolled && 'bg-red-400 bg-opacity-95'} transition-all duration-500 py-5 px-48`}>
        <span>Navbar</span>
        <div>
            <NavLink label={'Home'} href={'/'} />
            <NavLink label={'About'} href={'/about'} />
            <NavLink label={'Contact'} href={'/contact'} />
            <NavLink label={'Join Us'} href={'/join-us'} />
            <NavLink label={'Login'} href={'/login'} />
        </div>
        <span>Profile</span>
    </div>)
}

export default Navbar