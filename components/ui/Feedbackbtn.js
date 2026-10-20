import { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import FeedBack from "../feedback/feedbackform";

const Feedbackbtn = () => {
    const [editMode, setEditMode] = useState(false);

    const handleClick = () => {
        setEditMode(!editMode);
    }
    return (
        <div className="fixed bottom-4 right-4 z-50">
            {editMode ? <FeedBack onclick={handleClick} />
                :
                <button className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-3 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-orange-600" onClick={handleClick} aria-label="Open feedback form">
                    <FaMessage />
                    Feedback
                </button>}
        </div>
    )
}

export default Feedbackbtn;
