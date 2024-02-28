import { motion } from "framer-motion";
import Image from "next/image";

const Purpose = () => {
    return (
        <div className="w-full flex flex-col bg-black px-2 items-center py-5">
            <div className="flex text-white text-3xl py-10">
                <h2>WHAT IS</h2>
                <h2 className="text-orange-400 ml-1">TEAM NEW SUN?</h2>
            </div>
            <motion.div
                initial={{ opacity: 0, x: -100 }} // Initial animation state
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "easeOut", duration: 2 }}
            >
                <div className="flex flex-col sm:flex-row justify-center text-justify text-white text-md px-3 w-full">
                    <Image
                        src={"https://res.cloudinary.com/dcikuo4sk/image/upload/v1708759744/samples/New-Sun-Projects/IMG_3631_rheuof.jpg"}
                        height={300}
                        width={300}
                        className="float-left w-full sm:w-1/4 mx-2"
                    />
                    <p className="px-2">
                        We, at Team NEW SUN, are a dedicated social welfare organization committed to the betterment of those most in need within our communities. Our mission is clear: to uplift individuals, particularly children, who find themselves at the bottom rungs of the economic ladder. Our vision revolves around providing not just opportunities but also the essential support needed for children to realize their aspirations and dreams. Through our various initiatives, we aim to address the diverse needs of vulnerable members across different segments of society. However, our work extends beyond direct assistance. We firmly believe in the power of inspiration and motivation. While we may not be able to solve every problem on our own, we strive to ignite a spark in others to join us in our mission. Together, we can create a ripple effect of positive change, paving the way for a brighter tomorrow.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Purpose;
