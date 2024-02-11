// FancyLoader.js
const Loader = () => {
    return (<div className="flex justify-center items-center h-10">
        <div className="flex space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>
    </div>)
}

export default Loader