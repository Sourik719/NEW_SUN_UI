import { bloodGroupOptions, genderOptions } from "@/data/registration";
import ProfileFields from "./Fields";
import ProfileImage from "./profileImage";

const Profile = ({ user, id, due, isAuthenticated }) => {
    return (
        <div className="sm:w-2/3 lg:w-1/2 bg-white rounded-md shadow-md my-2 mx-5">
            <div className='px-8 py-6'>
                <ProfileImage value={user.image.url} fieldName="image" gender={user.sex} id={id} editAble={isAuthenticated} />
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2">
                        <ProfileFields value={user.firstname} label="First Name" dataType="Text" editAble={isAuthenticated} id={id} fieldName="firstname" />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <ProfileFields value={user.lastname} label="Last Name" dataType="Text" editAble={isAuthenticated} id={id} fieldName="lastname" />
                    </div>
                </div>
                <ProfileFields value={user.email} label="Email" dataType="Text" editAble={false} id={id} fieldName="email" />
                <ProfileFields value={user.address} label="Address" dataType="Text" editAble={isAuthenticated} id={id} fieldName="address" />
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 ">
                        <ProfileFields value={user.phone} label="Phone No." dataType="Text" editAble={isAuthenticated} id={id} fieldName="phone" />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <ProfileFields value={user.dob} label="D.O.B" dataType="Date" editAble={isAuthenticated} id={id} fieldName="dob" />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 ">
                        <ProfileFields value={user.sex} label="Gender" dataType="Select" editAble={isAuthenticated} options={genderOptions} id={id} fieldName="sex" />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <ProfileFields value={user.bloodGroup} label="Blood Group" dataType="Select" editAble={isAuthenticated} options={bloodGroupOptions} id={id} fieldName="bloodGroup" />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2">
                        <ProfileFields value={due} label="Due" dataType={isAuthenticated ? "Number" : "text"} editAble={false} id={id} fieldName="due" />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <ProfileFields value={user.status} label="Membership Status" dataType="text" editAble={false} id={id} fieldName="status" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile