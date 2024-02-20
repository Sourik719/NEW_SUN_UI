import { useState, forwardRef } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Input = forwardRef(({ label, onChange, hidden = false }, ref) => {
    const [isShowed, setIsShowed] = useState(false)
    const toggleHandler = () => setIsShowed(isShowed => !isShowed)
    const fieldChangeHandler = e => {
        onChange(label.toLowerCase(), e.target.value.trim())
    }

    return (<div className="flex relative w-full px-5 mb-2">
        {ref.current && ref.current.value.trim() &&
            <label className="pr-5 py-2 mb-2">{label}</label>
        }
        <div className="w-full relative flex items-center">
            <input
                ref={ref}
                onChange={fieldChangeHandler}
                name={label}
                placeholder={label}
                type={hidden && !isShowed ? "password" : "text"}
                className="w-full border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-300 py-2 mb-2"
            />
            {hidden &&
                <div className="text-slate-300 absolute right-2" onClick={toggleHandler}>
                    {isShowed ? <FaEye /> : <FaEyeSlash />}
                </div>
            }
        </div>
    </div>)
})

export default Input