import Field from "@/components/registration/Field";
import formValidation from "@/components/registration/formValidation";
import ImageField from "@/components/registration/Image";
import { useState } from "react";

import Image from "next/image";
import Head from "next/head";
import { genderOptions, bloodGroupOptions } from "@/data/registration";

const JoinUs = () => {
    const [validationErrors, setValidationErrors] = useState({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmpassword: '',
        address: '',
        phoneNo: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        profileImage: null
    });

    const handleSubmit = () => {
        const errors = formValidation(formData);
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            const isConfirmed = window.confirm("Are you sure you want to join as a member?")
            if (isConfirmed) {
                console.log("Membership Taken", formData)
                window.location.reload();
            }
            else {
                console.log("Action Cancelled")
            }
        } else {
            setValidationErrors(errors);
            const errorsMessage = JSON.stringify(errors, null, 2);
            window.alert(`${errorsMessage}`);
        }
    };

    const handleFieldChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    return (<div className="bg-slate-200 min-h-screen w-full flex justify-center items-center" >
        <Head>
            <title>Join Us</title>
        </Head>
        <div className="relative flex flex-col items-center bg-white rounded-xl shadow-sm shadow-gray-600">
            <div className="absolute w-full h-full pointer-events-none">
                <Image
                    src={"/registration.svg"}
                    width={0}
                    height={0}
                    className="rounded-xl w-full h-full object-cover"
                />
            </div>
            <ImageField label="Profile" onChange={(value) => handleFieldChange('profileImage', value)} />
            <div className="flex flex-col items-center px-2 py-5">
                <div className="w-full flex flex-col md:flex-row justify-between">
                    <Field label="First Name" dataType="text" onChange={(value) => handleFieldChange('firstName', value)} />
                    <Field label="Last Name" dataType="text" onChange={(value) => handleFieldChange('lastName', value)} />
                </div>
                <Field label="Email" dataType="email" onChange={(value) => handleFieldChange('email', value)} />
                <div className="w-full flex flex-col md:flex-row justify-between">
                    <Field label="Password" dataType="password" onChange={(value) => handleFieldChange('password', value)} />
                    <Field label="Confirm Password" dataType="password" onChange={(value) => handleFieldChange('confirmpassword', value)} />
                </div>
                <Field label="Address" dataType="textarea" onChange={(value) => handleFieldChange('address', value)} />
                <div className="w-full flex flex-col md:flex-row justify-between">
                    <Field label="Mobile Number" dataType="number" onChange={(value) => handleFieldChange('phoneNo', value)} />
                    <Field label="Date of Birth" dataType="date" onChange={(value) => handleFieldChange('dob', value)} />
                </div>
                <div className="w-full flex flex-col md:flex-row justify-between">
                    <Field label="Gender" dataType="select" options={genderOptions} onChange={(value) => handleFieldChange('gender', value)} />
                    <Field label="Blood Group" dataType="select" options={bloodGroupOptions} onChange={(value) => handleFieldChange('bloodGroup', value)} />
                </div>
            </div>
            <div className="w-2/3 p-3 z-10">
                <button className="w-full bg-green-500 p-3 text-center rounded-lg hover:bg-blue-500 transition-colors duration-300" onClick={handleSubmit}>
                    Join as Member
                </button>
            </div>
        </div>
    </div>)
}

export default JoinUs;