import Image from "next/image";

const CarouselItem = ({ src, label, className = "" }) => (
    <div className={`relative overflow-hidden sm:h-[400px] h-[300px] w-full sm:w-1/3 ${className} group`}>
        <div className="transition-transform duration-300 transform-gpu group-hover:scale-110 w-full h-full shadow-lg">
            <Image className="w-full h-full object-cover" src={src} height={500} width={500} />
        </div>
        <label className="absolute text-3xl text-white top-60 bottom-0 flex justify-center items-center z-10 w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">{label}</label>
    </div>
);

const Carousel = () => (
    <div className="flex sm:flex-row flex-col bg-transparent items-center justify-between mx-2 shadow-md my-1">
        <CarouselItem src={`https://res.cloudinary.com/dcikuo4sk/image/upload/f_auto,q_auto/v1/samples/New-Sun-Projects/kfnvegj8o6khmfcsnbal`} label="Sharing Joy" className="sm:mb-10" />
        <CarouselItem src={'https://res.cloudinary.com/dcikuo4sk/image/upload/v1708758155/samples/New-Sun-Projects/IMG-20230604-WA0094_ntrmrp.jpg'} label="Creating Awareness" className="sm:mt-10" />
        <CarouselItem src={"https://res.cloudinary.com/dcikuo4sk/image/upload/v1708759372/samples/New-Sun-Projects/IMG-20220507-WA1012_d9o1ls.jpg"} label="Protecting Environment" className="sm:mb-10" />
    </div>
);

export default Carousel;
