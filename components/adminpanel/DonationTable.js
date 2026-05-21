import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/currency";

const DonationTable = ({ data = [] }) => {
    return (
        <table className="w-full min-w-[950px] bg-white text-sm">
            <thead className="bg-slate-950 text-white">
                <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Purpose</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Payment Date</th>
                    <th className="p-3 text-left">Payment ID</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx} className="border-b border-stone-200 text-left hover:bg-orange-50">
                        <td className="p-3 font-semibold text-slate-900">{item.name}</td>

                        <td className="p-3">{item.email}</td>

                        <td className="p-3">{item.phone}</td>

                        <td className="p-3">
                            {item.subjectedTo || '-'}
                        </td>

                        <td className="p-3 font-semibold">
                            {formatCurrency(item.amount)}
                        </td>

                        <td className="p-3">
                            {item.paymentDate
                                ? formatDate(item.paymentDate)
                                : '-'}
                        </td>

                        <td className="break-all p-3 text-xs">
                            {item.paymentId || '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DonationTable;
