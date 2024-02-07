import Image from "next/image";


const Carousel = () => {
    return (
        <div className="flex sm:flex-row flex-col bg-transparent items-center justify-between mx-2 shadow-md my-1">
            <div className="relative overflow-hidden sm:h-[400px] h-[300px] w-full sm:w-1/3 sm:mb-10 group">
                <div className="transition-transform duration-300 transform-gpu group-hover:scale-110 w-full h-full shadow-lg">
                    <Image className="w-full h-full object-cover" src={"/Sampreeti.jpg"} height={500} width={500} />
                </div>
                <label className="absolute text-3xl text-white top-60 bottom-0 flex justify-center items-center z-10 w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">Sharing Joy</label>
            </div>
            <div className="relative overflow-hidden sm:h-[400px] h-[300px] w-full sm:w-1/3 sm:mt-10 group">
                <div className="transition-transform duration-300 transform-gpu group-hover:scale-110 w-full h-full shadow-lg">
                    <Image className="w-full h-full object-cover" src={"/Sampreeti.jpg"} height={500} width={500} />
                </div>
                <label className="absolute text-3xl text-white top-60 bottom-0 flex justify-center items-center z-10  w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">Creating Awareness</label>
            </div>
            <div className="relative overflow-hidden sm:h-[400px] h-[300px] w-full sm:w-1/3 sm:mb-10 group">
                <div className="transition-transform duration-300 transform-gpu group-hover:scale-110 w-full h-full shadow-lg">
                    <Image className="w-full h-full object-cover" src={"/Sampreeti.jpg"} height={500} width={500} />
                </div>
                <label className="absolute text-3xl text-white sm:top-60 bottom-0 flex justify-center items-center z-10 w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">Protecting Environment </label>
            </div>
        </div>
    )
}
export default Carousel;

