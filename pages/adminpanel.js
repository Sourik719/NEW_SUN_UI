import ContributionTable from '@/components/adminpanel/ContributionTable';
import DonationTable from '@/components/adminpanel/DonationTable';
import MemberTable from '@/components/adminpanel/MemberTable';
import Container from '@/components/ui/Container';
import { useAsync } from '@/hooks/use-async';
import { useAuth } from '@/hooks/use-auth';
import { useHttp } from '@/hooks/use-http';
import Head from 'next/head';
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
        <Container className="min-h-screen bg-stone-50 px-5 py-16 sm:px-8">
            <Head>
                <title>Admin Panel | Team New Sun Foundation</title>
            </Head>
            {!isAdmin ? (
                <main className="mx-auto max-w-3xl rounded-md border border-stone-200 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-3xl font-extrabold text-slate-950">You do not have access to this page.</h1>
                </main>
            ) : (
                <main className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Operations</p>
                        <h1 className="mt-3 text-4xl font-extrabold text-slate-950">Admin Panel</h1>
                    </div>

                    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={() => handleLoad('/admin/allMember')}
                            className={`rounded-md px-5 py-3 font-bold transition ${endpoint === '/admin/allMember' ? 'bg-orange-600 text-white' : 'border border-stone-300 bg-white text-slate-800 hover:bg-stone-100'}`}
                        >
                            Members
                        </button>

                        <button
                            onClick={() => handleLoad('/admin/allDonation')}
                            className={`rounded-md px-5 py-3 font-bold transition ${endpoint === '/admin/allDonation' ? 'bg-orange-600 text-white' : 'border border-stone-300 bg-white text-slate-800 hover:bg-stone-100'}`}
                        >
                            Donations
                        </button>

                        <button
                            onClick={() => handleLoad('/admin/allContribution')}
                            className={`rounded-md px-5 py-3 font-bold transition ${endpoint === '/admin/allContribution' ? 'bg-orange-600 text-white' : 'border border-stone-300 bg-white text-slate-800 hover:bg-stone-100'}`}
                        >
                            Contributions
                        </button>
                    </div>

                    <div className="mb-4 flex items-center gap-3 rounded-md border border-stone-200 bg-white p-4 shadow-sm">
                        <label className="font-bold text-slate-700">Show top:</label>
                        <select
                            className="rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
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
                    {loading && <p className="rounded-md bg-white py-6 text-center font-semibold text-slate-700 shadow-sm">Loading records...</p>}

                    {!loading && (
                        <div className="overflow-x-auto rounded-md border border-stone-200 bg-white shadow-sm">
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
                                <p className="text-center py-8 font-semibold text-slate-600">No records to show yet.</p>
                            )}
                        </div>
                    )}

                    {pagination && !loading && (
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <button
                                onClick={() => setPage((p) => p - 1)}
                                disabled={page === 1}
                                className="rounded-md border border-stone-300 bg-white px-4 py-2 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <span className="font-semibold text-slate-700">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>

                            <button
                                onClick={() => setPage((p) => p + 1)}
                                disabled={page === pagination.totalPages}
                                className="rounded-md border border-stone-300 bg-white px-4 py-2 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>
            )}
        </Container>
    );
};

export default AdminPanel;
