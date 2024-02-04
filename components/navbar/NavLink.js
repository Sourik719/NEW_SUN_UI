import Link from "next/link"

const NavLink = ({ label, href }) => {
    return (<Link
        href={href}
        className="border-b border-transparent hover:border-slate-800 transition-colors duration-200 p-2 mx-3 my-1"
    >
        {label}
    </Link>)
}

export default NavLink