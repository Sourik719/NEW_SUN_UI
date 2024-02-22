import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Field = ({ label, type = 'text', value, actionCreator, error, options = [] }) => {
    const dispatch = useDispatch()
    const fieldRef = useRef()
    const [isShowed, setShowed] = useState(false)
    const toggleHandler = () => setShowed(isShowed => !isShowed)

    const fieldChangeHandler = e => {
        const value = e.target.value + (type === 'date' ? 'T23:59:59.999Z' : '')
        dispatch(actionCreator(value))
    }

    const fieldFocusHandler = () => {
        if (type !== 'date' || !fieldRef.current) return
        fieldRef.current.type = 'date'
        const today = new Date().toISOString()
        fieldRef.current.defaultValue = `${today.substring(0, 10)}`
    }

    const textAreaField = <textarea
        name={label}
        placeholder={label}
        onChange={fieldChangeHandler}
        required
        className={`w-full px-3 py-2 mb-2 border rounded-md ${error ? 'border-red-300 focus:outline-red-300' : 'border-gray-300 focus:outline-blue-300'}`}
    />

    const selectField = <select
        name={label}
        value={value}
        onChange={fieldChangeHandler}
        required
        className={`w-full px-3 py-2 mb-2 border rounded-md ${error ? 'border-red-300 focus:outline-red-300' : 'border-gray-300 focus:outline-blue-300'}`}
    >
        <option value='' disabled>{label}</option>
        {options.map((option, i) =>
            <option key={i} value={option.value}>{option.label}</option>
        )}
    </select>

    const complexField = <div className="w-full relative flex items-center mb-3">
        <input
            ref={fieldRef}
            type={type === 'password' && !isShowed ? 'password' : 'text'}
            name={label}
            placeholder={label}
            onChange={fieldChangeHandler}
            onFocus={fieldFocusHandler}
            className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-300 focus:outline-red-300' : 'border-gray-300 focus:outline-blue-300'}`}
            required
        />
        {type === 'password' &&
            <div className="text-slate-300 absolute right-2 z-10" onClick={toggleHandler}>
                {isShowed ? <FaEye /> : <FaEyeSlash />}
            </div>
        }
    </div>

    return (<div className="relative w-full px-5">
        {value &&
            <label className="text-xs absolute -top-2 left-8 bg-white rounded px-1 z-10">
                {label}
            </label>
        }
        {type === 'textarea' ? textAreaField : type === 'select' ? selectField : complexField}
    </div >)
}

export default Field