import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "@/hooks/use-http";
import { bloodGroupOptions, genderOptions } from "@/data/registration";

import Head from "next/head";
import Image from "next/image";
import Field from "@/components/registration/Field";
import ImageField from "@/components/registration/ImageField";
import formValidation from "@/validation/formValidation";

const JoinUs = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const [httpRequest, isLoading] = useHttp();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        address: '',
        phone: '',
        dob: '',
        sex: '',
        bloodGroup: '',
        profileImage: null
    });
    const handleSignup = async () => {
        try {
            console.log(formData);
            const responseData = await httpRequest('/signup', 'POST', formData);
            return responseData;
        } catch (error) {
            console.error('Error during signup:', error.message);
            throw error;
        }
    };
    const errors = formValidation(formData);
    const handleSubmit = async () => {
        if (Object.keys(errors).length === 0) {
            try {
                const isConfirmed = window.confirm("Are you sure you want to join as a member?");
                if (isConfirmed) {
                    const responseData = await handleSignup();
                    const { token } = responseData;
                    dispatch(userActions.setToken(token));
                    console.log("Membership Taken", responseData);
                } else {
                    console.log("Action Cancelled");
                }
            } catch (error) {
                console.log(error.message);
                const errorMsg = JSON.stringify(error.message, null, 2);
                window.alert(`Signup failed.${errorMsg}`);
            }
        } else {
            window.alert("Fill all the required fields.");
        }
    };



    const handleFieldChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }))
    };

    useEffect(() => {
        const errors = formValidation(formData);
        setValidationErrors(errors);
    }, [formData]);



    return (<div className="bg-slate-200 min-h-screen w-full flex justify-center items-center" >
        <Head>
            <title>Join Us</title>
        </Head>
        <div className="relative w-full sm:w-auto flex flex-col items-center rounded-xl shadow-sm shadow-gray-600 m-3">
            <div className="absolute w-full h-full pointer-events-none">
                <Image
                    src={"/registration.svg"}
                    alt="Background"
                    width={0}
                    height={0}
                    priority
                    className="rounded-xl w-full h-full object-cover"
                />
            </div>
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
            {/* {Object.keys(errors).length === 0 && */}
            <div className="w-2/3 p-3 z-10">
                <button className="w-full bg-orange-400 p-3 text-center rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300" onClick={handleSubmit}>
                    Join as Member
                </button>
            </div>
            {/* } */}
        </div>
    </div>
    )
}

export default JoinUs;