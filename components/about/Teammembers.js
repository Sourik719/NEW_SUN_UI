
function PositionHolder({ name, position, imageUrl }) {
    return (
        <div
            className="w-[200px] flex flex-col items-center rounded-md p-2 m-4 "
        >
            {imageUrl && (
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-40 h-40 object-cover shadow-md rounded-md transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg" />
                </div>
            )}
            <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-1 hover:text-blue-200">{name}</h3>
                <p className="text-pink-500 text-md font-bold">{position}</p>
            </div>
        </div>
    );
}

export default PositionHolder;