const DonationTable = ({ data = [] }) => {
    return (
        <table className="w-full border bg-white">
            <thead className="bg-gray-200">
                <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Purpose</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Payment Date</th>
                    <th className="p-2 border">Payment ID</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx} className="text-center">
                        <td className="p-2 border">{item.name}</td>

                        <td className="p-2 border">{item.email}</td>

                        <td className="p-2 border">{item.phone}</td>

                        <td className="p-2 border">
                            {item.subjectedTo || '-'}
                        </td>

                        <td className="p-2 border font-semibold">
                            ₹{item.amount}
                        </td>

                        <td className="p-2 border">
                            {item.paymentDate
                                ? new Date(item.paymentDate).toLocaleDateString('en-IN')
                                : '-'}
                        </td>

                        <td className="p-2 border text-xs break-all">
                            {item.paymentId || '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DonationTable;