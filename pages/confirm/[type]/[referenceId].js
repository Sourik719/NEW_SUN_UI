import Container from '@/components/ui/Container';
import { useHttp } from '@/hooks/use-http';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaHourglassHalf } from 'react-icons/fa6';

function PaymentConfirmationPage() {
    const router = useRouter();
    const { type, referenceId } = router.query;
    const [confirmationStatus, setConfirmationStatus] = useState('processing');
    const [confirmationMessage, setConfirmationMessage] = useState('Verifying your payment...');
    const [recordDetails, setRecordDetails] = useState(null);
    const [httpRequest, isLoading] = useHttp();
    const pollingInterval = 5000;
    const timeoutDuration = 60000;
    const timeoutRef = useRef(null);
    const intervalIdRef = useRef(null);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    };

    const stopPollingAndShowTimeout = () => {
        clearInterval(intervalIdRef.current);
        setConfirmationStatus('failed');
        setConfirmationMessage('Your payment could not be verified');
    };

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const apiUrl = type === 'contribution' ?
                    `/contributions/status/${referenceId}` :
                    `/donate/status/${referenceId}`;
                const { data, message } = await httpRequest(apiUrl, "GET", null);
                if (data) {
                    const recordStatus = type === 'contribution' ? data.contribution?.status : data.donation?.status;
                    if (data.paymentStatus === 'completed' && recordStatus === 'completed') {
                        setConfirmationStatus('success');
                        setConfirmationMessage(`Payment successful and ${type} confirmed. Thank you!`);
                        setRecordDetails(type === 'contribution' ? data.contribution : data.donation);
                        clearInterval(intervalIdRef.current);
                        clearTimeout(timeoutRef.current);
                    } else if (data.paymentStatus === 'failed') {
                        setConfirmationStatus('failed');
                        setConfirmationMessage(`Payment failed.`);
                        clearInterval(intervalIdRef.current);
                        clearTimeout(timeoutRef.current);
                    } else if (data.paymentStatus === 'completed' && recordStatus !== 'completed' && recordStatus !== 'failed') {
                        setConfirmationStatus('processing');
                        setConfirmationMessage(`Payment successful. Saving your ${type}...`);
                        clearInterval(intervalIdRef.current);
                        clearTimeout(timeoutRef.current);
                    }
                } else {
                    setConfirmationStatus('failed');
                    setConfirmationMessage(message || 'Verification failed.');
                    clearInterval(intervalIdRef.current);
                    clearTimeout(timeoutRef.current);
                }
            } catch (error) {
                console.error('Error verifying status:', error);
                setConfirmationStatus('failed');
                setConfirmationMessage('Error communicating with the server.');
                clearInterval(intervalIdRef.current);
                clearTimeout(timeoutRef.current);
            }
        };

        if (type && referenceId) {
            fetchStatus();
            intervalIdRef.current = setInterval(fetchStatus, pollingInterval);
            timeoutRef.current = setTimeout(stopPollingAndShowTimeout, timeoutDuration);

            return () => {
                clearInterval(intervalIdRef.current);
                clearTimeout(timeoutRef.current);
            };
        } else {
            setConfirmationStatus('waiting');
            setConfirmationMessage('Waiting for transaction details...');
        }
    }, [router.query, type, referenceId]);

    return (
        <Container className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
            <div className="w-full sm:w-[400px] bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{type === "contribution" ? "Contribution" : "Donation"} Confirmation</h1>

                {confirmationStatus === 'waiting' && (
                    <div className="flex flex-col items-center">
                        <FaHourglassHalf className='font-5xl animate-spin text-blue-500' />
                        <p className="text-gray-700">{confirmationMessage}</p>
                    </div>
                )}

                {confirmationStatus === 'processing' && (
                    <div className="flex flex-col items-center">
                        <FaHourglassHalf className='font-5xl animate-spin text-yellow-500' />
                        <p className="text-gray-700">{confirmationMessage}</p>
                    </div>
                )}

                {confirmationStatus === 'success' && (
                    <div className="flex flex-col items-center">
                        <FaCheckCircle className='text-green-500 text-5xl' />
                        <p className="text-lg font-semibold text-green-600 mb-2">{confirmationMessage}</p>
                        {recordDetails && type === 'donation' && (
                            <div className="mt-4 border rounded-md p-4 text-gray-700">
                                <h2 className="text-xl font-semibold mb-2">Donation Details</h2>
                                {recordDetails.amount && <p>Amount: ₹{recordDetails.amount}</p>}
                                {recordDetails.name && <p>Name: {recordDetails.name}</p>}
                                {recordDetails.email && <p>Email: {recordDetails.email}</p>}
                                {recordDetails._id && <p>Donation ID: {recordDetails._id}</p>}
                                {recordDetails.paymentId && <p>Payment ID: {recordDetails.paymentId}</p>}
                            </div>
                        )}
                        {recordDetails && type === 'contribution' && (
                            <div className="mt-4 border rounded-md p-4 text-gray-700">
                                <h2 className="text-xl font-semibold mb-2">Contribution Details</h2>
                                {recordDetails.amount && <p>Amount: ₹{recordDetails.amount}</p>}
                                {recordDetails.contributor && <p>Contributor ID: {recordDetails.contributor}</p>}
                                {<p>Contribution for: {formatDate(recordDetails.startDate) === formatDate(recordDetails.endDate) ?
                                    formatDate(recordDetails.startDate) : `${formatDate(recordDetails.startDate)} to ${formatDate(recordDetails.endDate)}`}</p>}
                                {recordDetails._id && <p>Contribution ID: {recordDetails._id}</p>}
                                {recordDetails.paymentId && <p>Payment ID: {recordDetails.paymentId}</p>}
                            </div>
                        )}
                        <button
                            onClick={() => router.push('/')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6"
                        >
                            Go to Homepage
                        </button>
                    </div>
                )}

                {confirmationStatus === 'failed' && (
                    <div className="flex flex-col items-center">
                        <FaTimesCircle className='text-red-500 text-5xl' />

                        <p className="text-lg font-semibold text-red-600 mb-2 text-center">{confirmationMessage}</p>
                        <p className="text-md text-center">For assistance, contact us at
                            <a href="mailto:contact@teamnewsunfoundation.org" className="text-blue-500 hover:underline">
                                contact@teamnewsunfoundation.org
                            </a> </p>
                        <button
                            onClick={() => router.push(type === 'contribution' ? `/donate/member_contribution` : `/donate/cause`)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default PaymentConfirmationPage;