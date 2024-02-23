import { useRouter } from "next/router"

import Link from "next/link"

const NavLink = ({ label, href }) => {
    const { pathname } = useRouter()
    return (<Link
        href={href}
        className={`text-center border-b ${pathname === href ? 'sm:border-slate-800 bg-slate-200 sm:bg-transparent rounded-md sm:rounded-none' : 'border-transparent'} hover:sm:border-slate-800 transition-colors duration-200 p-2 mx-3 my-1`}
    >
        {label}
    </Link>)
}

export default NavLink