import { useState } from "react"
import { useSelector } from "react-redux"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

import Link from "next/link"
import Image from "next/image"

const Account = () => {
    const { member } = useSelector(state => state.member)
    const [isOpened, setIsOpened] = useState(false)
    const toggleHandler = () => setIsOpened(isOpened => !isOpened)

    return (<div className="relative cursor-pointer">
        <section className="flex justify-between items-center rounded" onClick={toggleHandler}>
            <div className="bg-slate-100 rounded-full">
                <Image
                    src={member.image || '/blank.png'}
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
                <Link href={`/members/${member._id}`} className="hover:bg-slate-100 p-3 rounded">My Profile</Link>
                <Link href={'/'} className="hover:bg-slate-100 p-3 rounded">Logout</Link>
            </section>
        }
    </div>)
}

export default Account