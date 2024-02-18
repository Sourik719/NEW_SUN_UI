import { useState, forwardRef } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Input = forwardRef(({ label, onChange, hidden = false }, ref) => {
    const [isShowed, setShowed] = useState(false)
    const toggleHandler = () => setShowed(isShowed => !isShowed)
    const changeHandler = e => {
        onChange(label.toLowerCase(), e.target.value.trim())
    }

    return (<div className="flex relative w-full px-5 mb-2">
        {ref.current && ref.current.value.trim() &&
            <label className="pr-5 py-2 mb-2">{label}</label>
        }
        <div className="w-full relative flex items-center">
            <input
                ref={ref}
                onChange={changeHandler}
                placeholder={label}
                type={hidden && !isShowed ? "password" : "text"}
                className="w-full border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-300 py-2 mb-2"
            />
            {hidden &&
                <button className="text-gray-400 absolute right-2" onClick={toggleHandler}>
                    {isShowed ? <FaEye /> : <FaEyeSlash />}
                </button>
            }
        </div>
    </div>)
})

export default Input