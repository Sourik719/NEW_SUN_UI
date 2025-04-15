import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FaCamera, FaTrashCan, FaUpload, FaXmark } from "react-icons/fa6";
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
                    { type: "error", message: "File size more than limit. Please upload a smaller file." }
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
            const responseData = await httpRequest(`/members/${id}/image`, 'PUT', updateData, true);
            if (responseData) {
                setPreviewURL(responseData.data?.member?.image?.url);
                dispatch(notificationActions.setNotification({
                    message: responseData.message
                }));
                router.reload();
            }
        }
    });
    const handleDeleteImage = catchAsync(async () => {
        const updateData = new FormData();
        updateData.append("image", null);
        const responseData = await httpRequest(`/members/${id}/image`, 'PUT', updateData, true);
        if (responseData) {
            setPreviewURL(responseData.data?.member?.image?.url);
            dispatch(notificationActions.setNotification({
                message: responseData.message
            }));
            router.reload();
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
            <div className="relative group w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300 hover:border-indigo-500 transition-all duration-200 shadow-md" onMouseEnter={editAble ? handleMouseEnter : null} onMouseLeave={handleMouseLeave}>
                {(uploadState || isEditing) && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-gray-100 z-50  transition-opacity duration-200">
                        {!isEditing ? <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-col ">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded text-sm focus:outline-none focus:shadow-outline my-2"
                                    disabled={isLoading}
                                >
                                    <div className="flex flex-row items-center justify-center"><FaCamera /> <span className="text-sm inline m-0.5"> Change</span></div>
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="image-upload"
                                    ref={fileInputRef}
                                />
                                {previewURL && <button
                                    onClick={handleDeleteImage}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded text-sm focus:outline-none focus:shadow-outline my-2"
                                    disabled={isLoading}
                                >
                                    <div className="flex flex-row items-center justify-center"><FaTrashCan /> <span className="text-sm inline m-0.5"> Delete</span></div>
                                </button>}
                            </div>
                        </div> : (
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex flex-col">
                                    <button
                                        onClick={handleUpdate}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded text-sm focus:outline-none focus:shadow-outline my-2"
                                    >
                                        <div className="flex flex-row items-center justify-center"><FaUpload /> <span className="text-sm inline m-0.5"> Upload</span></div>
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded text-sm focus:outline-none focus:shadow-outline my-2"
                                    >
                                        <div className="flex flex-row items-center justify-center"><FaXmark /> <span className="text-sm inline m-0.5"> Cancel </span></div>
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
                        width={160}
                        height={160}
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
        </div >
    );
};

export default ProfileImage;