import { useHttp } from "@/hooks/use-http";
import { motion, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import StarRating from "../feedback/starrating";

const fallbackFeedback = [
    {
        rating: 5,
        content: "Such a nice work already done and we wish a lots of work will held in future for the betterment of society.",
        name: "Surya Jadav",
    },
    {
        rating: 5,
        content: "If the world gets better even slightly, the reason would definitely be organizations like them.",
        name: "Souvik Sarkar",
    },
    {
        rating: 5,
        content: "Wonderful initiative",
        name: "Arijit Ghosh",
    },
];

const FeedbackCont = () => {
    const [httpRequest, isLoading] = useHttp();
    const { ref: containerRef, inView } = useInView({ triggerOnce: true });
    const [feedBack, setFeedBack] = useState(fallbackFeedback);

    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const feedbackData = await httpRequest(`/feedbacks`, 'GET', null);
                if (feedbackData.data?.feedbacks?.length) {
                    setFeedBack(feedbackData.data.feedbacks);
                }
            } catch (error) {
                setFeedBack(fallbackFeedback);
            }
        };
        fetchFeedbackData();
    }, []);

    return (
        <section className="w-full bg-white px-5 py-16 sm:px-8" ref={containerRef}>
            <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Community Voices</p>
                    <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                        Encouragement from people who believe in the work.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {!feedBack?.length && !isLoading && (
                        <div className="rounded-md border border-stone-200 bg-stone-50 p-6 text-slate-700">
                            Feedback will appear here soon.
                        </div>
                    )}
                {feedBack?.length > 0 &&
                    feedBack.map((feedback, index) => (
                            <div key={index} ref={inView && containerRef}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 2 }}
                            >
                                    <div className="flex h-full min-h-[230px] flex-col rounded-md border border-stone-200 bg-stone-50 p-6 shadow-sm">
                                    <div className="mt-2"><StarRating totalStars={5} givenStars={feedback.rating} editAble={false} /></div>
                                        <p className="my-5 flex-1 break-words leading-7 text-slate-700">{feedback.content}</p>
                                        <p className="font-extrabold text-slate-950">{feedback.name}</p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeedbackCont;
