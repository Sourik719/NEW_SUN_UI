import ProfileFields from '@/components/profile/Fields';
import ProfileImage from '@/components/profile/profileImage';
import { useHttp } from '@/hooks/use-http';
import bloodGroupoptions from '@/options/bloodGrpOptions';
import genderOptions from '@/options/genderoptions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const profile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [httpRequest] = useHttp();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetails = await httpRequest(`/users/${id}`, 'GET', null);
                console.log(userDetails.user);
                setUser(userDetails.user);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };
        fetchData();
    }, [id]);

    if (user) {
        return (
            <div className='flex flex-col justify-end items-center'>
                <div className='bg-white sm:w-2/3 lg:w-1/2  flex flex-col items-center my-5 mx-1 text-black border-2 rounded-md'>
                    <ProfileImage />
                    <div className='flex flex-row justify-content w-5/6'>
                        <ProfileFields value={user.firstname} label="First Name" dataType="Text" editAble={true} id={id} fieldName="firstname" />
                        <ProfileFields value={user.lastname} label="Last Name" dataType="Text" editAble={true} id={id} fieldName="lastname" />
                    </div>
                    <ProfileFields value={user.email} label="Email" dataType="Text" editAble={false} id={id} fieldName="email" />
                    <ProfileFields value="2/A,Degree College Road" label="Address" dataType="Text" editAble={true} id={id} fieldName="address" />
                    <div className='flex flex-row justify-end w-5/6'>
                        <ProfileFields value={user.phone} label="Phone No." dataType="text" editAble={true} id={id} fieldName="phone" />
                        <ProfileFields value={user.dob} label="D.O.B" dataType="Date" editAble={true} id={id} fieldName="dob" />
                    </div>
                    <div className='flex flex-row justify-end w-5/6'>
                        <ProfileFields value={user.sex} label="Gender" dataType="Select" editAble={true} options={genderOptions} id={id} fieldName="sex" />
                        <ProfileFields value={user.bloodGroup} label="Blood Group" dataType="Select" editAble={true} options={bloodGroupoptions} id={id} fieldName="bloodGroup" />
                    </div>
                    <div className='flex flex-row justify-end w-5/6'>
                        <ProfileFields value="7" label="Due" dataType="Number" editAble={false} id={id} fieldName="due" />
                        <ProfileFields value={user.status} label="Membership Status" dataType="Text" editAble={false} id={id} fieldName="status" />
                    </div>
                </div>
            </div>
        )
    }
}

export default profile;