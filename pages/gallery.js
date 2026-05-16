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
        <Container className="bg-stone-50">
            <Head>
                <title>Gallery || TEAM NEW SUN FOUNDATION</title>
            </Head>
            <main className="px-5 py-16 sm:px-8">
                <div className="mx-auto max-w-7xl">
                <div className="mb-10 max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Gallery</p>
                    <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl">A glimpse of Team New Sun Foundation in action.</h1>
                    <p className="mt-5 text-lg leading-8 text-slate-700">Moments from outreach, celebrations, awareness drives, cultural programs, and community events.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {displayedImages.map((imageUrl, index) => (
                        <div
                            key={index}
                            className="relative aspect-[4/3] overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <Image
                                src={imageUrl}
                                alt={`Gallery Image ${index}`}
                                className="object-cover"
                                fill
                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                priority={index % 10 === 0}
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
                {hasMoreImages && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleLoadMore}
                            className="rounded-md bg-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
                        >
                            Load More
                        </button>
                    </div>
                )}
                </div>
            </main>
        </Container>
    );
}

export default ImageGallery;
