const ContributionTable = ({ data = [] }) => {

    const formatMonthYear = (date) =>
        new Date(date).toLocaleDateString('en-IN', {
            month: 'short',
            year: 'numeric'
        });

    const getContributionRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear()
        ) {
            return formatMonthYear(start);
        }

        return `${formatMonthYear(start)} - ${formatMonthYear(end)}`;
    };

    return (
        <table className="w-full border bg-white">
            <thead className="bg-gray-200">
                <tr>
                    <th className="p-2 border">Member</th>
                    <th className="p-2 border">Contribution For</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Payment Date</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx} className="text-center">
                        <td className="p-2 border">
                            {item.memberName || '-'}
                        </td>

                        <td className="p-2 border font-medium">
                            {getContributionRange(item.startDate, item.endDate)}
                        </td>

                        <td className="p-2 border font-semibold">
                            ₹{item.amount}
                        </td>

                        <td className="p-2 border">
                            {item.contributedOn
                                ? new Date(item.contributedOn).toLocaleDateString('en-IN')
                                : '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ContributionTable;