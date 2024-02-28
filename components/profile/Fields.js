import { useAsync } from "@/hooks/use-async";
import { useAuth } from "@/hooks/use-auth";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { FaPen, FaSave } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import RequireError from "../../validation/requireError";


const ProfileFields = ({ label, dataType, value, editAble, options, id, fieldName }) => {
    const [isAuthenticated, isLoading] = useAuth();
    const [fieldType, setFieldType] = useState('text');
    const inputRef = useRef(null);
    const selectRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [fieldValue, setFieldValue] = useState(value);
    const [finalValue, setFinalValue] = useState(value);
    const [isBlank, setIsBlank] = useState(value === null);
    const [errors, setErrors] = useState(null);
    const [httpRequest] = useHttp();
    const dispatch = useDispatch();
    const { catchAsync } = useAsync();
    const router = useRouter();

    const EditModebtn = () => {
        return (
            <div className="absolute top-5 right-2">
                <button onClick={handleSave}>
                    <FaSave className="text-black text-sm mx-1" />
                </button>
                <button onClick={handleCancel} >
                    <FaXmark className="text-black text-sm mx-1" />
                </button>
            </div>
        )
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        const errorMsg = RequireError({ label: label, fieldValue: fieldValue, type: dataType });
        setErrors(errorMsg);
    }, [fieldValue, label, dataType]);

    const handleEdit = () => {
        setFieldType(dataType);
        setEditMode(true);
        inputRef.current.focus();
    };

    const handleUpdate = async () => {

        const updateData = { "update": { [fieldName]: fieldValue } };
        console.log(updateData)
        const responseData = await httpRequest(`/members/${id}`, 'PUT', updateData);
        setFinalValue(fieldValue);
        console.log(responseData.message);
        if (responseData) {
            router.reload();
            dispatch(notificationActions.setNotification({
                message: responseData.message
            }));
        }
    }

    const handleSave = async () => {
        const updateResponse = await catchAsync(handleUpdate)();
        setFieldType('text');
        setEditMode(false);
    };

    const handleCancel = () => {
        setFieldType('text');
        setEditMode(false);
        setFieldValue(finalValue);
    }

    const handleChange = (e) => {
        if (dataType === 'Select') {
            setFieldValue(e.target.value);
        } else {
            const instantValue = e.target.value.trim();
            setFieldValue(instantValue);
            setIsBlank(instantValue === '');
        }
    };

    return (
        <div className="relative w-full mx-2 my-1">
            <label className="bg-transparent text-black text-sm top-1 left-3 px-1 transition-all duration-300 z-10 flex flex-row">
                {!isBlank && <div>{label}:</div>}
                {errors && <span className="text-yellow-600 ml-1 text-sm">{errors}</span>}
            </label>
            {fieldType === 'Select' ? (
                <div className="relative">
                    <select
                        value={fieldValue}
                        onChange={handleChange}
                        ref={selectRef}
                        required
                        className={`w-full px-4 py-3 my-1 ${editMode ? (!errors ? 'border-blue-400' : 'border-red-400') : 'border-gray-200'} focus:outline-none border rounded-3xl appearance-none`}
                    >
                        <option value="" disabled>Select {label}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {editAble && editMode && !errors && (
                        <EditModebtn />
                    )}
                </div>
            ) :
                (
                    <div className="relative mx-2">
                        <input
                            className={`w-full px-4 py-3 my-1 ${editMode ? (!errors ? 'border-blue-400' : 'border-red-400') : 'border-gray-200'} focus:outline-none border rounded-3xl`}
                            readOnly={!editAble || !editMode}
                            value={!editMode ? (dataType === 'Date' ? formatDate(finalValue) : finalValue) : fieldValue}
                            type={!editMode ? 'text' : dataType}
                            placeholder={label}
                            onChange={handleChange}
                            ref={inputRef}
                        />

                        {editAble && !editMode && (
                            <button onClick={handleEdit} className="absolute top-6 right-2">
                                <FaPen className="text-black text-sm" />
                            </button>
                        )}
                        {editAble && editMode && !errors && (
                            <EditModebtn />
                        )}
                    </div>
                )
            }
        </div >
    );
};

export default ProfileFields;
