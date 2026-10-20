import { formatDate } from "@/utils/date";

const MemberTable = ({ data = [], calculateDueMonths }) => {
    return (
        <table className="w-full min-w-[900px] bg-white text-sm">
            <thead className="bg-slate-950 text-white">
                <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Joined</th>
                    <th className="p-3 text-left">Blood</th>
                    <th className="p-3 text-left">Gender</th>
                    <th className="p-3 text-left">Due</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item) => (
                    <tr key={item._id} className="border-b border-stone-200 text-left hover:bg-orange-50">
                        <td className="p-3 font-semibold text-slate-900">
                            {item.firstname} {item.lastname}
                        </td>

                        <td className="p-3">{item.email}</td>

                        <td className="p-3">{item.phone}</td>

                        <td className="p-3">
                            {formatDate(item.joinedOn)}
                        </td>

                        <td className="p-3">{item.bloodGroup}</td>

                        <td className="p-3">{item.sex}</td>

                        <td className="p-3">
                            {(() => {
                                const due = calculateDueMonths(item.lastContributionOn);
                                return due === 0 ? 'Up to date' : `${due} ${due === 1 ? 'month' : 'months'} due`;
                            })()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MemberTable;
