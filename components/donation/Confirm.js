import { useRouter } from 'next/router';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const ConfirmationElement = ({ data, status, type }) => {
    const router = useRouter();
    let StatusIconComponent = null;
    let statusMessage = '';
    let statusColor = '';
    let statusBg = '';
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
            statusColor = 'text-emerald-600';
            statusBg = 'bg-emerald-50 border-emerald-200';
            break;
        case 'failed':
            StatusIconComponent = FaTimes;
            statusMessage = `Your ${title} could not be verified.`;
            statusColor = 'text-red-600';
            statusBg = 'bg-red-50 border-red-200';
            break;

        default:
            StatusIconComponent = FaCheckCircle;
            statusMessage = `Unknown ${title} status.`;
            statusColor = 'text-slate-600';
            statusBg = 'bg-stone-50 border-stone-200';
    }
    const handleTryAgain = () => {
        router.push(type === 'donation' ? '/donate/cause' : '/donate/member_contribution');
    };

    return (
        <div className="mx-auto w-full max-w-xl rounded-md border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Payment Status</p>
            <h2 className="mb-4 mt-2 text-3xl font-extrabold text-slate-950">{title} Confirmation</h2>
            <div className={`mb-5 flex items-start rounded-md border p-4 ${statusBg}`}>

                <StatusIconComponent className={`${statusColor} mr-3 h-7 w-7 shrink-0`} />
                <p className={`${statusColor} text-lg font-bold`}>{statusMessage}</p>
            </div>

            {data && status === 'success' && (
                <div className="rounded-md border border-stone-200 bg-stone-50 p-4 text-slate-700">
                    {type === 'contribution' && (
                        <div className="space-y-3">
                            <p className="mb-2">
                                <strong className="font-bold text-slate-950">Payment ID:</strong> {data.paymentId}
                            </p>
                            <p className="mb-2">
                                <strong className="font-bold text-slate-950">Amount:</strong> Rs.{data.amount}
                            </p>
                            <p className="mb-2">
                                <strong className="font-bold text-slate-950">Contribution for:</strong> {getFormattedDate(data.startDate) === getFormattedDate(data.endDate)
                                    ? `${getFormattedDate(data.startDate)}` : `${getFormattedDate(data.startDate)} to ${getFormattedDate(data.endDate)}`}
                            </p>
                        </div>
                    )}
                    {type === 'donation' && (
                        <div className="space-y-3">
                            <p className="mb-2">
                                <strong className="font-bold text-slate-950">Payment ID:</strong> {data.paymentId}
                            </p>
                            <p className="mb-2">
                                <strong className="font-bold text-slate-950">Donation Amount:</strong> Rs.{data.amount}
                            </p>
                            <p className="mb-2">
                                <strong className="font-bold text-slate-950">Donor Name:</strong> {data.name}
                            </p>
                            <p className="mb-2">
                                <strong className="font-bold text-slate-950">Donor Email:</strong> {data.email}
                            </p>
                            <p className="mb-2">
                                <strong className="font-bold text-slate-950">Donor Phone No.:</strong> {data.phone}
                            </p>
                        </div>
                    )}
                </div>
            )}
            {status === 'failed' && (
                <button
                    className="mt-5 w-full rounded-md bg-red-600 p-3 font-bold text-white transition hover:bg-red-700"
                    onClick={handleTryAgain}
                >
                    Try Again
                </button>
            )}
            {status !== 'failed' && (
                <button
                    className="mt-5 w-full rounded-md bg-orange-600 p-3 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
                    onClick={() => router.push('/')}
                >
                    Go to Home
                </button>
            )}
        </div>
    );
};

export default ConfirmationElement;
