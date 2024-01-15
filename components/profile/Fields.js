import { useEffect, useRef, useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";
import RequireError from "../../validation/requireError";

const ProfileFields = ({ label, dataType, value, editAble, options }) => {
    const [fieldType, setFieldType] = useState('text');
    const inputRef = useRef(null);
    const selectRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);
    const [fieldvalue, setfieldValue] = useState(value);
    const [isBlank, setIsBlank] = useState(value === null);
    const [errors, setErrors] = useState(null);

    const handleEdit = (e) => {
        setFieldType(dataType);
        setEditMode(true);
        inputRef.current.focus();
    };

    const handleSave = (e) => {
        setFieldType('text');
        setEditMode(false);
        console.log(label + ":" + fieldvalue);
    };

    const handleChange = (e) => {
        if (dataType === 'Select') {
            setSelectedOption(e.target.value);
            setfieldValue(e.target.value);
        } else {
            const instantValue = e.target.value.trim();
            setfieldValue(instantValue);
            setIsBlank(instantValue === '');
        }
    };

    useEffect(() => {
        const errorMsg = RequireError({ label: label, fieldValue: fieldvalue, type: dataType });
        setErrors(errorMsg);
    }, [fieldvalue, label, dataType]);

    return (
        <div className={`relative w-4/5 mx-2 border border-2  ${editMode ? 'border-blue-400' : 'border-gray-200'} my-1 rounded-lg  ${editAble ? 'bg-white' : 'bg-gray-300'}`}>
            <label className="absolute bg-transparent text-black text-sm top-1 left-3 px-1 transition-all duration-300 z-10 flex flex-row">
                {!isBlank && (<div>
                    {label}:
                </div>
                )}
                {errors && <span className="text-yellow-600 ml-1 text-sm">{errors}</span>}
            </label>
            {fieldType === 'Select' ? (
                <div className="relative">
                    <select
                        value={selectedOption}
                        onChange={handleChange}
                        ref={selectRef}
                        required
                        className={`w-full px-4  appearance-none pt-6 my-2 focus:outline-none border-0 rounded-md ${editAble ? 'bg-white' : 'bg-gray-300'} z-1`}
                    >
                        <option value="" disabled>
                            Select {label}
                        </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {editAble && editMode && errors === null && (
                        <button onClick={handleSave} className="absolute top-9 right-2">
                            <FaSave className="text-black text-sm" />
                        </button>
                    )}
                </div>
            ) : (
                <div className="relative">
                    <input
                        className={`w-full px-4  pt-6 my-2 ${dataType === 'Date' ? 'w-[160px] sm:w-[140px]' : 'w-full'} appearance-none focus:outline-none border-0 rounded-md ${editAble ? 'bg-white' : 'bg-gray-300'} `}
                        readOnly={!editAble || !editMode}
                        value={fieldvalue}
                        type={!editMode ? 'text' : dataType}
                        placeholder={label}
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    {editAble && !editMode && (
                        <button onClick={handleEdit} className="absolute top-9 right-2">
                            <FaPen className="text-black text-sm" />
                        </button>
                    )}
                    {editAble && editMode && errors === null && (
                        <button onClick={handleSave} className="absolute top-9 right-2">
                            <FaSave className="text-black text-sm" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileFields;
