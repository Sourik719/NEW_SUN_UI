import ProfileFields from '@/components/profile/Fields';
import ProfileImage from '@/components/profile/profileImage';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { bloodGroupOptions, genderOptions } from '@/data/registration';
import { useHttp } from '@/hooks/use-http';
import { notificationActions } from '@/store/notification-slice';
import { userActions } from '@/store/user-slice';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const profile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [httpRequest, isLoading] = useHttp();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }
                dispatch(userActions.setToken(token));
                if (id != undefined) {
                    const userDetails = await httpRequest(`/users/${id}`, 'GET', null);
                    setUser(userDetails.user);
                }
            } catch (error) {
                console.error('Error fetching user details:', error.message);
                dispatch(notificationActions.setNotification({
                    type: 'error',
                    message: error.message
                }));
            }
        };
        fetchData();
    }, [id]);

    if (!user || isLoading) {
        return <Loader />;
    }
    if (user) {
        return (
            <Container className="bg-slate-200 min-h-screen w-full flex flex-col justify-center items-center" >
                <Head>
                    <title>Profile</title>
                </Head>
                <div className='relative w-[500px] xs:w-full flex flex-col bg-white items-center rounded-xl shadow-sm shadow-gray-600  mx-1 text-black border-2'>
                    <ProfileImage value={user.image} fieldName="image" gender={user.sex} />
                    <div className='flex flex-row justify-content w-5/6'>
                        <ProfileFields value={user.firstname} label="First Name" dataType="Text" editAble={true} id={id} fieldName="firstname" />
                        <ProfileFields value={user.lastname} label="Last Name" dataType="Text" editAble={true} id={id} fieldName="lastname" />
                    </div>
                    <ProfileFields value={user.email} label="Email" dataType="Text" editAble={false} id={id} fieldName="email" />
                    <ProfileFields value={user.address} label="Address" dataType="Text" editAble={true} id={id} fieldName="address" />
                    <div className='flex flex-row justify-end w-5/6'>
                        <ProfileFields value={user.phone} label="Phone No." dataType="text" editAble={true} id={id} fieldName="phone" />
                        <ProfileFields value={user.dob} label="D.O.B" dataType="Date" editAble={true} id={id} fieldName="dob" />
                    </div>
                    <div className='flex flex-row justify-end w-5/6'>
                        <ProfileFields value={user.sex} label="Gender" dataType="Select" editAble={true} options={genderOptions} id={id} fieldName="sex" />
                        <ProfileFields value={user.bloodGroup} label="Blood Group" dataType="Select" editAble={true} options={bloodGroupOptions} id={id} fieldName="bloodGroup" />
                    </div>
                    <div className='flex flex-row justify-end w-5/6'>
                        <ProfileFields value="7" label="Due" dataType="Number" editAble={false} id={id} fieldName="due" />
                        <ProfileFields value={user.status} label="Membership Status" dataType="Text" editAble={false} id={id} fieldName="status" />
                    </div>
                </div>

            </Container>
        )
    }
}

export default profile;