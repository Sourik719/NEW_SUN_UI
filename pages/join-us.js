import Fields from "@/components/registration/Fields";
import ImageField from "@/components/registration/Image";
import { bloodGroupOptions, genderOptions } from "@/data/registration";
import { useHttp } from "@/hooks/use-http";
import formValidation from "@/validation/formValidation";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const joinUs = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [atFirst, setAtfirst] = useState(true);
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

    const handleSubmit = async () => {
        setAtfirst(false);
        const errors = formValidation(formData);
        setValidationErrors(errors);
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
    useEffect(() => {
        if (!atFirst) {
            const errors = formValidation(formData);
            setValidationErrors(errors);
        }
    }, [formData]);



    const handleFieldChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }))
    };





    return (<div className="bg-slate-200 min-h-screen w-full flex justify-center items-center" >
        <Head>
            <title>Join Us</title>
        </Head>
        <div className="relative w-[500px] xs:w-full flex bg-white flex-col items-center rounded-xl shadow-sm shadow-gray-600">
            <div className="absolute w-full h-full pointer-events-none">
                <Image
                    src={"/registration.svg"}
                    width={0}
                    height={0}
                    className="rounded-xl w-full h-4/5 object-cover"
                />
            </div>
            <ImageField label="Profile" onChange={(value) => handleFieldChange('profileImage', value)} />
            <div className="flex flex-col items-center my-2 w-full">
                <div className="flex flex-row justify-end w-full">
                    <Fields label="First Name" dataType="Text" onChange={(value) => handleFieldChange('firstname', value)} validationError={validationErrors.firstname} />
                    <Fields label="Last Name" dataType="Text" onChange={(value) => handleFieldChange('lastname', value)} validationError={validationErrors.lastname} />
                </div>
                <Fields label="Email" dataType="Email" onChange={(value) => handleFieldChange('email', value)} validationError={validationErrors.email} />
                <Fields label="Password" dataType="password" onChange={(value) => handleFieldChange('password', value)} validationError={validationErrors.password} />
                <Fields label="Address" dataType="textarea" onChange={(value) => handleFieldChange('address', value)} validationError={validationErrors.address} />
                <div className="flex flex-row justify-end w-full">
                    <Fields label="Phone No." dataType="Text" onChange={(value) => handleFieldChange('phone', value)} validationError={validationErrors.phone} />
                    <Fields label="D.O.B." dataType="date" onChange={(value) => handleFieldChange('dob', value)} validationError={validationErrors.dob} />
                </div>
                <div className="flex flex-row justify-end w-full">
                    <Fields label="Gender" dataType="select" options={genderOptions} onChange={(value) => handleFieldChange('sex', value)} validationError={validationErrors.sex} />
                    <Fields label="Blood Group" dataType="select" options={bloodGroupOptions} onChange={(value) => handleFieldChange('bloodGroup', value)} validationError={validationErrors.bloodGroup} />
                </div>
            </div>
            {Object.keys(validationErrors).length == 0 && <div className="w-2/3 p-3 z-10">
                <button className="w-full bg-green-500 p-3 text-center rounded-lg hover:bg-blue-500 transition-colors duration-300" onClick={handleSubmit}>
                    Join as Member
                </button>
            </div>}
        </div>
    </div>
    )
}

export default joinUs;