import { useState } from "react"
import { Roboto } from "next/font/google"

import Image from "next/image"

const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const ImageField = ({ onChange }) => {
    const [uploadState, setUploadState] = useState(false)
    const [imageURL, setImageURL] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setUploadState(!uploadState)
        const url = URL.createObjectURL(file)
        setImageURL(url)
        onChange(url)
    }

    const handleUpload = () => setUploadState(true)

    return (<div className="p-3 m-2">
        <div className="group bg-white relative flex justify-center items-end w-40 h-40 rounded-full overflow-hidden" onClick={handleUpload}>
            <Image
                src={imageURL || "/blank.png"}
                alt="Your Picture"
                layout="fill"
            />
            <span className={`${roboto.className} text-xs pb-4 group-hover:scale-110 transition-transform duration-200`}>+ Add photo</span>
            {uploadState &&
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute z-10 inset-0 opacity-0 cursor-pointer w-full h-full"
                />}
        </div>
    </div>)
}

export default ImageField