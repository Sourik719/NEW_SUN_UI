import Image from "next/image";
import { useEffect, useState } from "react";
import blank from "../../public/blank.jpeg";
import female_blank from "../../public/female_blank.jpg";
import male_blank from "../../public/male_blank.jpg";

const ProfileImage = ({ label, value, gender }) => {
    const [uploadState, setUploadState] = useState(false);
    const [genderuser, setGenderuser] = useState(gender);
    const [imageURL, setImageURL] = useState(value ? value : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUploadState(!uploadState);
        const url = URL.createObjectURL(file);
        setImageURL(url);
    };
    const handleUpload = () => {
        setUploadState(true);
    };
    useEffect(() => {
        console.log("ProfileImage:" + imageURL);
    }, [imageURL]);

    useEffect(() => {
        setGenderuser(gender);
    }, gender);
    return (
        <div className="mb-2 mt-2">
            <div className="relative mt-1">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-black" onClick={handleUpload}>
                    {imageURL === null ? (
                        <Image
                            src={genderuser === "Male" ? male_blank : (genderuser === "Female" ? female_blank : blank)}
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

                    {uploadState && (<input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        onClick={() => console.log("Clicked")}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        id="image-upload"
                    />
                    )}
                </div>

            </div>
        </div>

    );
};

export default ProfileImage;
