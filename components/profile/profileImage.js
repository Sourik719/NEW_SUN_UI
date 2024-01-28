import Image from "next/image";
import { useState } from "react";
import blank from "../../public/blank.jpeg";
import female_blank from "../../public/female_blank.jpg";
import male_blank from "../../public/male_blank.jpg";


const ProfileImage = ({ label, value, gender }) => {
    const [uploadState, setUploadState] = useState(false);
    const [imageURL, setImageURL] = useState(value ? value : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUploadState(false);
        const url = URL.createObjectURL(file);
        setImageURL(url);
    };

    return (
        <div className="mb-2 mt-2">
            <div className="relative group w-40 h-40 rounded-full overflow-hidden border-2 border-black cursor-pointer"
                onMouseEnter={() => setUploadState(true)}
                onMouseLeave={() => setUploadState(false)}>
                {uploadState && <label className="absolute w-full h-full bg-black bg-opacity-60 flex items-center justify-center text-gray-200 z-50">
                    Edit
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-100"
                        id="image-upload"
                    />
                </label>}
                {imageURL === null ? (
                    <Image
                        src={gender === "Male" ? male_blank : (gender === "Female" ? female_blank : blank)}
                        alt="Selected"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Image
                        src={imageURL}
                        alt="Selected"
                        layout="fill"
                        className="w-full h-full object-cover"
                    />
                )}


            </div>

        </div>

    );
};

export default ProfileImage;
