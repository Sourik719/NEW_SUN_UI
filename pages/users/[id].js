import bloodGroupoptions from '@/components/options/bloodGrpOptions';
import genderOptions from '@/components/options/genderoptions';
import ProfileFields from '@/components/profile/Fields';
import { useRouter } from 'next/router';
const profile = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div className='flex flex-col justify-content items-center'>
            <div className='bg-white w-1/2 flex flex-col items-center my-5 text-black border-2 rounded-md'>
                <h1>Profile Page</h1>
                <p>User ID: {id}</p>
                <ProfileFields value="Sourik Bhuiya" label="Name" dataType="Text" editAble={true} />
                <ProfileFields value="sourikbhuiya@gmail.com" label="Email" dataType="Text" editAble={false} />
                <ProfileFields value="2/A,Degree College Road, Belgharia, kol-56" label="Address" dataType="Text" editAble={true} />
                <div className='flex flex-row justify-content w-4/5'>
                    <ProfileFields value="8617790162" label="Phone No." dataType="Number" editAble={true} />
                    <ProfileFields value="20.08.2003" label="D.O.B" dataType="Date" editAble={true} />
                </div>
                <div className='flex flex-row justify-content w-4/5'>
                    <ProfileFields value="Male" label="Gender" dataType="Select" editAble={true} options={genderOptions} />
                    <ProfileFields value="AB+" label="Blood Group" dataType="Select" editAble={true} options={bloodGroupoptions} />
                </div>
                <div className='flex flex-row justify-content w-4/5'>
                    <ProfileFields value="7" label="Due" dataType="Text" editAble={false} />
                    <ProfileFields value="Active" label="Membership Status" dataType="Text" editAble={false} />
                </div>
            </div>
        </div>
    )
}

export default profile;