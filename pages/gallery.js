import Container from "@/components/ui/Container";
import { imageData } from "@/data/galleryData";
import Head from "next/head";
import Image from 'next/image';
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";

const getImageCategory = (imageUrl) => {
    const decodedUrl = decodeURIComponent(imageUrl);
    const uploadPath = decodedUrl.split('/upload/')[1] || '';
    const pathParts = uploadPath.split('/').filter(Boolean);
    const category = pathParts.find((part) => !part.startsWith('v') && !part.includes('.'));

    if (!category || category === 'samples') return 'Community Work';
    return category.replace(/-/g, ' ');
};

const galleryImages = imageData.map((src, index) => ({
    id: `${src}-${index}`,
    src,
    category: getImageCategory(src),
}));

const ImageGallery = () => {
    const [visibleCount, setVisibleCount] = useState(12);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    const categories = useMemo(() => ['All', ...new Set(galleryImages.map((image) => image.category))], []);
    const filteredImages = useMemo(() => {
        if (activeCategory === 'All') return galleryImages;
        return galleryImages.filter((image) => image.category === activeCategory);
    }, [activeCategory]);

    const displayedImages = filteredImages.slice(0, visibleCount);
    const activeImage = activeImageIndex !== null ? filteredImages[activeImageIndex] : null;

    const handleLoadMore = () => {
        setVisibleCount((count) => count + 12);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setVisibleCount(12);
        setActiveImageIndex(null);
    };

    const showPreviousImage = () => {
        setActiveImageIndex((index) => (index === 0 ? filteredImages.length - 1 : index - 1));
    };

    const showNextImage = () => {
        setActiveImageIndex((index) => (index === filteredImages.length - 1 ? 0 : index + 1));
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (activeImageIndex === null) return;
            if (event.key === 'Escape') setActiveImageIndex(null);
            if (event.key === 'ArrowLeft') showPreviousImage();
            if (event.key === 'ArrowRight') showNextImage();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [activeImageIndex, filteredImages.length]);

    const hasMoreImages = displayedImages.length < filteredImages.length;

    return (
        <Container className="bg-stone-50">
            <Head>
                <title>Gallery | Team New Sun Foundation</title>
            </Head>
            <main className="px-5 py-16 sm:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Gallery</p>
                            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl">A glimpse of Team New Sun Foundation in action.</h1>
                            <p className="mt-5 text-lg leading-8 text-slate-700">Moments from outreach, celebrations, awareness drives, cultural programs, and community events.</p>
                        </div>
                        <div className="rounded-md border border-stone-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
                            {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
                        </div>
                    </div>

                    <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => handleCategoryChange(category)}
                                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${activeCategory === category
                                    ? 'border-orange-600 bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                    : 'border-stone-300 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {displayedImages.map((image, index) => {
                            const isFeature = index % 9 === 0;
                            const isTall = index % 7 === 3;

                            return (
                                <button
                                    type="button"
                                    key={image.id}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`group relative overflow-hidden rounded-md border border-stone-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${isFeature ? 'sm:col-span-2 sm:row-span-2' : ''} ${isTall ? 'lg:row-span-2' : ''}`}
                                >
                                    <Image
                                        src={image.src}
                                        alt={`${image.category} photo ${index + 1}`}
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                        fill
                                        sizes={isFeature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                                        priority={index < 4}
                                        unoptimized
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                                        <p className="text-sm font-bold text-white">{image.category}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {hasMoreImages && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                className="rounded-md bg-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700"
                            >
                                Load More Photos
                            </button>
                        </div>
                    )}
                </div>
            </main>
            {activeImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6">
                    <button
                        type="button"
                        onClick={() => setActiveImageIndex(null)}
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                        aria-label="Close gallery preview"
                    >
                        <FaXmark />
                    </button>
                    <button
                        type="button"
                        onClick={showPreviousImage}
                        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:block"
                        aria-label="Previous photo"
                    >
                        <FaChevronLeft />
                    </button>
                    <div className="w-full max-w-5xl">
                        <div className="relative mx-auto aspect-[4/3] max-h-[78vh] overflow-hidden rounded-md bg-slate-900 shadow-2xl">
                            <Image
                                src={activeImage.src}
                                alt={`${activeImage.category} selected photo`}
                                className="object-contain"
                                fill
                                sizes="100vw"
                                unoptimized
                                priority
                            />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-white">
                            <span>{activeImage.category}</span>
                            <span>{activeImageIndex + 1} of {filteredImages.length}</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={showNextImage}
                        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:block"
                        aria-label="Next photo"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </Container>
    );
}

export default ImageGallery;
