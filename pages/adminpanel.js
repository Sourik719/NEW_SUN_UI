import ContributionTable from '@/components/adminpanel/ContributionTable';
import DonationTable from '@/components/adminpanel/DonationTable';
import MemberTable from '@/components/adminpanel/MemberTable';
import Container from '@/components/ui/Container';
import { useAsync } from '@/hooks/use-async';
import { useAuth } from '@/hooks/use-auth';
import { useHttp } from '@/hooks/use-http';
import { useEffect, useState } from 'react';

const AdminPanel = () => {
    const [data, setData] = useState([]);
    const [endpoint, setEndpoint] = useState('/admin/allMember');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pagination, setPagination] = useState(null);

    const [isAuthenticated, isAdmin, isAuthLoading] = useAuth();
    const [loading, setLoading] = useState(false);

    const [httpRequest] = useHttp();
    const { catchAsync } = useAsync();

    const fetchData = catchAsync(async (api, currentPage = page) => {
        setLoading(true);

        const res = await httpRequest(
            `${api}?page=${currentPage}&limit=${limit}`,
            'GET'
        );

        // ✅ Handle all endpoints properly
        if (api === "/admin/allMember") {
            setData(res.data.members);
            setPagination(res.data.pagination);
        } else if (api === "/admin/allDonation") {
            setData(res.data.donations);
            setPagination(res.data.pagination);
        } else {
            // ✅ contributions
            setData(res.data.contribution);
            setPagination(res.data.pagination);
        }

        setLoading(false);
    });

    const handleLoad = (api) => {
        setEndpoint(api);
        setPage(1);
        setData([]);
        setPagination(null);
    };

    const calculateDueMonths = (lastContributionOn) => {
        if (!lastContributionOn) return 0;

        const lastDate = new Date(lastContributionOn);
        const now = new Date();

        let months =
            (now.getFullYear() - lastDate.getFullYear()) * 12 +
            (now.getMonth() - lastDate.getMonth());

        if (now.getDate() < lastDate.getDate()) {
            months--;
        }

        return Math.max(months, 0);
    };

    useEffect(() => {
        if (endpoint) {
            fetchData(endpoint, page);
        }
    }, [endpoint, page, limit]);

    return (
        <Container className="p-6 bg-gray-100 min-h-screen">
            {!isAdmin ? (
                <h1>You are not authorized to visit this page.</h1>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => handleLoad('/admin/allMember')}
                            className={endpoint === '/admin/allMember' ? 'btn bg-gray-400 p-2' : 'btn'}
                        >
                            Members
                        </button>

                        <button
                            onClick={() => handleLoad('/admin/allDonation')}
                            className={endpoint === '/admin/allDonation' ? 'btn bg-gray-400 p-2' : 'btn'}
                        >
                            Donations
                        </button>

                        <button
                            onClick={() => handleLoad('/admin/allContribution')}
                            className={endpoint === '/admin/allContribution' ? 'btn bg-gray-400 p-2' : 'btn'}
                        >
                            Contributions
                        </button>
                    </div>

                    {/* ✅ Limit */}
                    <div className="mb-4">
                        <label className="mr-2">Show top:</label>
                        <select
                            value={limit}
                            onChange={(e) => {
                                setLimit(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    {/* ✅ Loading */}
                    {loading && <p className="text-center py-4">Loading...</p>}

                    {/* ✅ Tables */}
                    {!loading && (
                        <div className="overflow-x-auto">
                            {data?.length > 0 ? (
                                endpoint === '/admin/allMember' ? (
                                    // ✅ MEMBER TABLE
                                    <MemberTable
                                        data={data}
                                        calculateDueMonths={calculateDueMonths}
                                    />
                                ) : endpoint === '/admin/allDonation' ? (
                                    // ✅ DONATION TABLE
                                    <DonationTable data={data} />
                                ) : (
                                    // ✅ CONTRIBUTION TABLE
                                    <ContributionTable data={data} />
                                )
                            ) : (
                                <p className="text-center py-4">No records found.</p>
                            )}
                        </div>
                    )}

                    {/* ✅ Pagination */}
                    {pagination && !loading && (
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => setPage((p) => p - 1)}
                                disabled={page === 1}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                Prev
                            </button>

                            <span>
                                Page {pagination.page} of {pagination.totalPages}
                            </span>

                            <button
                                onClick={() => setPage((p) => p + 1)}
                                disabled={page === pagination.totalPages}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
};

export default AdminPanel;