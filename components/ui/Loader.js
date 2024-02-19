const Loader = () => {
    return (<div className="flex justify-center items-center h-6">
        <div className="flex space-x-1.5">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>
    </div>)
}

export default Loader