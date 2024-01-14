import Fields from "@/components/join_us/Fields";
import formValidation from "@/components/join_us/formValidation";
import ImageField from "@/components/join_us/imagefield";
import SubmitBtn from "@/components/join_us/submit";
import bloodGroupoptions from "@/components/options/bloodGrpOptions";
import genderOptions from "@/components/options/genderoptions";

import { useEffect, useState } from "react";
const joinUs = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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
        }
        else {
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



    return (
        <div className="flex flex-col items-center" >
            <div className="flex flex-col items-center bg-white w-2/5 sm:w-[500px] border-2 border-yellow-300 rounded-xl">
                <div className="w-full items-center flex flex-col">
                    <ImageField label="Profile" onChange={(value) => handleFieldChange('profileImage', value)} />
                    <div className="text-yellow-600 text-sm px-7">
                        {JSON.stringify(validationErrors.profileImage, null, 2)}
                    </div>
                </div>
                <div className="flex flex-col items-center my-2">
                    <div className="flex flex-row justify-end w-full">
                        <div className="w-full">
                            <Fields label="First Name" dataType="Text" onChange={(value) => handleFieldChange('firstName', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.firstName, null, 2)}
                            </div>
                        </div>
                        <div className="w-full">
                            <Fields label="Last Name" dataType="Text" onChange={(value) => handleFieldChange('lastName', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.lastName, null, 2)}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <Fields label="Email" dataType="Email" onChange={(value) => handleFieldChange('email', value)} />
                        <div className="text-yellow-600 text-sm px-6">
                            {JSON.stringify(validationErrors.email, null, 2)}
                        </div>
                    </div>
                    <div className="w-full">
                        <Fields label="Password" dataType="Password" onChange={(value) => handleFieldChange('password', value)} />
                        <div className="text-yellow-600 text-sm px-6">
                            {JSON.stringify(validationErrors.password, null, 2)}
                        </div>
                    </div>
                    <div className="w-full">
                        <Fields label="Address" dataType="textarea" onChange={(value) => handleFieldChange('address', value)} />
                        <div className="text-yellow-600 text-sm px-6">
                            {JSON.stringify(validationErrors.address, null, 2)}
                        </div>
                    </div>
                    <div className="flex flex-row justify-end">
                        <div className="w-full">
                            <Fields label="Phone No." dataType="Text" onChange={(value) => handleFieldChange('phoneNo', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.phoneNo, null, 2)}
                            </div>
                        </div>
                        <div className="w-full">
                            <Fields label="D.O.B." dataType="Date" onChange={(value) => handleFieldChange('dob', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.dob, null, 2)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-content">
                        <div className="w-full">
                            <Fields label="Gender" dataType="Select" options={genderOptions} onChange={(value) => handleFieldChange('gender', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.gender, null, 2)}
                            </div>
                        </div>
                        <div className="w-full">
                            <Fields label="Blood Group" dataType="Select" options={bloodGroupoptions} onChange={(value) => handleFieldChange('bloodGroup', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.bloodGroup, null, 2)}
                            </div>
                        </div>
                    </div>

                </div>
                <SubmitBtn onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default joinUs;