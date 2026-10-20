import { useRouter } from "next/router"

import Link from "next/link"

const NavLink = ({ label, href }) => {
    const { pathname } = useRouter()
    return (<Link
        href={href}
        className={`w-full rounded-md px-3 py-2 text-center text-sm font-bold transition sm:w-auto ${pathname === href ? 'bg-orange-50 text-orange-700' : 'text-slate-700 hover:bg-stone-100 hover:text-slate-950'}`}
    >
        {label}
    </Link>)
}

export default NavLink
