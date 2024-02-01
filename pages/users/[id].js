import bloodGroupoptions from '@/components/options/bloodGrpOptions';
import genderOptions from '@/components/options/genderoptions';
import ProfileFields from '@/components/profile/Fields';
import ProfileImage from '@/components/profile/profileImage';
import { useRouter } from 'next/router';
const profile = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div className='flex flex-col justify-end items-center'>
            <div className='bg-white sm:w-2/3 lg:w-1/2  flex flex-col items-center my-5 mx-1 text-black border-2 rounded-md'>
                <ProfileImage />
                <div className='flex flex-row justify-content w-5/6'>
                    <ProfileFields value="Sourik" label="First Name" dataType="Text" editAble={true} />
                    <ProfileFields value="Bhuiya" label="Last Name" dataType="Text" editAble={true} />
                </div>
                <ProfileFields value="sourikbhuiya@gmail.com" label="Email" dataType="Text" editAble={false} />
                <ProfileFields value="2/A,Degree College Road, Belgharia, kol-56" label="Address" dataType="Text" editAble={true} />
                <div className='flex flex-row justify-end w-5/6'>
                    <ProfileFields value="8617790162" label="Phone No." dataType="text" editAble={true} />
                    <ProfileFields value="2003-08-20" label="D.O.B" dataType="Date" editAble={true} />
                </div>
                <div className='flex flex-row justify-end w-5/6'>
                    <ProfileFields value="Male" label="Gender" dataType="Select" editAble={true} options={genderOptions} />
                    <ProfileFields value="AB+" label="Blood Group" dataType="Select" editAble={true} options={bloodGroupoptions} />
                </div>
                <div className='flex flex-row justify-end w-5/6'>
                    <ProfileFields value="7" label="Due" dataType="Number" editAble={false} />
                    <ProfileFields value="Active" label="Membership Status" dataType="Text" editAble={false} />
                </div>
            </div>
        </div>
    )
}

export default profile;