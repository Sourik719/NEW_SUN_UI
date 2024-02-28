import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

const EngageBtn = ({ label, href }) => {
    return (
        <Link className="sm:w-1/3 w-full text-xl px-2 py-10 mx-2 my-2 bg-green-500 text-white font-bold hover:bg-yellow-500 hover:text-violet-600 hover:scale-105 focus:bg-blue-500 focus:text-red-200 focus:scale-95 duration-300 mx-2 justify-center text-center rounded-lg shadow-xl" href={href}>
            {label}
        </Link>
    );
}

const Participation = () => {
    const [isAuthenticated] = useAuth();
    return (
        <div className="flex flex-col items-center justify-center bg-black text-white">
            <p className="text-3xl">Want to be a part of <span className="mr-1 text-orange-400">our journey?</span></p>
            <div className="w-full flex sm:flex-row flex-col p-5 justify-center items-center">
                <EngageBtn label="Sponsor a Event" href={"/"} />
                <EngageBtn label="Become a Member" href={isAuthenticated ? "/" : "/join-us"} />
                <EngageBtn label="Donate for a Cause" href={"/"} />
            </div>
        </div>
    );
}

export default Participation;


