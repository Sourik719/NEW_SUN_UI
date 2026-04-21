const MemberTable = ({ data = [], calculateDueMonths }) => {
    return (
        <table className="w-full border bg-white">
            <thead className="bg-gray-200">
                <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Joined</th>
                    <th className="p-2 border">Blood</th>
                    <th className="p-2 border">Gender</th>
                    <th className="p-2 border">Due</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item) => (
                    <tr key={item._id} className="text-center">
                        <td className="p-2 border">
                            {item.firstname} {item.lastname}
                        </td>

                        <td className="p-2 border">{item.email}</td>

                        <td className="p-2 border">{item.phone}</td>

                        <td className="p-2 border">
                            {new Date(item.joinedOn).toLocaleDateString('en-IN')}
                        </td>

                        <td className="p-2 border">{item.bloodGroup}</td>

                        <td className="p-2 border">{item.sex}</td>

                        <td className="p-2 border">
                            {(() => {
                                const due = calculateDueMonths(item.lastContributionOn);
                                return due === 0 ? 'No Due' : `${due} month(s)`;
                            })()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MemberTable;