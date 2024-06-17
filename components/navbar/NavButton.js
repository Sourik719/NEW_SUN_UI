import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';
const NavDropdown = ({ label, items }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { pathname } = useRouter();
    return (
        <div className="relative inline-block text-center w-full mx-2 my-1 sm:w-auto" onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>

            <button
                className={`text-center border-b ${items.some(item => item.href === pathname)
                    ? 'sm:border-slate-800 bg-slate-200 sm:bg-transparent rounded-md sm:rounded-none'
                    : 'border-transparent'
                    } hover:sm:border-slate-800 transition-colors duration-200 p-2 w-full`}
            >
                {label}
            </button>
            {dropdownOpen && (
                <div
                    className="origin-top absolute mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-left z-50 text-black"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-2" role="none">
                        {items.map((item, index) => (
                            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" key={index} href={item.href}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavDropdown;
