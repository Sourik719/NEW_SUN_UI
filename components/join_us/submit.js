

const SubmitBtn = ({ onClick, label }) => {
    return (
        <div>
            <button className="bg-green-500 px-2 py-2 my-1 text-center text-white border-2 rounded-lg hover:bg-blue-500 hover:border-red-200 shadow-lg" onClick={onClick}>{label}</button>
        </div>
    )
}

export default SubmitBtn;