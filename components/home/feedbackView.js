import { useAsync } from "@/hooks/use-async";
import { useHttp } from "@/hooks/use-http";
import { useEffect, useState } from "react";
import StarRating from "../feedback/starrating";
const FeedbackCont = () => {
    const [httpRequest, isLoading] = useHttp();

    const { catchAsync } = useAsync();
    const [feedBack, setFeedBack] = useState(null);


    useEffect(() => {
        const fetchFeedbackData = async () => {
            const feedbackData = await httpRequest(`/feedbacks`, 'GET', null);
            console.log(feedbackData)
            setFeedBack(feedbackData.data.feedbacks)
        }
        catchAsync(fetchFeedbackData)();
    }, [useHttp])

    return (
        <div className="w-full px-2 py-3 flex flex-col justify-center items-center  bg-black">
            <h1 className="flex flex-row text-3xl">
                <span className="text-white">What people are saying</span>
                <span className="text-orange-400 ml-1">about Us?</span>
            </h1>

            <div className="mt-4 flex flex-wrap justify-center">
                {feedBack &&
                    feedBack.map((feedback, index) => (
                        <div key={index} className="lg:w-1/3 md:w-1/2 w-full px-4 py-2">
                            <div className="w-full h-[200px] bg-white rounded-lg shadow-md px-4 py-2 flex flex-col justify-center items-center text-black">
                                <StarRating totalStars={5} givenStars={feedback.rating} editAble={false} />
                                <p className="break-words my-1 text-justify">{feedback.content}</p>
                                <p className="font-semibold py-5 text-blue-400">{feedback.name}</p>
                            </div>
                        </div>
                    ))}
            </div>

            <hr className="w-full border-1"></hr>
        </div>
    )
}

export default FeedbackCont;