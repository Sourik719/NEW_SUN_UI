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
                className={`w-full rounded-md px-3 py-2 text-center text-sm font-bold transition ${pathname.startsWith(`/${label.toLowerCase()}`)
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-slate-700 hover:bg-stone-100 hover:text-slate-950'
                    }`}
                onClick={toggleDropdown}
            >
                {label}
            </button>
            {dropdownOpen && (
                <div
                    className="origin-top absolute left-0 mt-2 w-64 rounded-md border border-stone-200 bg-white text-left text-black shadow-xl z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-2" role="none">
                        {items.map((item, index) => (
                            <Link
                                className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700"
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
