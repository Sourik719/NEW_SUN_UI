import { motion } from "framer-motion";
import Image from "next/image";

const trustSignals = [
    { label: "Registered", value: "Section 8 Company" },
    { label: "CIN", value: "U88900WB2024NPL269257" },
    { label: "Darpan ID", value: "WB/2024/0429114" },
];

const Purpose = () => {
    return (
        <section className="w-full bg-white px-5 py-16 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-orange-600">About Team New Sun Foundation</p>
                    <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                        We turn community kindness into practical support.
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-slate-700">
                        We are a social welfare organization committed to uplifting vulnerable people, especially children at the bottom rungs of the economic ladder. Our work blends direct assistance with awareness, culture, environmental care, and the motivation to bring more people into service.
                    </p>
                    <div className="mt-7 grid gap-3">
                        {trustSignals.map((item) => (
                            <div className="flex flex-col rounded-md border border-stone-200 bg-stone-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between" key={item.label}>
                                <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">{item.label}</span>
                                <span className="mt-1 font-bold text-slate-900 sm:mt-0">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "easeOut", duration: 2 }}
            >
                    <div className="relative min-h-[420px] overflow-hidden rounded-md shadow-xl">
                    <Image
                        className="object-cover"
                        src="https://res.cloudinary.com/dcikuo4sk/image/upload/v1708759744/samples/New-Sun-Projects/IMG_3631_rheuof.jpg"
                        alt="Team New Sun Foundation"
                            fill
                            sizes="(min-width: 1024px) 46vw, 100vw"
                            unoptimized
                    />
                        <div className="absolute bottom-0 left-0 right-0 bg-slate-950/75 p-5 text-white">
                            <p className="text-lg font-bold">Together, we create a ripple of positive change.</p>
                            <p className="mt-2 text-sm leading-6 text-stone-200">Every initiative is built around dignity, participation, and visible community impact.</p>
                        </div>
                    </div>
            </motion.div>
            </div>
        </section>
    );
};

export default Purpose;
