import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch } from "react-redux";
import blank from "../../public/blank.png";
import female_blank from "../../public/female_blank.jpg";
import male_blank from "../../public/male_blank.jpg";

const ProfileImage = ({ label, value, gender, id }) => {
    const [uploadState, setUploadState] = useState(false);
    const [imageURL, setImageURL] = useState(value ? value : null);
    console.log(imageURL);
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();
    const router = useRouter();
    const dispatch = useDispatch();

    const handleUpdate = catchAsync(async (e) => {
        const file = e.target.files[0];
        setUploadState(false);
        const url = URL.createObjectURL(file);
        const updateData = { "update": { image: url } };

        const responseData = await httpRequest(`/members/${id}`, 'PUT', updateData);
        setImageURL(url);
        console.log(responseData.message);
        if (responseData) {
            router.reload();
            dispatch(notificationActions.setNotification({
                message: responseData.message
            }));
        }
    })

    return (
        <div className="mb-4"> {/* Increased margin for better spacing */}
            {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
            <div className="relative group w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300 hover:border-indigo-500 transition-all duration-200 shadow-md"
                onMouseEnter={() => setUploadState(true)}
                onMouseLeave={() => setUploadState(false)}>
                {uploadState && (
                    <label htmlFor="image-upload" className="absolute w-full h-1/3 bg-black bg-opacity-60 flex items-center justify-center text-gray-100 z-50 bottom-0 text-lg cursor-pointer transition-opacity duration-200">
                        <FaCamera className="mr-2" />
                        <span className="hidden sm:inline">Update</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpdate}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-100"
                            id="image-upload"
                        />
                    </label>
                )}
                {imageURL === null ? (
                    <Image
                        src={gender === "Male" ? male_blank : (gender === "Female" ? female_blank : blank)}
                        alt="Default Profile"
                        className="w-full h-full object-cover blur-sm transition-blur duration-300"
                        width={160}
                        height={160}
                        priority
                    />
                ) : (
                    <Image
                        src={imageURL}
                        alt="Profile"
                        className="w-full h-full object-cover transition-opacity duration-300"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority // Consider if newly uploaded image should have priority
                    />
                )}
                {isLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileImage;