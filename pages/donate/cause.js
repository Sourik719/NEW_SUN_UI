import PaymentGateway from '@/components/donation/Payment';
import Container from '@/components/ui/Container';
import { useAsync } from '@/hooks/use-async';
import { useHttp } from '@/hooks/use-http';
import { notificationActions } from '@/store/notification-slice';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
const DonatePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [cause, setCause] = useState('');
    const [order, setOrder] = useState(null);
    const [phone, setPhone] = useState();
    const [donateData, setDonateData] = useState();
    const { catchAsync } = useAsync();
    const [httpRequest, isLoading] = useHttp();
    const dispatch = useDispatch();
    const router = useRouter();

    const causeOptions = [
        { value: '', label: 'Select a Cause (Optional)' },
        { value: 'sunshine', label: 'Project Sunshine' },
        { value: 'agomonir ahobane', label: 'Project Agomonir Ahobane' },
        { value: 'winter smile', label: `Winter's Smile` },
        { value: 'environment', label: 'Sobujer Sondhane' },
        { value: 'general', label: 'General Donation' },

    ];

    const paymentHandler = catchAsync(async () => {
        if (!name.trim()) throw new Error("Please fill your name")
        if (name.trim().length < 3) throw new Error("Name must be at least 3 characters long.")

        const amountValue = amount.trim()
        if (!amountValue) throw new Error("Please enter amount to donate")
        const amountNumber = Number(amountValue)
        if (isNaN(amountNumber)) throw new Error("Please enter a valid numeric amount to donate.")
        if (amountNumber < 50) throw new Error("Minimum donation acceptable is Rs.50")

        const phoneValue = phone.trim()
        if (!phoneValue) throw new Error("Phone Number is mandatory")
        const phoneRegex = /^[6-9]\d{9}$/
        if (!phoneRegex.test(phoneValue)) throw new Error("Please enter a valid 10-digit Indian mobile number.")

        const updatedPaymentdata = { amount: amountNumber }
        setDonateData(donateData => ({ ...donateData, name: name, email: email, amount: amountNumber, cause: cause, phone: phoneValue }))
        const { data, message } = await httpRequest('/payments/order', 'POST', updatedPaymentdata)

        if (data.order && data.order.id) {
            setOrder(data.order);
        }
    });
    const paymentSuccess = catchAsync(async (successData) => {
        const { data: verificationData, message } = await httpRequest('/payments/verify', 'POST', successData);
        if (verificationData?.payment._id) {
            const updatedContriData = { ...donateData, paymentId: verificationData.payment._id };
            const { message: successMessage } = await httpRequest('/donate', 'POST', updatedContriData);
            dispatch(notificationActions.setNotification({ message: successMessage }));
            router.reload();
        }
    });
    const paymentFailure = (error) => {
        dispatch(notificationActions.setNotification(error));
        router.reload();
    }

    return (
        <Container className="bg-violet-200 py-16">
            <Head>
                <title>Donate || TEAM NEW SUN FOUNDATION</title>
            </Head>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
                                image="./logo.png"
                                description={cause}
                                onSuccess={paymentSuccess}
                                onFailure={paymentFailure} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default DonatePage;