
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
            className="relative w-full overflow-hidden bg-slate-950 p-3"
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
                        className="mx-1 h-32 w-auto rounded-md border border-white/20 object-cover shadow-sm"
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default ImageCarousel;
