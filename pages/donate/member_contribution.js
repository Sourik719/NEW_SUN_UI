import PaymentGateway from '@/components/donation/Payment';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { useAsync } from '@/hooks/use-async';
import { useHttp } from '@/hooks/use-http';
import { notificationActions } from '@/store/notification-slice';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const contributionPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [httpRequest, isLoading] = useHttp();
    const { catchAsync } = useAsync();
    const { member } = useSelector(state => state.member)
    const [startDate, setStartDate] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [numberOfMonths, setNumberOfMonths] = useState('');
    const [amountPerMonth, setAmountPerMonth] = useState('');
    const [endDate, setEndDate] = useState('');
    const [order, setOrder] = useState(null);
    const numberOfMonthref = useRef();
    const amountRef = useRef();

    const paymentHandler = catchAsync(async () => {
        const numberOfMonthsValue = numberOfMonths.trim();
        const amountPerMonthValue = amountPerMonth.trim();
        if (!numberOfMonthsValue || isNaN(Number(numberOfMonthsValue)) || Number(numberOfMonthsValue) === 0) {
            throw new Error("Number of months must be a numeric value greater than zero.");
        }
        const numberOfMonthsNumeric = Number(numberOfMonthsValue);
        if (!amountPerMonthValue || isNaN(Number(amountPerMonthValue))) {
            throw new Error("Please enter a numeric value for the amount to donate per month.");
        }
        const amountPerMonthNumeric = Number(amountPerMonthValue);

        if (amountPerMonthNumeric < 50) {
            throw new Error("Minimum contribution per month is Rs.50.");
        }
        if (numberOfMonthsNumeric > 12) {
            throw new Error("You can donate for a maximum of 12 months at a time.");
        }
        const contributionData = {
            numberOfMonths: numberOfMonthsNumeric,
            endDate: endDate,
            contributor: member?._id
        };

        const paymentPayload = {
            amount: totalAmount,
            type: 'contribution',
            data: contributionData,
        }
        const { data, message } = await httpRequest('/payments/order', 'POST', paymentPayload);
        console.log(paymentPayload);
        if (data.order && data.order.id) {
            setOrder(data.order);
        }
    });

    const paymentSuccess = catchAsync(async (successData) => {
        /*const { data: verificationData, message } = await httpRequest('/payments/verify', 'POST', successData);
        if (verificationData?.payment._id) {
            const updatedContriData = { ...contriData, paymentId: verificationData.payment._id };
            const { message: successMessage } = await httpRequest('/contributions', 'POST', updatedContriData);
            dispatch(notificationActions.setNotification({ message: successMessage }));
            router.reload();
        }*/
        dispatch(notificationActions.setNotification({ message: "Your payment is successful. You will get a confirmation soon." }));
        router.reload();
    });
    const paymentFailure = (error) => {
        dispatch(notificationActions.setNotification(error));
        router.reload();
    }
    const getMonth = (dateString) => {
        const date = new Date(dateString);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const monthName = monthNames[monthIndex];
        return `${monthName},${year}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data: contriDetails } = await httpRequest(`/contributions`, 'GET', null);
            if (contriDetails && contriDetails.contributions && contriDetails.contributions.length > 0 && typeof contriDetails.contributions[0].endDate === 'string') {
                const endDate = new Date(contriDetails.contributions[0].endDate);
                if (!isNaN(endDate)) {
                    const newStartDate = new Date(
                        endDate.getFullYear(),
                        endDate.getMonth() + 1,
                        1
                    );
                    setStartDate(newStartDate);
                } else {
                    console.error("Invalid endDate string:", contriDetails.contributions[0].endDate);
                    setStartDate(member.joinedOn);
                }
            } else {
                setStartDate(member.joinedOn);
            }
        };
        catchAsync(fetchData)();
    }, [member]);


    useEffect(() => {
        if (startDate && numberOfMonths !== '' && numberOfMonths != 0 && !isNaN(parseInt(numberOfMonths))) {
            const endDateObj = new Date(startDate);
            endDateObj.setMonth(endDateObj.getMonth() + parseInt(numberOfMonths) - 1);
            setEndDate(endDateObj);
            setTotalAmount(parseInt(numberOfMonths) * parseFloat(amountPerMonth || 0));
        } else {
            setEndDate('');
            setTotalAmount(0);

        }
    }, [startDate, numberOfMonths, amountPerMonth]);

    if (!member || isLoading) {
        return (<Loader />);
    }
    if (member) {
        return (
            <Container className="relative bg-blue-200 flex flex-col justify-center items-center py-5">
                <Head>
                    <title>Member's Contribution || TEAM NEW SUN FOUNDATION</title>
                </Head>

                <div className='w-full lg:w-2/5 md:w-1/2 sm:w-3/5 bg-white rounded-md p-4 m-2 items-center justify-center text-center'>
                    <div className="text-4xl text-center p-2 m-2">
                        Hey, {member.firstname}.<div className='text-orange-500 m-1'> Want to contribute?</div>
                    </div>
                    <div className='flex flex-col text-xl text-bold mx-2'>
                        <div className='flex relative w-full px-5 m-2'>
                            {numberOfMonths && <label className="text-left pr-5 py-2 mb-1">No. of Months</label>}
                            <input className="w-full border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-300 p-2" placeholder="No. of Months" ref={numberOfMonthref} value={numberOfMonths} onChange={(e) => setNumberOfMonths(e.target.value)} disabled={order !== null} />
                        </div>
                        <div className='flex relative w-full px-5 m-2'>
                            {amountPerMonth && <label className="text-left pr-5 py-1 ">Amount per Month</label>}
                            <input className="w-full border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-300 p-2" placeholder="Donation Amount per month" ref={amountRef} value={amountPerMonth} onChange={(e) => setAmountPerMonth(e.target.value)} disabled={order !== null} />
                        </div>
                        {endDate && <div className='p-2'>Selected Period: {startDate ? getMonth(startDate) : 'N/A'} to {getMonth(endDate) || 'N/A'}</div>}
                        {totalAmount != 0 && <div className='p-2'>Total Amount to be donated: {totalAmount}</div>}

                    </div>
                    {order == null && <button className="w-2/5 bg-green-500 p-3 m-1 text-center rounded-lg hover:bg-green-700 focus:bg-green-800 text-white transition-colors duration-300" onClick={paymentHandler}>Donate now</button>}
                    {order && (
                        <PaymentGateway
                            orderData={order}
                            name="TEAM NEW SUN FOUNDATION"
                            description={`Monthly Contribution for ${getMonth(startDate)} to ${getMonth(endDate)}`}
                            image="./logo.png"
                            onSuccess={paymentSuccess}
                            onFailure={paymentFailure}
                        />
                    )}
                </div>
            </Container >
        )
    }
}

export default contributionPage;