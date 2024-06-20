
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ImageCarousel = ({ images }) => {
    const containerRef = useRef(null);
    const controls = useAnimation();

    const startLoopAnimation = (containerWidth) => {
        controls.start({
            x: [0, -containerWidth],
            transition: {
                duration: 6,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0

            }
        });
    };

    useEffect(() => {
        const containerWidth = containerRef.current ? containerRef.current.scrollWidth / 2 : 0;
        startLoopAnimation(containerWidth);

        return () => {
            controls.stop();
        };
    }, [controls]);

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden bg-gray-800 p-2"
        >
            <motion.div
                className="flex"
                initial={{ x: 0 }}
                animate={controls}
            >
                {images.concat(images).map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="h-32 w-auto object-cover border border-2 rounded-md mx-1"
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default ImageCarousel;
