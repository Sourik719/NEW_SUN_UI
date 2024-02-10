import decodeToken from "@/utilities/decodeToken";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const userId = token ? decodeToken(token) : null;
    const id = userId ? userId._id : null;

    const scrollHandler = () => {
        if (window.scrollY > 100) setIsScrolled(true);
        else setIsScrolled(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <div className={`fixed top-0 z-20 w-full flex flex-row justify-between ${isScrolled && 'bg-red-400 bg-opacity-95'} transition-all duration-500 py-2 px-2`}>
            <span className="p-2 mx-3 my-1">Navbar</span>
            <div className="flex flex-row w-5/6">
                <NavLink label={'Home'} href={'/'} />
                <NavLink label={'About'} href={'/about'} />
                <NavLink label={'Join Us'} href={'/join-us'} />
                {id === null ? <NavLink label={'Login'} href={'/login'} /> :
                    <NavLink label={'Profile'} href={`/members/${id}`} />}
            </div>
            <span className="p-2 mx-3 my-1">Profile</span>
        </div>
    );
};

export default Navbar;
