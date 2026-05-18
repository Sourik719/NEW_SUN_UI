import ConfirmationElement from '@/components/donation/Confirm';
import PaymentGateway from '@/components/donation/Payment';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { useAsync } from '@/hooks/use-async';
import { useHttp } from '@/hooks/use-http';
import { formatCurrency } from '@/utils/currency';
import { formatDateRange, formatMonthYear } from '@/utils/date';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const contributionPage = () => {
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();
    const { member } = useSelector(state => state.member)
    const [startDate, setStartDate] = useState('')
    const [totalAmount, setTotalAmount] = useState(0);
    const [numberOfMonths, setNumberOfMonths] = useState('');
    const [amountPerMonth, setAmountPerMonth] = useState('');
    const [endDate, setEndDate] = useState('');
    const [order, setOrder] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const numberOfMonthref = useRef();
    const amountRef = useRef();

    const paymentHandler = catchAsync(async () => {
        const numberOfMonthsValue = numberOfMonths.trim();
        const amountPerMonthValue = amountPerMonth.trim();
        if (!numberOfMonthsValue || isNaN(Number(numberOfMonthsValue)) || Number(numberOfMonthsValue) === 0) {
            throw new Error("Enter the number of months you want to cover.");
        }
        const numberOfMonthsNumeric = Number(numberOfMonthsValue);
        if (!amountPerMonthValue || isNaN(Number(amountPerMonthValue))) {
            throw new Error("Enter a valid monthly contribution amount.");
        }
        const amountPerMonthNumeric = Number(amountPerMonthValue);
        if (amountPerMonthNumeric < 50) {
            throw new Error(`Minimum contribution per month is ${formatCurrency(50)}.`);
        }
        if (numberOfMonthsNumeric > 12) {
            throw new Error("You can pay for up to 12 months at a time.");
        }
        const paymentPayload = {
            amount: totalAmount,
            intent: 'contribution',
            numberOfMonths: numberOfMonthsNumeric,
            startDate: startDate,
            endDate: endDate,
            contributor: member?._id
        }
        const { data } = await httpRequest('/payments/order', 'POST', paymentPayload);
        if (data.order && data.order.id) {
            setOrder(data.order);
        }
    });

    const paymentSuccess = catchAsync(async (successData) => {
        const updatedData = {
            ...successData,
            intent: "contribution"
        }
        const { data, message } = await httpRequest('/payments/verify', 'POST', updatedData);
        const confirmData = {
            ...data.payment,
            amount: totalAmount,
            startDate: startDate,
            endDate: endDate,
        }
        setPaymentData(confirmData);
        setPaymentStatus('success')
    }
    );
    const paymentFailure = (error) => {
        setPaymentStatus('failed')
        setPaymentData("Failed")
    }

    useEffect(() => {
        if (member && member.lastContributionOn) {
            const newDate = new Date(member.lastContributionOn)
            setStartDate(new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth() + 1, 1)))
        }
    }, [member])

    useEffect(() => {
        if (startDate && numberOfMonths !== '' && numberOfMonths != 0 && !isNaN(parseInt(numberOfMonths))) {
            const startDateUTC = new Date(startDate);
            let yearUTC = startDateUTC.getUTCFullYear();
            let monthUTC = startDateUTC.getUTCMonth();
            let dayUTC = startDateUTC.getUTCDate();
            let hoursUTC = startDateUTC.getUTCHours();
            let minutesUTC = startDateUTC.getUTCMinutes();
            let secondsUTC = startDateUTC.getUTCSeconds();
            let millisecondsUTC = startDateUTC.getUTCMilliseconds();
            monthUTC += parseInt(numberOfMonths) - 1;

            const endDateUTC = new Date(Date.UTC(yearUTC, monthUTC, dayUTC, hoursUTC, minutesUTC, secondsUTC, millisecondsUTC));

            setEndDate(endDateUTC);
            setTotalAmount(parseInt(numberOfMonths) * parseFloat(amountPerMonth || 0));
        } else {
            setEndDate('');
            setTotalAmount(0);
        }
    }, [numberOfMonths, amountPerMonth]);
    const firstname = member?.firstname;
    const lastname = member?.lastname;
    if (!member || isLoading) {
        return (<Loader fullPage label="Loading contribution details" />);
    }
    if (member) {
        return (
            <Container className="relative flex flex-col items-center bg-stone-50 px-5 py-16 sm:px-8">
                <Head>
                    <title>Member's Contribution | Team New Sun Foundation</title>
                </Head>
                {paymentData && <ConfirmationElement data={paymentData} status={paymentStatus} type='contribution' />}
                {!paymentData && <div className={`w-full max-w-2xl rounded-md border border-stone-200 bg-white p-6 text-center shadow-xl sm:p-8 ${paymentData && 'blur-lg'} `}>
                    <div className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                        Hello, {member.firstname}.<div className='mt-2 text-orange-600'>Pay your member contribution</div>
                    </div>
                    <p className="mx-auto mt-4 max-w-lg text-slate-600">Select how many months you want to cover and enter your monthly contribution amount. We will calculate the total payable amount for you.</p>
                    <div className='mt-8 flex flex-col gap-4 text-left'>
                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700">Number of months</label>
                            <input className="w-full rounded-md border border-stone-300 px-3 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="Enter months to cover, e.g. 3" ref={numberOfMonthref} value={numberOfMonths} onChange={(e) => setNumberOfMonths(e.target.value)} disabled={order !== null} />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700">Monthly contribution amount</label>
                            <input className="w-full rounded-md border border-stone-300 px-3 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="Enter amount in rupees, e.g. 100" ref={amountRef} value={amountPerMonth} onChange={(e) => setAmountPerMonth(e.target.value)} disabled={order !== null} />
                        </div>
                        {endDate && <div className='rounded-md bg-stone-50 p-4 font-semibold text-slate-700'>Contribution period: {formatDateRange(startDate, endDate)}</div>}
                        {totalAmount != 0 && <div className='rounded-md bg-orange-50 p-4 text-xl font-extrabold text-orange-700'>Total payable: {formatCurrency(totalAmount)}</div>}

                    </div>
                    {order == null && <button className="mt-6 w-full rounded-md bg-orange-600 p-3 text-center font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 sm:w-auto sm:px-8" onClick={paymentHandler}>Proceed to payment</button>}

                    {order && (
                        <PaymentGateway
                            orderData={order}
                            name="TEAM NEW SUN FOUNDATION"
                            description={`Member contribution for ${formatMonthYear(startDate)} to ${formatMonthYear(endDate)} from ${firstname} ${lastname}`}
                            image='/logo.png'
                            onSuccess={paymentSuccess}
                            onFailure={paymentFailure}
                        />
                    )}
                </div>}
            </Container >
        )
    }
}

export default contributionPage;
