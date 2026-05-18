import { budgetOptions, causeOptions } from "@/data/eventSponsor";
import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import { queryActions } from "@/store/query-Slice";
import { hasErrors, hasUntouched } from "@/validation/registration";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Field from "../registration/Field";
const QueryForm = () => {
    const { fields, errors } = useSelector(state => state.query)
    const dispatch = useDispatch();
    const { catchAsync } = useAsync();
    const [httpRequest, isLoading] = useHttp();
    const router = useRouter();
    const queryHandler = catchAsync(async () => {
        if (hasUntouched(errors)) throw new Error('Please complete all required details.')
        if (hasErrors(errors)) throw new Error('Please fix the highlighted fields before submitting.')
        const { message } = await httpRequest('/queries', 'POST', fields)
        dispatch(notificationActions.setNotification({ message }))
        router.reload();

    })
    return (
        <div className="mt-10 flex w-full max-w-2xl flex-col items-center justify-center rounded-md border border-stone-200 bg-white px-5 py-6 shadow-xl">
            <div className="pb-4 text-center text-2xl font-extrabold text-slate-950">
                Have something in mind?
                <div className="text-orange-600">
                    Let us know
                </div>
            </div>
            <div className="flex w-full flex-col sm:flex-row">
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
            <button className="mt-4 w-full rounded-md bg-orange-600 p-3 text-md font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 sm:w-1/2" onClick={queryHandler}>
                {isLoading ? 'Submitting...' : 'Send Request'}
            </button>
        </div>
    )
}
export default QueryForm;
