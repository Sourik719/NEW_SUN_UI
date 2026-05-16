import Link from "next/link";
import Loader from "../ui/Loader";
const Contribution = ({ data }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getMonth = (dateString) => {
        const date = new Date(dateString);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const monthName = monthNames[monthIndex];
        return `${monthName},${year}`;
    }
    return (

        <aside className="flex w-full flex-col items-center justify-center rounded-md border border-stone-200 bg-white px-4 py-5 shadow-xl lg:w-[500px]">
            <span className="py-2 text-2xl font-extrabold text-slate-950">Recent Contributions</span>
            {!data && <Loader />}
            {data && <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md border border-stone-200">
                <div className="flex w-full flex-row items-center justify-center bg-slate-950 text-center text-sm font-bold text-white">
                    <div className="p-2 w-1/4 ">Date</div>
                    <div className="p-2 w-1/4 ">Starting Month</div>
                    <div className="p-2 w-1/4 ">Ending Month</div>
                    <div className="p-2 w-1/4 "> Amount</div>
                </div>
                {data.contributions.filter(contribution => contribution.payment?.status === 'completed').map((contribution) => (
                    <div className="flex w-full flex-row items-center justify-center border-b border-stone-200 bg-white p-2 text-center text-sm text-slate-700" key={contribution.startDate} >
                        <div className="px-2 w-1/4 ">{formatDate(contribution.contributedOn)}</div>
                        <div className="px-2 w-1/4">{getMonth(contribution.startDate)}</div>
                        <div className="px-2 w-1/4">{getMonth(contribution.endDate)}</div>
                        <div className="px-2 w-1/4"> {contribution.amount}</div>
                    </div>
                ))}
                {data.contributions.filter(contribution => contribution.payment?.status === 'completed').length == 0 && <div className="w-full p-4 text-center text-lg text-slate-700">No contributions to show at the moment.</div>}
                < h2 className="flex w-full flex-row justify-between bg-orange-50 px-4 py-3 text-lg font-bold text-slate-900">Total Contribution:<span className="px-5 text-xl text-orange-700">{data.totalAmount}</span></h2>
                <Link className="m-3 w-1/2 rounded-md bg-orange-600 p-3 text-center text-lg font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700" href="../donate/member_contribution">Donate now </Link>
            </div>}


        </aside >
    )
}

export default Contribution
