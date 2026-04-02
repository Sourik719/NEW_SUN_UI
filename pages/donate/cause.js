import ConfirmationElement from '@/components/donation/Confirm';
import PaymentGateway from '@/components/donation/Payment';
import Container from '@/components/ui/Container';
import { useAsync } from '@/hooks/use-async';
import { useHttp } from '@/hooks/use-http';
import { regex } from '@/validation/registration';
import Head from 'next/head';
import { useState } from 'react';
const DonatePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [cause, setCause] = useState('');
    const [order, setOrder] = useState(null);
    const [phone, setPhone] = useState('');
    const { catchAsync } = useAsync();
    const [paymentData, setPaymentData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [httpRequest, isLoading] = useHttp();

    const causeOptions = [
        { value: 'Sunshine', label: 'Project Sunshine' },
        { value: 'Project Udaan', label: 'Project UDAAN' },
        { value: 'Project SURAKSHA ', label: 'Project SURAKSHA' },
        { value: 'Charity', label: 'General Donation' },
    ];

    const paymentHandler = catchAsync(async () => {
        if (!name.trim()) throw new Error("Please fill your name");
        if (name.trim().length < 3) throw new Error("Name must be at least 3 characters long.");
        if (!email.trim()) throw new Error("Email is mandatory");
        if (!regex.email.test(email.trim())) throw new Error("Please enter a valid email");
        const amountValue = amount.trim();
        if (!amountValue) throw new Error("Please enter amount to donate");
        const amountNumber = Number(amountValue);
        if (isNaN(amountNumber)) throw new Error("Please enter a valid numeric amount to donate.");
        if (amountNumber < 50) throw new Error("Minimum donation acceptable is Rs.50");

        const phoneValue = phone.trim();
        if (!phoneValue) throw new Error("Phone Number is mandatory");
        if (!regex.phone.test(phoneValue)) throw new Error("Please enter a valid 10-digit Indian mobile number.");
        if (!cause.trim()) throw new Error("Please select cause of donation");

        const paymentPayload = {
            intent: 'donation',
            name: name.trim(),
            email: email.trim(),
            subjectedTo: cause.trim(),
            phone: phone.trim(),
            amount: amount
        };
        const { data, message } = await httpRequest('/payments/order', 'POST', paymentPayload);
        if (data.order && data.order.id) {
            setOrder(data.order);
        }
    });

    const paymentSuccess = catchAsync(async (successData) => {
        const updatedData = {
            ...successData,
            intent: "donation"
        }
        const { data, message } = await httpRequest('/payments/verify', 'POST', updatedData);
        const confirmData = {
            ...data.payment,
            name: name,
            email: email,
            phone: phone,
            amount: amount
        }
        setPaymentData(confirmData);
        setPaymentStatus('success')
    }
    );

    const paymentFailure = (error) => {
        setPaymentStatus('failed')
        setPaymentData("Failed")
    }

    return (
        <Container className="bg-violet-200 py-16 relative flex flex-col justify-center items-center">
            <Head>
                <title>Donate || TEAM NEW SUN FOUNDATION</title>
            </Head>
            {paymentData && <ConfirmationElement data={paymentData} status={paymentStatus} type='donation' />}
            {!paymentData && <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8 md:w-1/2">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Support Our Cause</div>
                        <h2 className="mt-2 text-3xl leading-tight font-bold text-gray-900">Make a Donation</h2>
                        <p className="mt-4 text-gray-600">Your generous contribution will help us continue our work in the community.</p>
                        <p className='mt-4 text-blue-800'>
                            All donations are eligible for deduction u/s 80G of Income Tax Act 1961.</p>
                    </div>
                    <div className="p-8 md:w-1/2 bg-gray-100">

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={order !== null}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={order !== null}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={order !== null}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                                Amount (INR)
                            </label>
                            <input
                                type="number"
                                id="amount"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="1"
                                disabled={order !== null}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="cause" className="block text-gray-700 text-sm font-bold mb-2">
                                Cause of Donation
                            </label>
                            <select
                                id="cause"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={cause}
                                onChange={(e) => setCause(e.target.value)}
                                disabled={order != null}
                            >
                                <option value="" disabled hidden>
                                    Select Cause of Donation
                                </option>
                                {causeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            {order == null && <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={paymentHandler}
                            >
                                Donate Now
                            </button>}
                            {order && <PaymentGateway
                                orderData={order}
                                name="TEAM NEW SUN FOUNDATION"
                                image='/logo.png'
                                description={`"Donation for ${cause} from ${name}`}
                                onSuccess={paymentSuccess}
                                onFailure={paymentFailure} />
                            }
                        </div>
                    </div>
                </div>
            </div>}
        </Container>
    );
};

export default DonatePage;