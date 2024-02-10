import Field from "@/components/registration/Field";
import ImageField from "@/components/registration/ImageField";
import Verifyemail from "@/components/registration/Verification";
import Container from "@/components/ui/Container";
import { bloodGroupOptions, genderOptions } from "@/data/registration";
import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { notificationActions } from "@/store/notification-slice";
import formValidation from "@/validation/formValidation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

const JoinUs = () => {
    const dispatch = useDispatch();
    const { catchAsync } = useAsync();
    const [verifyMode, setVerifymode] = useState(false);
    const [httpRequest, isLoading] = useHttp();
    const [validationErrors, setValidationErrors] = useState({
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        address: null,
        phone: null,
        dob: null,
        sex: null,
        bloodGroup: null,
        profileImage: null
    });;
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        dob: '',
        sex: '',
        bloodGroup: '',
        profileImage: null
    });

    const handleSubmit = catchAsync(async () => {
        const errors = formValidation(formData);
        setValidationErrors(errors);
        const responseData = await httpRequest('/signup', 'POST', formData);
        setVerifymode(!!responseData);
    });

    const handleFieldChange = (fieldName, value) => {

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: formValidation({ ...formData, [fieldName]: value }, fieldName),
        }));
    };

    return (<Container className="bg-slate-200 min-h-screen w-full flex justify-center items-center py-2" >

        {verifyMode &&
            <div className="fixed top-40 left-50 z-20">
                <Verifyemail email={formData.email} onClick={() => setVerifymode(false)} />
            </div>}

        <Head>
            <title>Join Us</title>
        </Head>

        <div className="relative w-[500px] xs:w-full flex flex-col bg-white items-center rounded-xl shadow-sm shadow-gray-600">

            <div className="absolute w-full h-7/8 pointer-events-none">
                <Image
                    src={"/registration.svg"}
                    alt="Background"
                    width={0}
                    height={0}
                    className="rounded-xl w-full h-4/5 object-cover"
                />
            </div>
            <div className="relative flex flex-col justify-center items-center z-10 p-3">
                <ImageField onChange={(value) => handleFieldChange("profileImage", value)} />
                <div className="flex flex-col items-center my-2 w-full">

                    <div className="flex flex-col sm:flex-row justify-end w-full">
                        <Field label="First Name" dataType="Text" onChange={(value) => handleFieldChange('firstname', value)} validationError={validationErrors.firstname} />
                        <Field label="Last Name" dataType="Text" onChange={(value) => handleFieldChange('lastname', value)} validationError={validationErrors.lastname} />
                    </div>

                    <Field label="Email" dataType="Email" onChange={(value) => handleFieldChange('email', value)} validationError={validationErrors.email} />
                    <Field label="Password" dataType="password" onChange={(value) => handleFieldChange('password', value)} validationError={validationErrors.password} />
                    <Field label="Address" dataType="textarea" onChange={(value) => handleFieldChange('address', value)} validationError={validationErrors.address} />

                    <div className="flex flex-col sm:flex-row justify-end w-full">
                        <Field label="Mobile Number" dataType="Text" onChange={(value) => handleFieldChange('phone', value)} validationError={validationErrors.phone} />
                        <Field label="Date of Birth" dataType="date" onChange={(value) => handleFieldChange('dob', value)} validationError={validationErrors.dob} />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end w-full">
                        <Field label="Gender" dataType="select" options={genderOptions} onChange={(value) => handleFieldChange('sex', value)} validationError={validationErrors.sex} />
                        <Field label="Blood Group" dataType="select" options={bloodGroupOptions} onChange={(value) => handleFieldChange('bloodGroup', value)} validationError={validationErrors.bloodGroup} />
                    </div>
                </div>
                <div className="w-full sm:w-2/3 p-3">
                    <button className="w-full bg-blue-500 p-2 text-center rounded-lg hover:bg-blue-700 text-white transition-colors duration-300" onClick={handleSubmit}>
                        {isLoading ? "Signing Up" : "Join as Member"}
                    </button>
                </div>
                <div className="text-sm flex justify-center items-center mb-5">
                    <span>Are you a member already?</span>
                    <Link href="/login" className="text-blue-500 hover:text-blue-700 px-1 cursor-pointer">Login</Link>
                </div>
            </div>
        </div>
    </Container>)
}

export default JoinUs;