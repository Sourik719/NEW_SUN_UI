import Link from "next/link";
import { formatDate, formatDateRange } from "@/utils/date";
import { formatCurrency } from "@/utils/currency";
import Loader from "../ui/Loader";
const Contribution = ({ data }) => {

    const completedContributions = data?.contributions?.filter(contribution => contribution.payment?.status === 'completed') || [];

    return (

        <aside className="flex w-full flex-col rounded-md border border-stone-200 bg-white shadow-xl lg:w-[500px]">
            <div className="border-b border-stone-100 px-5 py-5">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Account</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Recent Contributions</h2>
                <p className="mt-1 text-sm text-slate-500">Completed member contributions from your account.</p>
            </div>
            {!data && <Loader />}
            {data && <div className="flex w-full flex-col">
                <div className="hidden grid-cols-[1fr_1.2fr_0.9fr] border-b border-stone-200 bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white sm:grid">
                    <div>Paid On</div>
                    <div>Contribution For</div>
                    <div className="text-right">Amount</div>
                </div>
                <div className="divide-y divide-stone-100">
                    {completedContributions.map((contribution) => (
                        <div className="grid gap-3 px-5 py-4 text-sm sm:grid-cols-[1fr_1.2fr_0.9fr] sm:items-center" key={contribution._id || contribution.startDate} >
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400 sm:hidden">Paid On</p>
                                <p className="font-semibold text-slate-800">{formatDate(contribution.contributedOn)}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400 sm:hidden">Contribution For</p>
                                <p className="font-semibold text-slate-800">{formatDateRange(contribution.startDate, contribution.endDate)}</p>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400 sm:hidden">Amount</p>
                                <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 font-extrabold text-orange-700">{formatCurrency(contribution.amount)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {completedContributions.length === 0 && <div className="w-full px-5 py-8 text-center text-slate-600">You do not have any completed contributions yet.</div>}
                <div className="mx-5 mt-2 flex flex-row items-center justify-between rounded-md bg-orange-50 px-4 py-4 text-lg font-bold text-slate-900">
                    Total Contribution
                    <span className="text-xl text-orange-700">{formatCurrency(data.totalAmount)}</span>
                </div>
                <Link className="mx-5 my-5 rounded-md bg-orange-600 p-3 text-center text-lg font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700" href="../donate/member_contribution">Pay Contribution</Link>
            </div>}


        </aside >
    )
}

export default Contribution
