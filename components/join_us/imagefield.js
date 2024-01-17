import Image from "next/image";
import { useState } from "react";
import blank from "../../public/blank.jpeg";
const ImageField = ({ label, onChange }) => {
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
        <div className="mb-2 mt-2">
            <div className="relative mt-1">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-black" onClick={handleUpload}>
                    {imageURL === null ? (<Image
                        src={blank}
                        alt="Selected"
                        className="w-full h-full object-cover "
                    />) : (
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

export default ImageField;
