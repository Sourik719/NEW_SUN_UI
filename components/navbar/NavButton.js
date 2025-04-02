import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const NavDropdown = ({ label, items }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { pathname } = useRouter();
    const dropdownRef = useRef(null);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);
    return (
        <div className="relative inline-block text-center w-full mx-2 my-1 sm:w-auto" ref={dropdownRef}>

            <button
                className={`text-center border-b ${pathname.startsWith(`/${label.toLowerCase()}`)
                    ? 'sm:border-slate-800 bg-slate-200 sm:bg-transparent rounded-md sm:rounded-none'
                    : 'border-transparent'
                    } hover:sm:border-slate-800 transition-colors duration-200 p-2 w-full`}
                onClick={toggleDropdown}
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
                            <Link
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                key={index}
                                href={item.href}
                                onClick={() => setDropdownOpen(false)}
                            >
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