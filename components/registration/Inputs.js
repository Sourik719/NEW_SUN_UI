import { useSelector } from "react-redux"
import { registrationActions } from "@/store/registration-slice"
import { bloodGroupOptions, genderOptions } from "@/data/registration"

import Field from "@/components/registration/Field"

const Inputs = () => {
    const { fields, errors } = useSelector(state => state.registration)

    return (<div className="flex flex-col items-center my-2 w-full">
        <div className="flex flex-col sm:flex-row justify-end w-full">
            <Field
                label={'First Name'}
                value={fields.firstname}
                actionCreator={registrationActions.firstnameChangeHandler}
                error={errors.firstname}
            />
            <Field
                label={'Last Name'}
                value={fields.lastname}
                actionCreator={registrationActions.lastnameChangeHandler}
                error={errors.lastname}
            />
        </div>
        <Field
            label={'Email'}
            value={fields.email}
            actionCreator={registrationActions.emailChangeHandler}
            error={errors.email}
        />
        <Field
            label={'Password'}
            type="password"
            value={fields.password}
            actionCreator={registrationActions.passwordChangeHandler}
            error={errors.password}
        />
        <Field
            label={'Address'}
            type="textarea"
            value={fields.address}
            actionCreator={registrationActions.addressChangeHandler}
            error={errors.address}
        />
        <div className="flex flex-col sm:flex-row justify-end w-full">
            <Field
                label={'Mobile Number'}
                value={fields.phone}
                actionCreator={registrationActions.phoneChangeHandler}
                error={errors.phone}
            />
            <Field
                label={'Date of Birth'}
                type="date"
                value={fields.dob}
                actionCreator={registrationActions.dobChangeHandler}
                error={errors.dob}
            />
        </div>
        <div className="flex flex-col sm:flex-row justify-end w-full">
            <Field
                label={'Gender'}
                type="select"
                value={fields.sex}
                options={genderOptions}
                actionCreator={registrationActions.sexChangeHandler}
                error={errors.sex}
            />
            <Field
                label={'Blood Group'}
                type="select"
                value={fields.bloodGroup}
                options={bloodGroupOptions}
                actionCreator={registrationActions.bloodGroupChangeHandler}
                error={errors.bloodGroup}
            />
        </div>
    </div>)
}

export default Inputs