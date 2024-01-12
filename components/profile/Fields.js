const { useState, useRef } = require("react");
import { FaPen, FaSave } from "react-icons/fa";
const ProfileFields = ({ label, dataType, value, editAble, options }) => {
    const [fieldType, setFieldType] = useState('text');
    const inputref = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);
    const [fieldvalue, setfieldValue] = useState(value)
    const [isBlank, setIsBlank] = useState(value === null);

    const handleEdit = (e) => {
        inputref.current.focus();
        setFieldType(dataType);
        setEditMode(true);

    }
    const handleSave = (e) => {
        setFieldType('text');
        setEditMode(false);
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
    }
    return (
        <div className={`relative  w-4/5 px-1 border border-2 focus-within:border-blue-200 my-1 rounded-lg mx-1 ${editAble ? 'bg-white' : 'bg-gray-300'}`}>
            {!isBlank && <label className="absolute bg-transparent text-black text-sm top-1 left-3 px-1 bg-white  transition-all duration-300 z-10">
                {label}:
            </label>}
            {fieldType === "Select" ? (
                <div className="relative">
                    <select
                        value={selectedOption}
                        onChange={handleChange}
                        ref={inputref}
                        required
                        className={`w-full px-4 appearance-none pt-6 my-2 w-5/6 focus:outline-none border-0 rounded-md ${editAble ? 'bg-white' : 'bg-gray-300'} `}
                    >
                        <option value="" disabled> Select {label} </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {editAble && !editMode && (<button onClick={handleEdit} className="absolute top-9 right-2">
                        <FaPen className="text-black text-sm" />
                    </button>)}
                    {editAble && editMode && (<button onClick={handleSave} className="absolute top-9 right-2">
                        <FaSave className="text-black text-sm" />
                    </button>)}
                </div>) :
                (<div className="relative">
                    <input
                        className={`w-full px-4  pt-6 my-2 w-full focus:outline-none border-0 rounded-md ${editAble ? 'bg-white' : 'bg-gray-300'} `}
                        readOnly={!editAble || !editMode}
                        value={fieldvalue}
                        type={!editMode ? 'text' : dataType}
                        placeholder={label}
                        onChange={handleChange}
                        ref={inputref}
                    />
                    {editAble && !editMode && (<button onClick={handleEdit} className="absolute top-9 right-2">
                        <FaPen className="text-black text-sm" />
                    </button>)}
                    {editAble && editMode && (<button onClick={handleSave} className="absolute top-9 right-2">
                        <FaSave className="text-black text-sm" />
                    </button>)}
                </div>
                )}
        </div>
    )
}

export default ProfileFields;