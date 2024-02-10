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
                <button className="bg-green-400 text-white  p-2 px-3 rounded-md hover:bg-yellow-200 hover:text-black hover:scale-110 transform-linear duration-300" onClick={handleClick}>Feedback</button>}
        </div>
    )
}

export default Feedbackbtn;