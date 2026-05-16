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
        <table className="w-full min-w-[720px] bg-white text-sm">
            <thead className="bg-slate-950 text-white">
                <tr>
                    <th className="p-3 text-left">Member</th>
                    <th className="p-3 text-left">Contribution For</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Payment Date</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx} className="border-b border-stone-200 text-left hover:bg-orange-50">
                        <td className="p-3 font-semibold text-slate-900">
                            {item.memberName || '-'}
                        </td>

                        <td className="p-3 font-medium">
                            {getContributionRange(item.startDate, item.endDate)}
                        </td>

                        <td className="p-3 font-semibold">
                            ₹{item.amount}
                        </td>

                        <td className="p-3">
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
