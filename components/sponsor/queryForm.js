import { budgetOptions, causeOptions } from "@/data/eventSponsor";
import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import { queryActions } from "@/store/query-Slice";
import { hasErrors, hasUntouched } from "@/validation/registration";
import { useDispatch, useSelector } from "react-redux";
import Field from "../registration/Field";

const QueryForm = () => {
    const { fields, errors } = useSelector(state => state.query)
    const dispatch = useDispatch();
    const { catchAsync } = useAsync();
    const [httpRequest, isLoading] = useHttp();

    const queryHandler = catchAsync(async () => {
        if (hasUntouched(errors)) throw new Error('Fill out all the necessary details')
        if (hasErrors(errors)) throw new Error('Check the red marked fields')
        console.log(fields);
        const { message } = await httpRequest('/query', 'POST', fields)
        dispatch(notificationActions.setNotification({ message }))

    })
    return (
        <div className="flex flex-col lg:w-2/5 sm:w-3/5 px-5 py-5 rounded-md bg-white m-2 justify-center items-center">
            <div className="font-bold text-blue-800 text-center text-xl pb-4 flex md:flex-row flex-col">
                Have something in mind?
                <div className="text-orange-500 mx-1">
                    Let us know!!
                </div>
            </div>
            <div className="flex flex-row">
                <Field label={'First Name'} value={fields.firstname}
                    actionCreator={queryActions.firstnameChangeHandler}
                    error={errors.firstname} />
                <Field label={'Last Name'}
                    value={fields.lastname}
                    actionCreator={queryActions.lastnameChangeHandler}
                    error={errors.lastname} />
            </div>
            <Field label={'Email'}
                value={fields.email}
                actionCreator={queryActions.emailChangeHandler}
                error={errors.email} />
            <Field label={'Phone Number'}
                value={fields.phone}
                actionCreator={queryActions.phoneChangeHandler}
                error={errors.phone} />
            <Field label={'Event Date'}
                type="date"
                value={fields.eventdate}
                actionCreator={queryActions.eventdateChangeHandler}
                error={errors.eventdate} />
            <Field label={'Cause'}
                type="select"
                value={fields.cause}
                options={causeOptions}
                actionCreator={queryActions.causeChangeHandler}
                error={errors.cause} />
            <Field label={'Budget'}
                type="select"
                value={fields.budget}
                options={budgetOptions}
                actionCreator={queryActions.budgetChangeHandler}
                error={errors.budget} />
            <button className=" p-3 rounded-lg bg-green-400 text-md w-1/2 hover:bg-blue-800 hover:text-white  font-bold mt-4" onClick={queryHandler}>
                Submit
            </button>
        </div>
    )
}
export default QueryForm;

