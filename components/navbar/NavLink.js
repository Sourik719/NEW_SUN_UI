import { useRouter } from "next/router"

import Link from "next/link"

const NavLink = ({ label, href }) => {
    const router = useRouter()
    const isActive = router.pathname === href
    return (<Link
        href={href}
        className={`border-b border-transparent ${isActive && 'border-slate-800'} hover:border-slate-800 transition-colors duration-200 p-2 mx-3 my-1`}
    >
        {label}
    </Link>)
}

export default NavLink