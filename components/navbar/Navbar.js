import decodeToken from "@/utilities/decodeToken";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [id, setId] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = token ? decodeToken(token) : null;
        if (userId)
            setId(userId._id)
        const scrollHandler = () => {
            if (window.scrollY > 50) setIsScrolled(true);
            else setIsScrolled(false);
        };

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
