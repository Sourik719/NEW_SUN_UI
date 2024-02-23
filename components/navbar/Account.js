import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { memberActions } from "@/store/member-slice"
import { notificationActions } from "@/store/notification-slice"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

import Image from "next/image"
import Link from "next/link"

const Account = () => {
    const dispatch = useDispatch()
    const { member } = useSelector(state => state.member)
    const [isOpened, setIsOpened] = useState(false)
    const toggleHandler = () => setIsOpened(isOpened => !isOpened)

    const logoutHandler = () => {
        localStorage.removeItem('jwt-token')
        dispatch(memberActions.clearToken())
        dispatch(notificationActions.setNotification({ message: 'You are successfully logged out.' }))
        setIsOpened(false)
    }

    return (<div className="relative cursor-pointer">
        <section className="flex justify-between items-center rounded" onClick={toggleHandler}>
            <div className="bg-slate-100 rounded-full">
                <Image
                    src={member.image || '/blank.png'}
                    alt={'Profile'}
                    width={30}
                    height={30}
                    className="rounded-full"
                />
            </div>
            <div className="p-1">
                {isOpened ? <FaAngleUp /> : <FaAngleDown />}
            </div>
        </section>
        {isOpened &&
            <section className="absolute top-10 right-0 flex flex-col bg-slate-300 w-32 text-sm p-1 rounded">
                <Link href={`/members/${member._id}`} onClick={toggleHandler} className="hover:bg-slate-100 p-3 rounded">My Profile</Link>
                <Link href={'/'} onClick={logoutHandler} className="hover:bg-slate-100 p-3 rounded">Logout</Link>
            </section>
        }
    </div>)
}

export default Account