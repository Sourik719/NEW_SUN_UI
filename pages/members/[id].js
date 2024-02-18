import ProfileFields from '@/components/profile/Fields';
import ProfileImage from '@/components/profile/profileImage';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { bloodGroupOptions, genderOptions } from '@/data/registration';
import { useAsync } from '@/hooks/use-async';
import { useHttp } from '@/hooks/use-http';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const profile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
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


    if (!user || isLoading) {
        return (<Loader />);
    }
    if (user) {
        return (
            <Container className="bg-slate-200 min-h-screen flex flex-col justify-center items-center py-5">
                <Head>
                    <title>Profile</title>
                </Head>

                <div className="relative w-[500px] bg-white rounded-md shadow-md ">
                    <div className="absolute w-full h-full pointer-events-none">
                        <Image
                            src={"/profile_background.svg"}
                            alt="Background"
                            width={1920}
                            height={1080}
                            objectFit="cover"
                            className="rounded-xl"
                        />
                    </div>

                    <div className='px-8 py-6'>
                        <ProfileImage value={user.image} fieldName="image" gender={user.sex} />
                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-1/2">
                                <ProfileFields value={user.firstname} label="First Name" dataType="Text" editAble={true} id={id} fieldName="firstname" />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <ProfileFields value={user.lastname} label="Last Name" dataType="Text" editAble={true} id={id} fieldName="lastname" />
                            </div>
                        </div>
                        <ProfileFields value={user.email} label="Email" dataType="Text" editAble={false} id={id} fieldName="email" />
                        <ProfileFields value={user.address} label="Address" dataType="Text" editAble={true} id={id} fieldName="address" />
                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-1/2 ">
                                <ProfileFields value={user.phone} label="Phone No." dataType="text" editAble={true} id={id} fieldName="phone" />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <ProfileFields value={user.dob} label="D.O.B" dataType="Date" editAble={true} id={id} fieldName="dob" />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-1/2 ">
                                <ProfileFields value={user.sex} label="Gender" dataType="Select" editAble={true} options={genderOptions} id={id} fieldName="sex" />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <ProfileFields value={user.bloodGroup} label="Blood Group" dataType="Select" editAble={true} options={bloodGroupOptions} id={id} fieldName="bloodGroup" />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-1/2">
                                <ProfileFields value="7" label="Due" dataType="Number" editAble={false} id={id} fieldName="due" />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <ProfileFields value={user.status} label="Membership Status" dataType="Text" editAble={false} id={id} fieldName="status" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default profile;