import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { Roboto } from "next/font/google"
const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const ImageField = ({ onChange }) => {
    const [uploadState, setUploadState] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUploadState(!uploadState);
        const url = URL.createObjectURL(file);
        setImageURL(url);
        onChange(url);

    };

    const handleUpload = () => {
        setUploadState(true);
    };

    return (
        <div className="m-3">
            <div className="relative w-40 h-40 bg-white flex justify-center items-end rounded-full overflow-hidden" onClick={handleUpload}>
                <Image
                    src={imageURL || "/blank.png"}
                    alt="selected"
                    layout="fill"
                />
                <div className={`${roboto.className} text-xs flex items-center absolute z-10 mb-2`}>
                    <FaPlus />
                    <span className="text-sm font-bold px-1">Add</span>
                </div>
                {uploadState &&
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        onClick={() => console.log("Clicked")}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                        id="image-upload"
                    />
                }
            </div>
        </div>
    );
};

export default ImageField;
