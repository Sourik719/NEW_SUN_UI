import { memberActions } from "@/store/member-slice";
import { notificationActions } from "@/store/notification-slice";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import Link from "next/link";

const Account = () => {
    const dispatch = useDispatch();
    const { member } = useSelector((state) => state.member);
    const [isOpened, setIsOpened] = useState(false);
    const accountRef = useRef(null);

    const toggleHandler = () => {
        setIsOpened((isOpened) => !isOpened);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setIsOpened(false);
            }
        };

        if (isOpened) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpened]);

    const logoutHandler = () => {
        localStorage.removeItem("jwt-token");
        dispatch(memberActions.clearToken());
        dispatch(
            notificationActions.setNotification({
                message: "You have been signed out.",
            })
        );
        setIsOpened(false);
    };

    const memberName = [member?.firstname, member?.lastname].filter(Boolean).join(" ");

    return (
        <div className="relative" ref={accountRef}>
            <button
                type="button"
                aria-expanded={isOpened}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-stone-200 bg-white py-1 pl-1 pr-2 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-200"
                onClick={toggleHandler}
            >
                <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full bg-stone-100 ring-2 ring-white">
                    <Image
                        src={member?.image?.url || "/blank.png"}
                        alt={memberName || "Profile"}
                        fill
                        sizes="36px"
                        className="rounded-full object-cover"
                        unoptimized
                    />
                </span>
                <FaAngleDown className={`text-xs text-slate-500 transition ${isOpened ? "rotate-180" : ""}`} />
            </button>
            {isOpened && (
                <section
                    className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-md border border-stone-200 bg-white text-sm shadow-xl"
                    role="menu"
                >
                    <div className="border-b border-stone-100 px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-orange-600">Account</p>
                        <p className="mt-1 truncate font-extrabold text-slate-950">{memberName || "Member"}</p>
                    </div>
                    <Link
                        href={`/members/${member?._id}`}
                        onClick={() => setIsOpened(false)}
                        className="flex items-center gap-3 px-4 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-700"
                        role="menuitem"
                    >
                        <FaUserCircle className="text-base" />
                        My Profile
                    </Link>
                    <Link
                        href={"/"}
                        onClick={logoutHandler}
                        className="flex items-center gap-3 border-t border-stone-100 px-4 py-3 font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
                        role="menuitem"
                    >
                        <FaSignOutAlt className="text-base" />
                        Logout
                    </Link>
                </section>
            )}
        </div>
    );
};

export default Account;
