const Loader = ({ isLoading }) => {
    return isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-100 z-80">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 animate-spin"></div>
        </div>
    ) : null;
};

export default Loader;
