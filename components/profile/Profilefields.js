import { useAsync } from "@/hooks/use-async";
import { useAuth } from "@/hooks/use-auth";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import { formatDate, formatDateInputValue } from "@/utils/date";
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
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
                <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-md bg-emerald-50 p-2 text-emerald-700 transition hover:bg-emerald-100"
                    aria-label={`Save ${label}`}
                >
                    <FaSave className="text-sm" />
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-md bg-red-50 p-2 text-red-700 transition hover:bg-red-100"
                    aria-label={`Cancel editing ${label}`}
                >
                    <FaXmark className="text-sm" />
                </button>
            </div>
        )
    }

    useEffect(() => {
        const errorMsg = RequireError({ label: label, fieldValue: fieldValue, type: dataType });
        setErrors(errorMsg);
    }, [fieldValue, label, dataType]);

    const handleEdit = () => {
        setFieldType(dataType);
        setEditMode(true);
        setTimeout(() => {
            const fieldRef = dataType === 'Select' ? selectRef : inputRef;
            fieldRef.current?.focus();
        }, 0);
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
        <div className="relative w-full">
            <label className="mb-1 flex min-h-[20px] items-center justify-between px-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                <span>{label}</span>
            </label>
            {fieldType === 'Select' ? (
                <div className="relative">
                    <select
                        value={fieldValue}
                        onChange={handleChange}
                        ref={selectRef}
                        required
                        className={`w-full appearance-none rounded-md border bg-white px-4 py-3 pr-24 font-semibold text-slate-900 outline-none transition ${editMode ? (!errors ? 'border-orange-500 ring-2 ring-orange-100' : 'border-red-400 ring-2 ring-red-100') : 'border-stone-200'}`}
                    >
                        <option value="" disabled>Choose {label.toLowerCase()}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {editAble && editMode && !errors && (
                        <EditModebtn />
                    )}
                    {errors && editMode && <p className="mt-1 text-sm font-semibold text-red-600">{errors}</p>}
                </div>
            ) :
                (
                    <div className="relative">
                        <input
                            className={`w-full rounded-md border px-4 py-3 font-semibold outline-none transition ${editAble ? 'pr-12' : ''} ${editMode ? (!errors ? 'border-orange-500 bg-white text-slate-950 ring-2 ring-orange-100' : 'border-red-400 bg-white text-slate-950 ring-2 ring-red-100') : 'border-stone-200 bg-white text-slate-800 shadow-sm'}`}
                            readOnly={!editAble || !editMode}
                            value={!editMode ? (dataType === 'date' ? formatDate(finalValue) : finalValue) : (dataType === 'date' ? formatDateInputValue(fieldValue) : fieldValue)}
                            type={!editMode ? 'text' : dataType}
                            placeholder={label}
                            onChange={handleChange}
                            ref={inputRef}
                        />

                        {editAble && !editMode && (
                            <button type="button" onClick={handleEdit} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500 transition hover:bg-orange-50 hover:text-orange-700" aria-label={`Edit ${label}`}>
                                <FaPen className="text-sm" />
                            </button>
                        )}
                        {editAble && editMode && !errors && (
                            <EditModebtn />
                        )}
                        {errors && editMode && <p className="mt-1 text-sm font-semibold text-red-600">{errors}</p>}
                    </div>
                )
            }
        </div >
    );
};

export default ProfileFields;
