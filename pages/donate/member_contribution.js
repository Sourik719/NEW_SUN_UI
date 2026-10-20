
import ConfirmationElement from '@/components/donation/Confirm';
import PaymentGateway from '@/components/donation/Payment';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { useAsync } from '@/hooks/use-async';
import { useAuth } from '@/hooks/use-auth';
import { useHttp } from '@/hooks/use-http';
import { formatCurrency } from '@/utils/currency';
import { formatDateRange, formatMonthYear } from '@/utils/date';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ContributionPage = () => {
    const router = useRouter();

    const [httpRequest, isLoading] = useHttp();
    const [isAuthenticated, isAuthLoading] = useAuth();
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

    // Redirect only after authentication has finished loading.
    useEffect(() => {
        if (!router.isReady || isAuthLoading) return;

        if (!isAuthenticated) {
            router.replace('/login');
        }
    }, [router.isReady, router, isAuthenticated, isAuthLoading]);

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

        // If no previous contribution exists, use the current month.
        const now = new Date();

        setStartDate(
            new Date(
                Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
            )
        );
    }, [member]);

    // Calculate the end date and total contribution amount.
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

    // Create the Razorpay payment order.
    const paymentHandler = catchAsync(async () => {
        const months = Number(numberOfMonths);
        const monthlyAmount = Number(amountPerMonth);

        if (
            numberOfMonths.trim() === '' ||
            !Number.isInteger(months) ||
            months < 1 ||
            months > 12
        ) {
            throw new Error(
                'Enter a valid number of months between 1 and 12.'
            );
        }

        if (
            amountPerMonth.trim() === '' ||
            !Number.isFinite(monthlyAmount) ||
            monthlyAmount < 50
        ) {
            throw new Error(
                `Minimum contribution per month is ${formatCurrency(50)}.`
            );
        }

        if (!startDate || !endDate) {
            throw new Error('Please wait for the contribution dates to load.');
        }

        if (!member?._id) {
            throw new Error('Member details are unavailable. Please log in again.');
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
            throw new Error('Unable to create the payment order. Please try again.');
        }
    });

    // Verify successful payment on the backend.
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
            throw new Error(
                'Payment verification failed. Please contact support if money was deducted.'
            );
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

    // Wait for authentication to resolve.
    if (isAuthLoading || !router.isReady) {
        return <Loader fullPage label="Checking authentication" />;
    }

    if (!isAuthenticated) {
        return <Loader fullPage label="Redirecting to login" />;
    }

    if (!member) {
        return <Loader fullPage label="Loading member details" />;
    }

    const firstname = member.firstname || '';
    const lastname = member.lastname || '';

    return (
        <Container className="relative flex min-h-screen flex-col items-center bg-stone-50 px-5 py-16 sm:px-8">
            <Head>
                <title>
                    Member's Contribution | Team New Sun Foundation
                </title>
                <meta
                    name="description"
                    content="Make your monthly member contribution to Team New Sun Foundation."
                />
            </Head>

            {paymentData && (
                <ConfirmationElement
                    data={paymentData}
                    status={paymentStatus}
                    type="contribution"
                />
            )}

            {!paymentData && (
                <div className="w-full max-w-2xl rounded-md border border-stone-200 bg-white p-6 text-center shadow-xl sm:p-8">
                    <div className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                        Hello, {firstname}.
                        <div className="mt-2 text-orange-600">
                            Pay your member contribution
                        </div>
                    </div>

                    <p className="mx-auto mt-4 max-w-lg text-slate-600">
                        Select how many months you want to cover and enter
                        your monthly contribution amount. We will calculate
                        the total payable amount for you.
                    </p>

                    <div className="mt-8 flex flex-col gap-5 text-left">
                        <div>
                            <label
                                htmlFor="numberOfMonths"
                                className="mb-2 block text-sm font-bold text-slate-700"
                            >
                                Number of months
                            </label>

                            <input
                                id="numberOfMonths"
                                type="number"
                                min="1"
                                max="12"
                                step="1"
                                className="w-full rounded-md border border-stone-300 px-3 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-stone-100"
                                placeholder="Enter months to cover, e.g. 3"
                                value={numberOfMonths}
                                onChange={(e) =>
                                    setNumberOfMonths(e.target.value)
                                }
                                disabled={order !== null || isLoading}
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                You can contribute for up to 12 months at a time.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="amountPerMonth"
                                className="mb-2 block text-sm font-bold text-slate-700"
                            >
                                Monthly contribution amount
                            </label>

                            <input
                                id="amountPerMonth"
                                type="number"
                                min="50"
                                step="1"
                                className="w-full rounded-md border border-stone-300 px-3 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-stone-100"
                                placeholder="Enter amount in rupees, e.g. 100"
                                value={amountPerMonth}
                                onChange={(e) =>
                                    setAmountPerMonth(e.target.value)
                                }
                                disabled={order !== null || isLoading}
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Minimum monthly contribution: {formatCurrency(50)}.
                            </p>
                        </div>

                        {endDate && (
                            <div className="rounded-md border border-stone-200 bg-stone-50 p-4">
                                <p className="text-sm font-medium text-slate-500">
                                    Contribution period
                                </p>
                                <p className="mt-1 font-bold text-slate-800">
                                    {formatDateRange(startDate, endDate)}
                                </p>
                            </div>
                        )}

                        {totalAmount > 0 && (
                            <div className="rounded-md border border-orange-100 bg-orange-50 p-4">
                                <p className="text-sm font-semibold text-orange-700">
                                    Total payable
                                </p>
                                <p className="mt-1 text-2xl font-extrabold text-orange-700">
                                    {formatCurrency(totalAmount)}
                                </p>
                            </div>
                        )}
                    </div>

                    {!order && (
                        <button
                            type="button"
                            className="mt-6 w-full rounded-md bg-orange-600 p-3 text-center font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
                            onClick={paymentHandler}
                            disabled={isLoading || !startDate || !endDate}
                        >
                            {isLoading ? 'Please wait...' : 'Proceed to payment'}
                        </button>
                    )}

                    {order && (
                        <div className="mt-6">
                            <PaymentGateway
                                orderData={order}
                                name="TEAM NEW SUN FOUNDATION"
                                description={`Member contribution for ${formatMonthYear(
                                    startDate
                                )} to ${formatMonthYear(
                                    endDate
                                )} from ${firstname} ${lastname}`}
                                image="/logo.png"
                                onSuccess={paymentSuccess}
                                onFailure={paymentFailure}
                            />
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
};

export default ContributionPage;
