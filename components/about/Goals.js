import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Goals = () => {
  return (
    <div className="w-full bg-gradient-to-br from-slate-700 to-slate-800 py-10 px-6 md:px-16 flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Guiding Principles
        </h2>
        <p className="text-lg text-gray-300">
          These are the core goals that drive our work and inspire our mission.
        </p>
      </div>
      <ol className="text-lg text-gray-200 space-y-6">
        <li className="flex items-start">
          <CheckCircleIcon className="h-6 w-6 text-green-500 mr-4 mt-1" />
          <div className="flex-1">
            <span className="font-semibold inline-block mr-2">
              Equal Education:
            </span>
            <span>
              Ensuring every child has access to quality learning
              opportunities.
            </span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircleIcon className="h-6 w-6 text-blue-500 mr-4 mt-1" />
          <div className="flex-1">
            <span className="font-semibold inline-block mr-2">
              Social Awareness:
            </span>
            <span>
              Raising understanding and empathy for diverse social
              challenges.
            </span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircleIcon className="h-6 w-6 text-yellow-500 mr-4 mt-1" />
          <div className="flex-1">
            <span className="font-semibold inline-block mr-2">Support:</span>
            <span>
              Providing crucial support to individuals facing economic
              hardship.
            </span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircleIcon className="h-6 w-6 text-teal-500 mr-4 mt-1" />
          <div className="flex-1">
            <span className="font-semibold inline-block mr-2">
              Environmental Stewardship:
            </span>
            <span>
              Actively protecting and preserving our planet for future
              generations.
            </span>
          </div>
        </li>
        <li className="flex items-start">
          <CheckCircleIcon className="h-6 w-6 text-purple-500 mr-4 mt-1" />
          <div className="flex-1">
            <span className="font-semibold inline-block mr-2">
              Cultural Harmony:
            </span>
            <span>
              Fostering inclusive environments that celebrate and
              respect all cultures.
            </span>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Goals;
