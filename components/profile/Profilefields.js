import { useAsync } from "@/hooks/use-async";
import { useAuth } from "@/hooks/use-auth";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

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
            <div className="absolute right-3 top-5">
                <button onClick={handleSave}>
                    <FaSave className="mx-1 text-sm text-slate-900" />
                </button>
                <button onClick={handleCancel} >
                    <FaXmark className="mx-1 text-sm text-slate-900" />
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
        const responseData = await httpRequest(`/members/${id}`, 'PUT', updateData);
        setFinalValue(fieldValue);
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
        } else if (dataType === 'date') {
            const dateString = e.target.value;
            setFieldValue(dateString ? new Date(dateString) : null);
            setIsBlank(e.target.value === '');
        } else {
            const instantValue = e.target.value.trim();
            setFieldValue(instantValue);
            setIsBlank(instantValue === '');
        }
    };

    return (
        <div className="relative my-2 w-full">
            <label className="z-10 flex flex-row px-1 text-sm font-bold text-slate-700 transition-all duration-300">
                {!isBlank && <div>{label}:</div>}
                {errors && <span className="ml-1 text-sm text-red-600">{errors}</span>}
            </label>
            {fieldType === 'Select' ? (
                <div className="relative">
                    <select
                        value={fieldValue}
                        onChange={handleChange}
                        ref={selectRef}
                        required
                        className={`my-1 w-full appearance-none rounded-md border px-4 py-3 outline-none transition ${editMode ? (!errors ? 'border-orange-500 ring-2 ring-orange-100' : 'border-red-400 ring-2 ring-red-100') : 'border-stone-200 bg-stone-50'}`}
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
                    <div className="relative">
                        <input
                            className={`${dataType === 'date' ? "pr-12" : ""} my-1 w-full rounded-md border px-4 py-3 outline-none transition ${editMode ? (!errors ? 'border-orange-500 ring-2 ring-orange-100' : 'border-red-400 ring-2 ring-red-100') : 'border-stone-200 bg-stone-50'}`}
                            readOnly={!editAble || !editMode}
                            value={!editMode ? (dataType === 'date' ? formatDate(finalValue) : finalValue) : (dataType === 'date' ? formatDate(fieldValue) : fieldValue)}
                            type={!editMode ? 'text' : dataType}
                            placeholder={label}
                            onChange={handleChange}
                            ref={inputRef}
                        />

                        {editAble && !editMode && (
                            <button onClick={handleEdit} className="absolute right-3 top-5 rounded p-1 hover:bg-stone-200" aria-label={`Edit ${label}`}>
                                <FaPen className="text-sm text-slate-800" />
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
