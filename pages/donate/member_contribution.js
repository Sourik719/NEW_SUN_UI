
import ConfirmationElement from '@/components/donation/Confirm';
import PaymentGateway from '@/components/donation/Payment';
import Container from '@/components/ui/Container';
import { useAsync } from '@/hooks/use-async';
import { useAuth } from '@/hooks/use-auth';
import { useHttp } from '@/hooks/use-http';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ContributionPage = () => {
    const [httpRequest, isLoading] = useHttp();
    const [isAuthenticated, isAdmin,isAuthLoading] = useAuth();
    const { catchAsync } = useAsync();

    const { member } = useSelector((state) => state.member);

    const [startDate, setStartDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [numberOfMonths, setNumberOfMonths] = useState('');
    const [amountPerMonth, setAmountPerMonth] = useState('');
    const [endDate, setEndDate] = useState(null);

    const [order, setOrder] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const router = useRouter();

    // Redirect only after authentication has finished loading.
    useEffect(() => {
        if (!router.isReady || isAuthLoading) return;

        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [router.isReady, isAuthenticated, isAuthLoading, router]);

    // Set the next contribution start date.
    useEffect(() => {
        if (!member) return;

        if (member.lastContributionOn) {
            const lastDate = new Date(member.lastContributionOn);

            if (!Number.isNaN(lastDate.getTime())) {
                setStartDate(
                    new Date(
                        Date.UTC(
                            lastDate.getUTCFullYear(),
                            lastDate.getUTCMonth() + 1,
                            1
                        )
                    )
                );
                return;
            }
        }

        // If there is no previous contribution, start with the current month.
        const now = new Date();

        setStartDate(
            new Date(
                Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
            )
        );
    }, [member]);

    // Calculate the contribution period and total amount.
    useEffect(() => {
        if (!startDate) {
            setEndDate(null);
            setTotalAmount(0);
            return;
        }

        const months = Number(numberOfMonths);
        const monthlyAmount = Number(amountPerMonth);

        if (
            numberOfMonths.trim() === '' ||
            !Number.isInteger(months) ||
            months < 1 ||
            months > 12 ||
            amountPerMonth.trim() === '' ||
            !Number.isFinite(monthlyAmount) ||
            monthlyAmount < 50
        ) {
            setEndDate(null);
            setTotalAmount(0);
            return;
        }

        const calculatedEndDate = new Date(
            Date.UTC(
                startDate.getUTCFullYear(),
                startDate.getUTCMonth() + months - 1,
                1
            )
        );

        setEndDate(calculatedEndDate);
        setTotalAmount(months * monthlyAmount);
    }, [startDate, numberOfMonths, amountPerMonth]);

    const getMonth = (dateValue) => {
        if (!dateValue) return 'N/A';

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) return 'N/A';

        return date.toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        });
    };

    const paymentHandler = catchAsync(async () => {
        if (!startDate || !endDate) {
            throw new Error('Please enter valid contribution details.');
        }

        const months = Number(numberOfMonths);
        const monthlyAmount = Number(amountPerMonth);

        if (
            !Number.isInteger(months) ||
            months < 1 ||
            months > 12
        ) {
            throw new Error(
                'Number of months must be between 1 and 12.'
            );
        }

        if (!Number.isFinite(monthlyAmount) || monthlyAmount < 50) {
            throw new Error(
                'Minimum contribution per month is Rs.50.'
            );
        }

        if (!member?._id) {
            throw new Error(
                'Member information is unavailable. Please refresh the page.'
            );
        }

        const paymentPayload = {
            amount: months * monthlyAmount,
            intent: 'contribution',
            numberOfMonths: months,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            contributor: member._id,
        };

        const { data } = await httpRequest(
            '/payments/order',
            'POST',
            paymentPayload
        );

        if (data?.order?.id) {
            setOrder(data.order);
        } else {
            throw new Error('Unable to create the payment order.');
        }
    });

    const paymentSuccess = catchAsync(async (successData) => {
        const updatedData = {
            ...successData,
            intent: 'contribution',
        };

        const { data } = await httpRequest(
            '/payments/verify',
            'POST',
            updatedData
        );

        if (!data?.payment) {
            throw new Error('Payment verification failed.');
        }

        setPaymentData({
            ...data.payment,
            amount: totalAmount,
            startDate,
            endDate,
        });

        setPaymentStatus('success');
    });

    const paymentFailure = () => {
        setPaymentStatus('failed');
        setPaymentData('Failed');
    };

    // Wait until authentication is resolved before rendering the page.
    if (isAuthLoading || !router.isReady) {
        return <div className="p-6 text-center">Checking authentication...</div>;
    }

    if (!isAuthenticated) {
        return <div className="p-6 text-center">Redirecting to login...</div>;
    }

    if (!member) {
        return <div className="p-6 text-center">Loading member details...</div>;
    }

    const firstname = member.firstname || '';
    const lastname = member.lastname || '';

    return (
        <Container className="relative bg-blue-200 flex flex-col justify-center items-center py-5">
            <Head>
                <title>
                    Member's Contribution || TEAM NEW SUN FOUNDATION
                </title>
            </Head>

            {paymentData && (
                <ConfirmationElement
                    data={paymentData}
                    status={paymentStatus}
                    type="contribution"
                />
            )}

            {!paymentData && (
                <div className="w-full lg:w-2/5 md:w-1/2 sm:w-3/5 bg-white rounded-md p-4 m-2 items-center justify-center text-center">
                    <div className="text-4xl text-center p-2 m-2">
                        Hey, {firstname}.
                        <div className="text-orange-500 m-1">
                            Want to contribute?
                        </div>
                    </div>

                    <div className="flex flex-col text-xl mx-2">
                        <div className="flex relative w-full px-5 m-2">
                            {numberOfMonths && (
                                <label className="text-left pr-5 py-2 mb-1">
                                    No. of Months
                                </label>
                            )}

                            <input
                                type="number"
                                min="1"
                                max="12"
                                step="1"
                                className="w-full border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-300 p-2"
                                placeholder="No. of Months"
                                value={numberOfMonths}
                                onChange={(e) =>
                                    setNumberOfMonths(e.target.value)
                                }
                                disabled={order !== null || isLoading}
                            />
                        </div>

                        <div className="flex relative w-full px-5 m-2">
                            {amountPerMonth && (
                                <label className="text-left pr-5 py-1">
                                    Amount per Month
                                </label>
                            )}

                            <input
                                type="number"
                                min="50"
                                step="1"
                                className="w-full border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-300 p-2"
                                placeholder="Donation Amount per month"
                                value={amountPerMonth}
                                onChange={(e) =>
                                    setAmountPerMonth(e.target.value)
                                }
                                disabled={order !== null || isLoading}
                            />
                        </div>

                        {endDate && (
                            <div className="p-2">
                                Selected Period: {getMonth(startDate)} to{' '}
                                {getMonth(endDate)}
                            </div>
                        )}

                        {totalAmount > 0 && (
                            <div className="p-2">
                                Total Amount to be donated: ₹
                                {totalAmount.toLocaleString('en-IN')}
                            </div>
                        )}
                    </div>

                    {!order && (
                        <button
                            type="button"
                            className="w-2/5 bg-green-500 p-3 m-1 text-center rounded-lg hover:bg-green-700 focus:bg-green-800 text-white transition-colors duration-300 disabled:opacity-50"
                            onClick={paymentHandler}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Please wait...' : 'Donate now'}
                        </button>
                    )}

                    {order && (
                        <PaymentGateway
                            orderData={order}
                            name="TEAM NEW SUN FOUNDATION"
                            description={`Monthly Contribution for ${getMonth(
                                startDate
                            )} to ${getMonth(endDate)} from ${firstname} ${lastname}`}
                            image="/logo.png"
                            onSuccess={paymentSuccess}
                            onFailure={paymentFailure}
                        />
                    )}
                </div>
            )}
        </Container>
    );
};

export default ContributionPage;
