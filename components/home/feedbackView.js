import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { motion, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import StarRating from "../feedback/starrating";

const FeedbackCont = () => {
    const [httpRequest, isLoading] = useHttp();
    const { ref: containerRef, inView } = useInView({ triggerOnce: true });
    const { catchAsync } = useAsync();
    const [feedBack, setFeedBack] = useState(null);

    useEffect(() => {
        const fetchFeedbackData = async () => {
            const feedbackData = await httpRequest(`/feedbacks`, 'GET', null);
            setFeedBack(feedbackData.data.feedbacks);
        };
        catchAsync(fetchFeedbackData)();
    }, []);

    return (
        <div className="w-full px-2 py-3 flex flex-col justify-center items-center bg-black" ref={containerRef}>
            <h1 className="flex flex-row text-3xl">
                <span className="text-white">What people are saying</span>
                <span className="text-orange-400 ml-1">about Us?</span>
            </h1>

            <div className="mt-4 flex flex-wrap justify-center">
                {feedBack &&
                    feedBack.map((feedback, index) => (
                        <div key={index} className="lg:w-1/3 md:w-1/2 w-full px-4 py-2" ref={inView && containerRef}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 2 }}
                            >
                                <div className="w-full h-[200px] bg-white rounded-lg shadow-md px-4 py-4 flex flex-col justify-center items-center text-black">
                                    <div className="mt-2"><StarRating totalStars={5} givenStars={feedback.rating} editAble={false} /></div>
                                    <p className="break-words my-1 text-justify h-[100px] py-2">{feedback.content}</p>
                                    <p className="font-semibold py-2 text-blue-400 ">{feedback.name}</p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
            </div>

            <hr className="w-full border-1"></hr>
        </div>
    );
};

export default FeedbackCont;
