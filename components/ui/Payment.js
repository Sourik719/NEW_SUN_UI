import Script from 'next/script';

import { useState } from 'react';
const PaymentGateway = ({ orderData, name, description, image, onSuccess, onFailure }) => {

    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        if (!window.Razorpay) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }
        if (orderData?.id) {
            setLoading(false);
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: name || 'Your Business Name',
                description: description || 'Secure Payment',
                image: image || '/your_logo.png',
                order_id: orderData.id,
                handler: async function (response) {
                    console.log(response);
                    if (onSuccess) {
                        onSuccess(response);
                    } else {
                        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
                        // You might want to redirect the user or update the UI here
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
                    color: '#3399cc',
                },
                modal: {
                    ondismiss: function () {
                        if (onFailure) {
                            onFailure({ error: { code: 'MODAL_CLOSED', description: 'Payment modal closed by user.' } });
                        } else {
                            console.log('Payment modal closed by user.');
                        }
                    },
                },
            };

            window.Razorpay.open(options);

        } else {
            alert('Invalid order data provided.');
            setLoading(false);
            if (onFailure) {
                onFailure({ error: { code: 'INVALID_ORDER_DATA', description: 'Invalid order data received by the component.' } });
            } else {
                console.error('Invalid order data:', orderData);
                alert('Payment could not be initiated due to invalid order information.');
            }
        }
    };

    return (
        <div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <button className="w-2/5 bg-green-500 p-3 m-1 text-center rounded-lg hover:bg-green-700 focus:bg-green-800 text-white transition-colors duration-300" id="rzp-button1" onClick={handlePayment} >
                {loading ? 'Processing Payment...' : 'Pay with Razorpay'}
            </button>
        </div>
    );
};

export default PaymentGateway;