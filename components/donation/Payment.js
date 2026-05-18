import { useRouter } from 'next/router';
import Script from 'next/script';
import { useState } from 'react';
import { FaCreditCard, FaXmark } from 'react-icons/fa6';

const PaymentGateway = ({ orderData, name, description, image, onSuccess, onFailure }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handlePayment = async () => {
        setLoading(true);
        if (!window.Razorpay) {
            alert('We could not load the secure payment window. Please check your internet connection and try again.');
            setLoading(false);
            return;
        }
        if (orderData?.id) {
            setLoading(false);
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'TEAM NEW SUN FOUNDATION',
                description: description || 'Secure Payment',
                image: image,
                order_id: orderData.id,
                handler: async function (response) {
                    if (onSuccess) {
                        onSuccess(response);
                    } else {
                        alert('Payment completed successfully. Payment ID: ' + response.razorpay_payment_id);
                        console.log('Razorpay Success Response:', response);
                    }
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: '',
                },
                notes: {},
                theme: {
                    color: '#ea580c',
                },
                modal: {
                    ondismiss: function () {
                        if (onFailure) {
                            onFailure({ error: { code: 'MODAL_CLOSED', description: 'The payment window was closed before the payment was completed.' } });
                        } else {
                            console.log('Payment modal closed by user.');
                        }
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } else {
            alert('We could not prepare this payment. Please refresh the page and try again.');
            setLoading(false);
            if (onFailure) {
                onFailure({ error: { code: 'INVALID_ORDER_DATA', description: 'The payment order could not be prepared.' } });
            } else {
                console.error('Invalid order data:', orderData);
                alert('Payment could not be started right now. Please try again.');
            }
        }
    };
    const handlePaymentCancel = () => {
        router.reload();
    }

    return (
        <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 p-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <p className="text-sm font-bold uppercase tracking-wide text-orange-700">Ready for payment</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                Your payment details are ready. You will be redirected to Razorpay to complete the payment securely using UPI, card, net banking, or wallet.
            </p>
            <p className="mb-3 mt-2 text-xs font-medium text-slate-500">
                Please do not refresh this page after the payment window opens.
            </p>
            <div className='flex flex-col items-stretch justify-center gap-3 sm:flex-row'>
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-5 py-3 text-center font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70" id="rzp-button1" onClick={handlePayment} disabled={loading}>
                    <FaCreditCard />
                    {loading ? 'Opening secure payment...' : 'Continue to secure payment'}
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-5 py-3 text-center font-bold text-slate-800 transition hover:bg-stone-100" onClick={handlePaymentCancel}>
                    <FaXmark />
                    Go back
                </button>
            </div>
        </div>
    );
};

export default PaymentGateway;
