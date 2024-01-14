import Fields from "@/components/join_us/Fields";
import formValidation from "@/components/join_us/formValidation";
import ImageField from "@/components/join_us/imagefield";
import SubmitBtn from "@/components/join_us/submit";
import bloodGroupoptions from "@/components/options/bloodGrpOptions";
import genderOptions from "@/components/options/genderoptions";

import { useState } from "react";
const joinUs = () => {
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
    return (
        <div className="flex flex-col items-center" >
            <div className="flex flex-col items-center bg-white w-2/5 sm:w-[500px] border-2 border-yellow-300 rounded-xl">
                <ImageField label="Profile" onChange={(value) => handleFieldChange('profileImage', value)} />
                <div className="flex flex-col items-center my-2">
                    <div className="flex flex-row justify-end">
                        <Fields label="First Name" dataType="Text" onChange={(value) => handleFieldChange('firstName', value)} />
                        <Fields label="Last Name" dataType="Text" onChange={(value) => handleFieldChange('lastName', value)} />
                    </div>
                    <Fields label="Email" dataType="Email" onChange={(value) => handleFieldChange('email', value)} />
                    <div className="flex flex-row justify-end">
                        <Fields label="Password" dataType="Password" onChange={(value) => handleFieldChange('password', value)} />
                        <Fields label="Confirm Password" dataType="Password" onChange={(value) => handleFieldChange('confirmpassword', value)} />
                    </div>
                    <Fields label="Address" dataType="textarea" onChange={(value) => handleFieldChange('address', value)} />
                    <div className="flex flex-row justify-end">
                        <Fields label="Phone No." dataType="Number" onChange={(value) => handleFieldChange('phoneNo', value)} />
                        <Fields label="D.O.B." dataType="Date" onChange={(value) => handleFieldChange('dob', value)} />
                    </div>
                    <div className="flex flex-row justify-content">
                        <Fields label="Gender" dataType="Select" options={genderOptions} onChange={(value) => handleFieldChange('gender', value)} />
                        <Fields label="Blood Group" dataType="Select" options={bloodGroupoptions} onChange={(value) => handleFieldChange('bloodGroup', value)} />
                    </div>

                </div>
                <SubmitBtn onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default joinUs;