import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
const Fields = ({ label, dataType, options, onChange }) => {
    const [isBlank, setIsBlank] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handlePassword = () => {
        setShowPassword(!showPassword);
    }

    const inputRef = useRef(null);
    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.type = "date";
        }
    };
    const handleBlur = () => {
        if (inputRef.current) {
            inputRef.current.type = "text";
        }
    };

    const handleChange = (e) => {
        const inputValue = e.target.value.trim();

        if (dataType === "Select") {
            setSelectedOption(e.target.value);
            onChange(e.target.value)
        } else {
            setIsBlank(inputValue === '');
            onChange(inputValue)
        }
    };
    useEffect(() => {
        if (dataType === "Select") {
            setIsBlank(selectedOption === '');
        }
    }, [selectedOption, dataType]);

    return (
        <div className="relative w-full px-5">
            {!isBlank && (
                <label className="absolute text-black -top-1 left-8 bg-white px-1 transition-all duration-300 z-10">
                    {label}:
                </label>
            )}
            {dataType === "textarea" ? (
                <textarea
                    placeholder={label}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 my-2 border border-2 border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-blue-300 text-black focus:bg-white  placeholder-black"
                />
            ) : dataType === "Select" ? (
                <select
                    value={selectedOption}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[210px] px-3 py-2 my-2 border border-2 border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-blue-300 text-black focus:bg-white  placeholder-black"
                >
                    <option value="" disabled> Select {label} </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : dataType === "Date" ? (
                <div className="flex flex-col">
                    <input
                        ref={inputRef}
                        type='text'
                        placeholder={label}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                        className="w-full sm:w-[210px] px-3 py-2 my-2 border border-2 border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-blue-300 text-black focus:bg-white  placeholder-black"
                    />
                </div>
            ) : dataType === "Password" ? (
                <div className="relative z-0">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={label}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 my-2 border border-2 border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-blue-300 text-black focus:bg-white  placeholder-black"
                    />
                    <div className="absolute top-5 right-1">
                        <button
                            type="button"
                            onClick={handlePassword}
                            className="px-2"
                        >
                            {showPassword ? (
                                <FaRegEye className="text-black" />
                            ) : (
                                <FaRegEyeSlash className="text-black" />
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <input
                    type={dataType}
                    placeholder={label}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 my-2 border border-2 border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-blue-300 text-black focus:bg-white  placeholder-black"
                />
            )
            }
        </div >
    );
}

export default Fields;
