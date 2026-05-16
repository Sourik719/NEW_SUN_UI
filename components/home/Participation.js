import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

const EngageBtn = ({ label, href }) => {
    return (
        <Link className="w-full rounded-md bg-white px-5 py-4 text-center text-base font-extrabold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-100 sm:w-auto" href={href}>
            {label}
        </Link>
    );
}

const Participation = () => {
    const [isAuthenticated] = useAuth();
    return (
        <section className="bg-slate-950 px-5 py-16 text-white sm:px-8">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Take part</p>
                    <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Want to be part of our journey?</h2>
                    <p className="mt-4 text-lg leading-8 text-stone-300">
                        Sponsor an event, become a member, or support a cause that brings help directly to communities in need.
                    </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <EngageBtn label="Sponsor an Event" href={"/donate/sponsor"} />
                {!isAuthenticated && <EngageBtn label="Become a Member" href={"/join-us"} />}
                {isAuthenticated && <EngageBtn label="Monthly Contribution" href={"/donate/member_contribution"} />}
                <EngageBtn label="Donate for a Cause" href={"/donate/cause"} />
            </div>
            </div>
        </section>
    );
}

export default Participation;

