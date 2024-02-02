import { useEffect, useRef, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Roboto } from "next/font/google"

const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const Field = ({ label, dataType = 'text', options = [], onChange = () => { }, validationError }) => {
    const [isBlank, setIsBlank] = useState(true)
    const [selectedOption, setSelectedOption] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const inputRef = useRef(null)

    const handlePassword = () => setShowPassword(!showPassword)

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.type = "date"
            const today = new Date()
            inputRef.current.defaultValue = `${today.toISOString().substring(0, 10)}`
            setIsBlank(false)
        }
    }

    const handleChange = (e) => {
        const inputValue = e.target.value.trim();
        if (dataType === "select") {
            setSelectedOption(e.target.value);
            onChange(e.target.value)
        } else {
            setIsBlank(inputValue === '');
            onChange(inputValue)
        }
    };

    useEffect(() => {
        if (dataType === "select") {
            setIsBlank(selectedOption === '')
        }
    }, [selectedOption, dataType])

    const textAreaField = <textarea
        placeholder={label}
        onChange={handleChange}
        required
        className={`${roboto.className} w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none`}
    />

    const selectField = <select
        value={selectedOption}
        onChange={handleChange}
        defaultValue=""
        required
        className={`${roboto.className} w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none`}
    >
        <option value="" disabled>{label}</option>
        {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>

    const dateField = <input
        ref={inputRef}
        type="text"
        placeholder={label}
        onChange={handleChange}
        onFocus={handleFocus}
        required
        className={`${roboto.className} w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none`}
    />

    const passwordField = <div className="relative z-0">
        <input
            type={showPassword ? 'text' : 'password'}
            placeholder={label}
            onChange={handleChange}
            required
            className={`${roboto.className} w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none`}
        />
        <div className="absolute top-4 right-2">
            <button
                type="button"
                className="text-gray-400"
                onClick={handlePassword}
            >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
        </div>
    </div>

    const textField = <input
        type={'text'}
        placeholder={label}
        onChange={handleChange}
        required
        className={`${roboto.className} w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none`}
    />

    return (
        <div className="relative w-full px-5">
            {!isBlank &&
                <div className={`${roboto.className} flex justify-center items-center text-xs absolute left-8 rounded-full px-1`}>
                    <div className="absolute block w-full h-0.5 bg-white mt-0.5" />
                    <label className="z-10">{label}</label>
                </div>
            }
            {dataType === "textarea" ? textAreaField
                : dataType === "select" ? selectField
                    : dataType === "date" ? dateField
                        : dataType === "password" ? passwordField : textField
            }
            {/* {validationError && <div className="text-yellow-600 text-sm px-2">{JSON.stringify(validationError, null, 2)}</div>} */}
        </div >
    )
}

export default Field;