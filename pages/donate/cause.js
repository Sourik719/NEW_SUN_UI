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
        <Container className="relative bg-stone-50 px-5 py-16 sm:px-8">
            <Head>
                <title>Donate || TEAM NEW SUN FOUNDATION</title>
            </Head>
            {paymentData && <ConfirmationElement data={paymentData} status={paymentStatus} type='donation' />}
            {!paymentData && <main className="mx-auto grid max-w-6xl overflow-hidden rounded-md border border-stone-200 bg-white shadow-xl md:grid-cols-[0.9fr_1.1fr]">
                    <div className="bg-slate-950 p-8 text-white sm:p-10">
                        <div className="text-sm font-bold uppercase tracking-wide text-orange-300">Support Our Cause</div>
                        <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">Make a donation that reaches real community work.</h1>
                        <p className="mt-5 text-lg leading-8 text-stone-300">Your contribution helps us continue education support, festive outreach, cultural programs, environmental awareness, and essential relief.</p>
                        <p className='mt-5 rounded-md bg-white/10 p-4 text-sm font-semibold text-orange-100'>
                            Donations are eligible for deduction u/s 80G of Income Tax Act 1961.
                        </p>
                    </div>
                    <div className="p-6 sm:p-8">

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-slate-700 text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full rounded-md border border-stone-300 px-3 py-3 text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={order !== null}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-slate-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full rounded-md border border-stone-300 px-3 py-3 text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={order !== null}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-slate-700 text-sm font-bold mb-2">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="w-full rounded-md border border-stone-300 px-3 py-3 text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={order !== null}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="amount" className="block text-slate-700 text-sm font-bold mb-2">
                                Amount (INR)
                            </label>
                            <input
                                type="number"
                                id="amount"
                                className="w-full rounded-md border border-stone-300 px-3 py-3 text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="1"
                                disabled={order !== null}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="cause" className="block text-slate-700 text-sm font-bold mb-2">
                                Cause of Donation
                            </label>
                            <select
                                id="cause"
                                className="w-full rounded-md border border-stone-300 px-3 py-3 text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
                                className="rounded-md bg-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
                                onClick={paymentHandler}
                            >
                                {isLoading ? 'Preparing...' : 'Donate Now'}
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
            </main>}
        </Container>
    );
};

export default DonatePage;
