import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Goals = () => {
    return (
        <div className="w-full bg-gradient-to-br from-slate-700 to-slate-800 py-10 px-6 md:px-16 flex flex-col items-center justify-center">
            <div className="max-w-3xl mx-auto text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Guiding Principles</h2>
                <p className="text-lg text-gray-300">These are the core goals that drive our work and inspire our mission.</p>
            </div>
            <ol className="text-lg text-gray-200 space-y-6">
                <li className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-4" />
                    <span className="font-semibold">Equal Education: </span> Ensuring every child has access to quality learning opportunities.
                </li>
                <li className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-blue-500 mr-4" />
                    <span className="font-semibold">Social Awareness: </span> Raising understanding and empathy for diverse social challenges.
                </li>
                <li className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-yellow-500 mr-4" />
                    <span className="font-semibold">Financial Empowerment: </span> Providing crucial support to individuals facing economic hardship.
                </li>
                <li className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-teal-500 mr-4" />
                    <span className="font-semibold">Environmental Stewardship: </span> Actively protecting and preserving our planet for future generations.
                </li>
                <li className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-purple-500 mr-4" />
                    <span className="font-semibold">Cultural Harmony: </span> Fostering inclusive environments that celebrate and respect all cultures.
                </li>
            </ol>
        </div>
    );
};

export default Goals;