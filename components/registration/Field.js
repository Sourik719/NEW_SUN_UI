import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ['latin'], weight: '300' });
const Field = ({ label, dataType = 'text', options = [], onChange = () => { }, validationError }) => {

    const [isBlank, setIsBlank] = useState(true);
    const [selectedOption, setSelectedOption] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handlePassword = () => setShowPassword(!showPassword);
    const inputRef = useRef(null);
    const errorMsg = JSON.stringify(validationError, null, 2);
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.type = "date"
            const today = new Date()
            inputRef.current.defaultValue = `${today.toISOString().substring(0, 10)}`
            setIsBlank(false)
        }
    };
    const handleBlur = () => {
        if (inputRef.current) {
            inputRef.current.type = "text";
        }
    };

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
        className={`${roboto.className} w-full px-3 py-2 my-1 border rounded-md  ${validationError ? 'border-red-300 focus:outline-red-300' : 'border-gray-300 focus:outline-blue-300'}`}
        title={validationError ? errorMsg : ''}
    />

    const selectField = <select
        value={selectedOption}
        onChange={handleChange}
        required
        className={`${roboto.className} w-full px-3 py-2 my-1 border rounded-md ${selectedOption == "" ? 'text-gray-400' : 'text-black'} ${validationError ? 'border-red-300 focus:outline-red-300' : 'border-gray-300 focus:outline-blue-300'}`}
        title={validationError ? errorMsg : ''}
    >
        <option value="" selected disabled>{label}</option>
        {options.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
                {option.label}
            </option>
        ))}
    </select>

    const dateField = <div className="flex flex-col">
        <input
            ref={inputRef}
            type='text'
            placeholder={label}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            className={`${roboto.className} w-full px-3 py-2 my-1 border rounded-md  ${validationError ? 'border-red-300 focus:outline-red-300' : 'border-gray-300 focus:outline-blue-300'}`}
            title={validationError ? errorMsg : ''}
        />
    </div>

    const passwordField = <div className="relative z-0">
        <input
            type={showPassword ? 'text' : 'password'}
            placeholder={label}
            onChange={handleChange}
            required
            className={`${roboto.className} w-full px-3 py-2 my-1 border rounded-md  ${validationError ? 'border-red-300 focus:outline-red-300' : 'border-gray-300 focus:outline-blue-300'}`}
            title={validationError ? errorMsg : ''}
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
        className={`${roboto.className} w-full px-3 py-2 my-1 border rounded-md  ${validationError ? 'border-red-300 focus:outline-red-300' : 'border-gray-300 focus:outline-blue-300'}`}
        title={validationError ? errorMsg : ''}
    />

    return (
        <div className="relative w-full px-5">
            {!isBlank &&
                <label className={`${roboto.className} text-xs absolute -top-px left-8 bg-white rounded-full px-1 z-10`}>
                    {label}
                </label>
            }
            {dataType === "textarea" ? textAreaField
                : dataType === "select" ? selectField
                    : dataType === "date" ? dateField
                        : dataType === "password" ? passwordField : textField
            }

        </div >
    );
}

export default Field;