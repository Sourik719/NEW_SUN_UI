import Contribution from '@/components/profile/Contridetails';
import Profile from '@/components/profile/Profile';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { useAsync } from '@/hooks/use-async';
import { useAuth } from '@/hooks/use-auth';
import { useHttp } from '@/hooks/use-http';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const profile = () => {
    const router = useRouter();
    const [isAuthenticated, isAuthLoading] = useAuth();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [due, setDue] = useState(null);
    const [contriData, setContriData] = useState(null);
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();

    useEffect(() => {
        const fetchData = async () => {
            if (id != undefined) {
                const userDetails = await httpRequest(`/members/${id}`, 'GET', null);
                setUser(userDetails.data.member);
            }
        }
        catchAsync(fetchData)();
    }, [id]);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                const MembercontriDetails = await httpRequest(`/contributions`, 'GET', null);
                setContriData(MembercontriDetails.data);
            }
            catchAsync(fetchData)();
        }
    }, [isAuthenticated]);



    if (!user || isLoading) {
        return (<Loader fullPage label="Loading profile" />);
    }
    if (user) {
        return (
            <Container className="relative min-h-screen bg-stone-50 px-5 py-16 sm:px-8">
                <Head>
                    <title>{`${user.firstname} ${user.lastname}`} | Team New Sun Foundation</title>
                </Head>
                <main className="mx-auto flex max-w-7xl flex-col items-start justify-center gap-6 lg:flex-row">
                    <Profile user={user} id={id} due={isAuthenticated ? contriData?.due?.length || 0 : "Not Available"} isAuthenticated={isAuthenticated} />
                    {isAuthenticated && <Contribution data={contriData ? contriData : null} />}
                </main>

            </Container>
        )
    }
}

export default profile;
