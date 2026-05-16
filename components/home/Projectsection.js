import { projectDetails } from "@/data/projects"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
const Projects = () => {
    return (
        <section className="w-full bg-stone-50 px-5 py-16 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Our Initiatives</p>
                    <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                        Programs shaped around joy, dignity, and awareness.
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-slate-700">
                        Each project is designed to answer a real community need while inviting more people to participate in meaningful service.
                    </p>
                </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 5 }}
            >
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Object.keys(projectDetails).map((key) => {
                        const project = projectDetails[key];
                        return (
                                <article key={key} className="group flex h-full flex-col overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={project.image[0]}
                                        alt={project.label}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                            unoptimized
                                    />
                                </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <p className="text-xl font-extrabold text-slate-950">{project.label}</p>
                                        <p className="mt-3 flex-1 leading-7 text-slate-600">{project.headLine}</p>
                                        <Link href={`/projects/${project.href}`} className="mt-5 inline-flex w-fit rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600">
                                            View Project
                                </Link>
                                    </div>
                                </article>
                        );
                    })}
                </div>
            </motion.div >
            </div>
        </section>
    )
}
export default Projects
