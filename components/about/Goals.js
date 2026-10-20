import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Goals = () => {
  return (
    <section className="w-full bg-stone-50 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Principles</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-950 mb-4">
          Our Guiding Principles
        </h2>
        <p className="text-lg text-slate-700">
          These are the core goals that drive our work and inspire our mission.
        </p>
      </div>
      <ol className="mx-auto grid max-w-5xl gap-4 text-lg text-slate-700 sm:grid-cols-2">
        <li className="flex items-start rounded-md border border-stone-200 bg-white p-5 shadow-sm">
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
        <li className="flex items-start rounded-md border border-stone-200 bg-white p-5 shadow-sm">
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
        <li className="flex items-start rounded-md border border-stone-200 bg-white p-5 shadow-sm">
          <CheckCircleIcon className="h-6 w-6 text-yellow-500 mr-4 mt-1" />
          <div className="flex-1">
            <span className="font-semibold inline-block mr-2">Support:</span>
            <span>
              Providing crucial support to individuals facing economic
              hardship.
            </span>
          </div>
        </li>
        <li className="flex items-start rounded-md border border-stone-200 bg-white p-5 shadow-sm">
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
        <li className="flex items-start rounded-md border border-stone-200 bg-white p-5 shadow-sm sm:col-span-2">
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
    </section>
  );
};

export default Goals;
