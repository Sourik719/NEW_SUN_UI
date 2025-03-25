import Contribution from '@/components/profile/Contridetails';
import Profile from '@/components/profile/Profile';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { useAsync } from '@/hooks/use-async';
import { useHttp } from '@/hooks/use-http';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const profile = () => {
    const router = useRouter();
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
        const fetchData = async () => {
            const MembercontriDetails = await httpRequest(`/contributions`, 'GET', null);
            console.log(MembercontriDetails);
            setContriData(MembercontriDetails.data);
        }
        catchAsync(fetchData)();
    }, []);

    useEffect(() => {
        if (contriData) {
            setDue(contriData.due.length);
        } else {
            setDue(null);
        }
    }, [contriData]);


    if (!user || isLoading) {
        return (<Loader />);
    }
    if (user) {
        return (
            <Container className="relative bg-slate-200 min-h-screen flex lg:flex-row flex-col justify-center items-center py-5">
                <Head>
                    <title>Profile</title>
                </Head>
                <Profile user={user} id={id} due={due} />

                <Contribution data={contriData ? contriData : null} />

            </Container>
        )
    }
}

export default profile;