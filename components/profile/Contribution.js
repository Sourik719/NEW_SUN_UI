import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { useEffect } from "react";
const Contribution = () => {
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();

    useEffect(() => {
        const fetchData = async () => {
            const userContriDetails = await httpRequest(`/contributions`, 'GET', null);
            console.log(userContriDetails);
        }
        catchAsync(fetchData)();
    }, []);

    return (
        <div className="w-full px-3 py-3 flex flex-col border bg-gray-600 rounded-md">
            <h2>Recent Contributions</h2>

        </div>
    )
}

export default Contribution