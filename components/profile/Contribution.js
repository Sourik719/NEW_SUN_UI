import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
const Contribution = () => {
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();
    const [contriData, setContriData] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getMonth = (dateString) => {
        const date = new Date(dateString);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const monthName = monthNames[monthIndex];
        return `${monthName},${year}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            const MembercontriDetails = await httpRequest(`/contributions`, 'GET', null);
            setContriData(MembercontriDetails.data);
        }
        catchAsync(fetchData)();
    }, [setContriData]);



    return (
        <div className="sm:w-[500px] w-full px-3 py-3 flex flex-col border bg-slate-500 rounded-md items-center justify-center mx-2 text-blue-200">
            <span className="py-2 text-xl">Recent Contributions</span>
            {!contriData && isLoading && <Loader />}
            {!contriData && !isLoading && <div className="text-xl">No contribution to show.</div>}
            {contriData && <div className="w-full flex flex-col justify-center items-center border rounded-md overflow-hidden ">
                <div className="flex flex-row w-full items-center justify-center text-center border font-semibold">
                    <div className="p-2 w-1/4 ">Date</div>
                    <div className="p-2 w-1/4 ">Starting Month</div>
                    <div className="p-2 w-1/4 ">Ending Month</div>
                    <div className="p-2 w-1/4 "> Amount</div>
                </div>
                {contriData.contributions.map((contribution, index) => (
                    <div className="flex flex-row w-full bg-white p-2 items-center justify-center text-center border text-yellow-600" key={contribution.startDate} >
                        <div className="px-2 w-1/4 ">{formatDate(contribution.contributedOn)}</div>
                        <div className="px-2 w-1/4">{getMonth(contribution.startDate)}</div>
                        <div className="px-2 w-1/4">{getMonth(contribution.endDate)}</div>
                        <div className="px-2 w-1/4"> {contribution.amount}</div>
                    </div>
                ))}
                < h2 className="text-lg bg-green-600 w-full flex flex-row justify-between py-2 px-4 text-gray-700">Total Contribution:<span className="text-xl px-5">{contriData.totalAmount}</span></h2></div>}

        </div >
    )
}

export default Contribution