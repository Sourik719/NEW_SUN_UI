import { bloodGroupOptions, genderOptions } from "@/data/registration";
import ProfileFields from "./Profilefields";
import ProfileImage from "./Profileimage";

const Profile = ({ user, id, due, isAuthenticated }) => {
    const memberName = `${user.firstname} ${user.lastname}`;
    const isActive = user.status === 'active';

    return (
        <section className="w-full overflow-hidden rounded-md border border-stone-200 bg-white shadow-xl lg:w-1/2">
            <div className="border-b border-stone-100 bg-slate-950 px-6 py-6 text-white sm:px-8">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Member Profile</p>
                <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
                    <ProfileImage value={user.image?.url} fieldName="image" gender={user.sex} id={id} editAble={isAuthenticated} />
                    <div className="min-w-0 flex-1">
                        <h1 className="text-3xl font-extrabold leading-tight">{memberName}</h1>
                        <p className="mt-2 break-words text-sm font-medium text-stone-300">{user.email}</p>
                        <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-bold ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {isActive ? 'Active member' : 'Inactive member'}
                        </span>
                    </div>
                </div>
            </div>

            <div className='px-5 py-6 sm:px-8'>
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-950">Profile Details</h2>
                        <p className="mt-1 text-sm text-slate-500">Personal and membership information linked to this account.</p>
                    </div>
                </div>

                <div className="rounded-md border border-stone-200 bg-stone-50 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-orange-600">Personal Information</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <ProfileFields value={user.firstname} label="First Name" dataType="Text" editAble={isAuthenticated} id={id} fieldName="firstname" />
                        <ProfileFields value={user.lastname} label="Last Name" dataType="Text" editAble={isAuthenticated} id={id} fieldName="lastname" />
                        <div className="sm:col-span-2">
                            <ProfileFields value={user.email} label="Email" dataType="Text" editAble={false} id={id} fieldName="email" />
                        </div>
                        <div className="sm:col-span-2">
                            <ProfileFields value={user.address} label="Address" dataType="Text" editAble={isAuthenticated} id={id} fieldName="address" />
                        </div>
                        <ProfileFields value={user.phone} label="Phone Number" dataType="Text" editAble={isAuthenticated} id={id} fieldName="phone" />
                        <ProfileFields value={user.dob} label="Date of Birth" dataType="date" editAble={isAuthenticated} id={id} fieldName="dob" />
                        <ProfileFields value={user.sex} label="Gender" dataType="Select" editAble={isAuthenticated} options={genderOptions} id={id} fieldName="sex" />
                        <ProfileFields value={user.bloodGroup || "Not selected"} label="Blood Group" dataType="Select" editAble={isAuthenticated} options={bloodGroupOptions} id={id} fieldName="bloodGroup" />
                    </div>
                </div>

                <div className="mt-4 rounded-md border border-stone-200 bg-stone-50 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-orange-600">Membership</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <ProfileFields value={due} label="Due" dataType={isAuthenticated ? "Number" : "text"} editAble={false} id={id} fieldName="due" />
                        <ProfileFields value={isActive ? "Active" : "Inactive"} label="Membership Status" dataType="text" editAble={false} id={id} fieldName="status" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
