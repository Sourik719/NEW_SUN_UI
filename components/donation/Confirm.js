import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const ConfirmationElement = ({ data, status, type }) => {
    const router = useRouter();
    let StatusIconComponent = null;
    let statusMessage = '';
    let statusColor = '';
    let title = '';
    const getFormattedDate = date => date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    if (type === 'contribution') {
        title = 'Contribution';
    } else if (type === 'donation') {
        title = 'Donation';
    }

    switch (status) {
        case 'success':
            StatusIconComponent = FaCheckCircle;
            statusMessage = `Your ${title} has been verified successfully.`;
            statusColor = 'text-green-500';
            break;
        case 'failed':
            StatusIconComponent = FaTimes;
            statusMessage = `Your ${title} could not be verified.`;
            statusColor = 'text-red-500';
            break;

        default:
            StatusIconComponent = FaCheckCircle;
            statusMessage = `Unknown ${title} status.`;
            statusColor = 'text-gray-500';
    }
    const handleTryAgain = () => {
        router.push(type === 'donation' ? '/donate/cause' : '/donate/member_contribution');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-[400]px">
            <h2 className="text-2xl font-semibold mb-4">{title} Confirmation</h2>
            <div className="flex items-center mb-4">

                <StatusIconComponent className={`${statusColor} w-8 h-8 mr-3`} />
                <p className={`${statusColor} text-lg`}>{statusMessage}</p>
            </div>

            {data && status === 'success' && (
                <div>
                    {type === 'contribution' && (
                        <div>
                            <p className="mb-2">
                                <strong className="font-medium">Payment ID:</strong> {data.paymentId}
                            </p>
                            <p className="mb-2">
                                <strong className="font-medium">Amount:</strong> {data.amount}
                            </p>
                            <p className="mb-2">
                                <strong className="font-medium">Contribution for:</strong> {getFormattedDate(data.startDate) === getFormattedDate(data.endDate)
                                    ? `${getFormattedDate(data.startDate)}` : `${getFormattedDate(data.startDate)} to ${getFormattedDate(data.endDate)}`}
                            </p>
                        </div>
                    )}
                    {type === 'donation' && (
                        <div>
                            <p className="mb-2">
                                <strong className="font-medium">Payment ID:</strong> {data.paymentId}
                            </p>
                            <p className="mb-2">
                                <strong className="font-medium">Donation Amount:</strong> {data.amount}
                            </p>
                            <p className="mb-2">
                                <strong className="font-medium">Donor Name:</strong> {data.name}
                            </p>
                            <p className="mb-2">
                                <strong className="font-medium">Donor Email:</strong> {data.email}
                            </p>
                            <p className="mb-2">
                                <strong className="font-medium">Donor Phone No.:</strong> {data.phone}
                            </p>
                        </div>
                    )}
                </div>
            )}
            {status === 'failed' && (
                <button
                    className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2 mt-4 w-full"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            )}
            {status !== 'failed' && (
                <button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 mt-4 w-full"
                    onClick={() => router.push('/')}
                >
                    Go to Home
                </button>
            )}
        </div>
    );
};

export default ConfirmationElement;
