const { useState } = require("react");
const { default: FeedBack } = require("../feedback/feedbackform");

const Feedbackbtn = () => {
    const [editMode, setEditMode] = useState(false);

    const handleClick = () => {
        setEditMode(!editMode);
    }
    return (
        <div className="fixed bottom-0 right-0 z-50">
            {editMode ? <FeedBack onclick={handleClick} />
                :
                <button className="bg-blue-800 text-white  p-2 px-3 rounded-sm hover:bg-yellow-600 hover:text-black hover:scale-105 transform-linear duration-300" onClick={handleClick}>Feedback</button>}
        </div>
    )
}

export default Feedbackbtn;