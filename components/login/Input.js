import { useState, forwardRef } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Input = forwardRef(({ label, onChange, hidden = false }, ref) => {
    const [isShowed, setIsShowed] = useState(false)
    const toggleHandler = () => setIsShowed(isShowed => !isShowed)
    const fieldChangeHandler = e => {
        onChange(label.toLowerCase(), e.target.value.trim())
    }

    return (<div className="mb-3 flex w-full px-2 sm:px-5">
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
                className="mb-2 w-full rounded-md border border-stone-300 bg-white px-3 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
