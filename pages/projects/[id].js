import ImageCarousel from "@/components/projects/Imagechain";
import ProjectComponent from "@/components/projects/TextSection";
import Container from "@/components/ui/Container";
import { projectDetails } from "@/data/projects";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
const projectPage = () => {
    const router = useRouter();
    const { id } = router.query;
    if (!id || !projectDetails[id]) {
        return <Container>Project not found</Container>;
    }
    const project = projectDetails[id];

    return (
        <Container className="bg-stone-50">
            <Head>
                <title>{project.label} || TEAM NEW SUN FOUNDATION</title>
            </Head>
            <main className="px-5 py-16 sm:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div>
                            <Link href="/" className="text-sm font-bold uppercase tracking-wide text-orange-600 hover:text-orange-700">Team New Sun Foundation</Link>
                            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">{project.label}</h1>
                            <p className="mt-5 text-lg leading-8 text-slate-700">{project.headLine}</p>
                        </div>
                        <div className="relative min-h-[320px] overflow-hidden rounded-md shadow-xl">
                            <Image src={project.image[0]} alt={project.label} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" unoptimized priority />
                        </div>
                    </div>

            <ImageCarousel images={project.image} />

            <ProjectComponent project={project} />
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[project.image[2], project.image[1], project.image[0]].map((src, index) => (
                            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm" key={src + index}>
                                <Image src={src} alt={`${project.label} moment ${index + 1}`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" unoptimized />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

        </Container>
    )
}
export default projectPage;
