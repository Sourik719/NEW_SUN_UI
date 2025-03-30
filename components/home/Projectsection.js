import { projectDetails } from "@/data/projects"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
const Projects = () => {
    return (
        <div className="w-full py-2 flex flex-col justify-center items-center bg-black">
            <p className="flex flex-row text-xl sm:text-3xl">
                <span className="text-white">WHAT DOES</span>
                <span className="text-orange-400 ml-1">TEAM NEW SUN FOUNDATION</span>
                <span className="text-white ml-1">DO ?</span>
            </p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5 }}
            >
                <div className="mt-4 flex flex-wrap justify-center">
                    {Object.keys(projectDetails).map((key) => {
                        const project = projectDetails[key];
                        return (
                            <div key={key} className="sm:w-1/2 md:w-1/3 w-full bg-transparent rounded-lg shadow-md px-10 py-2 flex flex-col justify-center items-center text-white my-1">
                                <Image src={project.image[0]} width={500} height={100} alt={project.label} />
                                <p className="font-semibold py-2 text-2xl text-yellow-400">{project.label}</p>
                                <p className="break-words my-1 text-center">{project.headLine}</p>
                                <Link href={`/projects/${project.href}`} className="text-center text-md font-bold text-blue-300 p-1 border-b-2 border-green-200 hover:border-green-500 hover:text-blue-400">
                                    Read More
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </motion.div >
        </div >
    )
}
export default Projects