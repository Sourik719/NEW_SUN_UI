import Container from "@/components/ui/Container";
import { imageData } from "@/data/galleryData";
import Head from "next/head";
import Image from 'next/image';
import { useState } from "react";

const ImageGallery = () => {
    const [displayedImages, setDisplayedImages] = useState(imageData.slice(0, 10));
    const [loadMoreCount, setLoadMoreCount] = useState(10);

    const handleLoadMore = () => {
        setDisplayedImages(imageData.slice(0, displayedImages.length + loadMoreCount));
    };

    const hasMoreImages = displayedImages.length < imageData.length;

    return (
        <Container className="bg-violet-200">
            <Head>
                <title>Gallery || TEAM NEW SUN FOUNDATION</title>
            </Head>
            <div className="p-10">
                <div className=" flex flex-col justify-center items-center text-center">
                    <h2 className="text-center text-4xl font-bold text-white p-4">A Glimpse of <span className="text-orange-500">TEAM NEW SUN FOUNDATION</span></h2>
                    <hr className="border border-2 rounded-lg mb-5 border-orange-400 w-1/4"></hr>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayedImages.map((imageUrl, index) => (
                        <div
                            key={index}
                            className="relative rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                        >
                            <Image
                                src={imageUrl}
                                alt={`Gallery Image ${index}`}
                                className="w-full h-full object-cover"
                                width={400}
                                height={300}
                                priority={index % 10 === 0}
                            />
                        </div>
                    ))}
                </div>
                {hasMoreImages && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleLoadMore}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default ImageGallery;
