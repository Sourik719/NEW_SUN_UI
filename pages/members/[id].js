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
                console.log(userDetails);
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

    useEffect(() => {
        if (isAuthenticated) {
            setDue(contriData?.due?.length || 0);
        } else {
            setDue("Not Available");
        }
    }, [contriData, isAuthenticated]);


    if (!user || isLoading) {
        return (<Loader />);
    }
    if (user) {
        return (
            <Container className="relative bg-blue-200 min-h-screen flex lg:flex-row flex-col justify-center items-center py-5 ">
                <Head>
                    <title>Profile</title>
                </Head>
                <Profile user={user} id={id} due={due} isAuthenticated={isAuthenticated} />

                {isAuthenticated && <Contribution data={contriData ? contriData : null} />}

            </Container>
        )
    }
}

export default profile;