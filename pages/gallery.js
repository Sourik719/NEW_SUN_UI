import Container from "@/components/ui/Container";
import { imageData } from "@/data/galleryData";
import Head from "next/head";
const ImageGallery = () => {


    return (
        <Container className="bg-violet-200">
            <Head>
            <title>Gallery || TEAM NEW SUN FOUNDATION</title>
        </Head>
            <div className=" p-10">
                <div className=" flex flex-col justify-center items-center text-center">
                    <h2 className="text-center text-4xl font-bold text-white p-4">A Glimpse of <span className="text-orange-500">TEAM NEW SUN FOUNDATION</span></h2>
                    <hr className="border border-2 rounded-lg mb-5 border-orange-400 w-1/4"></hr>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageData.map((imageUrl) => (
                        <div className="relative rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                            <img
                                src={imageUrl}
                                alt={`Gallery Image`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default ImageGallery;