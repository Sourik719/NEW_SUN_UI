import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Field = ({ label, type = 'text', value, actionCreator, error, options = [] }) => {
    const dispatch = useDispatch();
    const fieldRef = useRef();
    const [isShowed, setShowed] = useState(false);
    const toggleHandler = () => setShowed(isShowed => !isShowed);

    const fieldChangeHandler = e => {
        const value = e.target.value;
        dispatch(actionCreator(value))
    }

    const fieldFocusHandler = () => {
        if (type !== 'date' || !fieldRef.current) return;
        fieldRef.current.type = 'date';
        const today = new Date().toISOString();
        fieldRef.current.defaultValue = `${today.substring(0, 10)}`;
    };

    const textAreaField = (
        <textarea
            name={label}
            placeholder={label}
            onChange={fieldChangeHandler}
            required
            className={`w-full rounded-md border px-3 py-3 outline-none transition ${error ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'}`}
        />
    );

    const selectField = (
        <select
            name={label}
            value={value}
            onChange={fieldChangeHandler}
            required
            className={`w-full rounded-md border px-3 py-3 outline-none transition ${error ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'}`}
        >
            <option value='' disabled>{label}</option>
            {options.map((option, i) => (
                <option key={i} value={option.value}>{option.label}</option>
            ))}
        </select>
    );

    const complexField = (
        <div className="w-full relative flex items-center mb-3">
            <input
                ref={fieldRef}
                type={type === 'password' && !isShowed ? 'password' : 'text'}
                name={label}
                placeholder={label}
                onChange={fieldChangeHandler}
                onFocus={fieldFocusHandler}
                className={`w-full rounded-md border px-3 py-3 outline-none transition ${error ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'}`}
                required
            />
            {type === 'password' && (
                <div className="text-slate-300 absolute right-2 z-10 cursor-pointer" onClick={toggleHandler}>
                    {isShowed ? <FaEye /> : <FaEyeSlash />}
                </div>
            )}
        </div>
    );

    return (
        <div className="relative my-2 w-full px-2 sm:px-3 group">
            {value && (
                <label className="absolute -top-2 left-5 z-10 rounded bg-white px-1 text-xs font-semibold text-slate-600">
                    {label}
                </label>
            )}
            {type === 'textarea' ? textAreaField : type === 'select' ? selectField : complexField}
            {error && (
                <label className="absolute left-4 top-11 z-20 rounded-md bg-slate-950 p-2 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {error}
                </label>)}
        </div>
    );
};

export default Field;
