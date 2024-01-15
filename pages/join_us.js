import Fields from "@/components/join_us/Fields";
import ImageField from "@/components/join_us/imagefield";
import SubmitBtn from "@/components/join_us/submit";
import { useHttp } from "@/hooks/use-http";
import bloodGroupoptions from "@/options/bloodGrpOptions";
import genderOptions from "@/options/genderoptions";
import formValidation from "@/validation/formValidation";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const joinUs = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [httpRequest, isLoading] = useHttp();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        address: '',
        phone: '',
        dob: '',
        sex: '',
        bloodGroup: '',
        profileImage: null
    });

    const handleSignup = async () => {
        try {
            const responseData = await httpRequest('/signup', 'POST', formData);
            return responseData;
        } catch (error) {
            console.error('Error during signup:', error.message);
            throw error;
        }
    };

    const handleSubmit = async () => {
        const errors = formValidation(formData);
        const dispatch = useDispatch();
        if (Object.keys(errors).length === 0) {
            try {
                console.log('Before signup request');
                const isConfirmed = window.confirm("Are you sure you want to join as a member?");
                if (isConfirmed) {
                    const responseData = await handleSignup();
                    const { token } = responseData;
                    dispatch(setToken(token));
                    console.log("Membership Taken", responseData);
                } else {
                    console.log("Action Cancelled");
                }
            } catch (error) {
                window.alert('Signup Failed');
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
                            <Fields label="First Name" dataType="Text" onChange={(value) => handleFieldChange('firstname', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.firstname, null, 2)}
                            </div>
                        </div>
                        <div className="w-full">
                            <Fields label="Last Name" dataType="Text" onChange={(value) => handleFieldChange('lastname', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.lastname, null, 2)}
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
                            <Fields label="Phone No." dataType="Text" onChange={(value) => handleFieldChange('phone', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.phone, null, 2)}
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
                            <Fields label="Gender" dataType="Select" options={genderOptions} onChange={(value) => handleFieldChange('sex', value)} />
                            <div className="text-yellow-600 text-sm px-6">
                                {JSON.stringify(validationErrors.sex, null, 2)}
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
                <SubmitBtn onClick={handleSubmit} label={isLoading ? 'Signing up' : 'Register'} />
            </div>
        </div>
    )
}

export default joinUs;