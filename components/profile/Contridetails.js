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

        <div className="sm:w-[500px] w-full px-3 py-3 flex flex-col border bg-slate-900 rounded-md items-center justify-center mx-2 text-blue-200">
            <span className="py-2 text-xl text-brown-400">Recent Contributions</span>
            {!data && <Loader />}
            {data && <div className="w-full flex flex-col justify-center items-center border rounded-md overflow-hidden ">
                <div className="flex flex-row w-full items-center justify-center text-center border font-semibold">
                    <div className="p-2 w-1/4 ">Date</div>
                    <div className="p-2 w-1/4 ">Starting Month</div>
                    <div className="p-2 w-1/4 ">Ending Month</div>
                    <div className="p-2 w-1/4 "> Amount</div>
                </div>
                {data.contributions.map((contribution) => (
                    <div className="flex flex-row w-full bg-white p-2 items-center justify-center text-center border text-yellow-600" key={contribution.startDate} >
                        <div className="px-2 w-1/4 ">{formatDate(contribution.contributedOn)}</div>
                        <div className="px-2 w-1/4">{getMonth(contribution.startDate)}</div>
                        <div className="px-2 w-1/4">{getMonth(contribution.endDate)}</div>
                        <div className="px-2 w-1/4"> {contribution.amount}</div>
                    </div>
                ))}
                {data.contributions.length == 0 && <div className="p-2 text-lg text-center w-full">No contributions to show at the moment.</div>}
                < h2 className="text-lg bg-green-600 w-full flex flex-row justify-between py-2 px-4 text-gray-700">Total Contribution:<span className="text-xl px-5">{data.totalAmount}</span></h2>
                <Link className="text-xl w-1/2 p-2 bg-red-800 text-white text-center rounded-md m-2 shadow-xl" href="../donate/member_contribution">Donate now </Link>
            </div>}


        </div >
    )
}

export default Contribution