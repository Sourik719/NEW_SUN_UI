import { useDispatch } from "react-redux"

import Image from "next/image"

const ImageField = ({ value, actionCreator }) => {
    const dispatch = useDispatch()
    const imageChangeHandler = e => {
        if (!e.target.files.length) return
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        dispatch(actionCreator(url))
    }

    return (<div className="p-3 m-2">
        <div className="group bg-white relative flex justify-center items-end w-40 h-40 rounded-full overflow-hidden">
            <Image
                src={value || "/blank.png"}
                alt="Your Picture"
                width={100}
                height={100}
                className="w-full h-full"
            />
            <span className="bg-white absolute text-xs opacity-0 group-hover:opacity-100 transition-all duration-100 p-1 mb-4 rounded-md">
                {value ? "Change Photo" : "Add Photo"}
            </span>
            <input
                type="file"
                accept="image/*"
                onChange={imageChangeHandler}
                className="bg-red-400 absolute opacity-0 z-10 w-full h-full cursor-pointer rounded-full"
            />
        </div>
    </div>)
}

export default ImageField