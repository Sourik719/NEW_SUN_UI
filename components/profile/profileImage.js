import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch } from "react-redux";
import blank from "../../public/blank.png";
import female_blank from "../../public/female_blank.jpg";
import male_blank from "../../public/male_blank.jpg";

const ProfileImage = ({ label, value, gender, id, editAble }) => {
    const [uploadState, setUploadState] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(value ? value : null);
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();
    const router = useRouter();
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSizeKB = 5000;
            const maxSizeBytes = maxSizeKB * 1024;
            if (file.size > maxSizeBytes) {
                dispatch(notificationActions.setNotification(
                    { message: "File size more than limit. Please upload a smaller file." }
                ));
                return;

            }
            setSelectedFile(file);
            setPreviewURL(URL.createObjectURL(file));
            setIsEditing(true);
        }
    };

    const handleUpdate = catchAsync(async () => {
        setIsEditing(false);
        if (selectedFile) {
            const updateData = new FormData();
            updateData.append("image", selectedFile);
            setUploadState(false);
            const responseData = await httpRequest(`/members/${id}/image`, 'PUT', updateData, true);
            if (responseData) {
                setPreviewURL(responseData.data?.member?.image?.url);
                dispatch(notificationActions.setNotification({
                    message: responseData.message
                }));
                router.reload();
            }
        } else {
            dispatch(notificationActions.setNotification({
                message: 'No new image selected.'
            }));
        }
    });

    const handleCancelEdit = () => {
        setSelectedFile(null);
        setPreviewURL(value);
        setIsEditing(false);
    };

    const handleMouseEnter = () => {
        setUploadState(true);
    };

    const handleMouseLeave = () => {
        setUploadState(false);
    };


    return (
        <div className="mb-4">
            {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
            <div className="relative group w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300 hover:border-indigo-500 transition-all duration-200 shadow-md" onMouseEnter={editAble ? handleMouseEnter :null} onMouseLeave={handleMouseLeave}>
                {(uploadState || isEditing) && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-gray-100 z-50 cursor-pointer transition-opacity duration-200">
                        {!isEditing ? (
                            <div className="flex items-center justify-center text-lg">
                                <FaCamera className="mr-2" />
                                <span className="hidden sm:inline">Change</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-100"
                                    id="image-upload"
                                    ref={fileInputRef}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2">
                                    <FaCamera className="mr-2" />
                                    <span>New Image</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded text-sm focus:outline-none focus:shadow-outline"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded text-sm focus:outline-none focus:shadow-outline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {previewURL ? (
                    <Image
                        src={previewURL}
                        alt="Profile Preview"
                        className="w-full h-full object-cover transition-opacity duration-300"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                ) : (
                    <Image
                        src={gender === "Male" ? male_blank : (gender === "Female" ? female_blank : blank)}
                        alt="Default Profile"
                        className="w-full h-full object-cover blur-sm transition-blur duration-300"
                        width={160}
                        height={160}
                        priority
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