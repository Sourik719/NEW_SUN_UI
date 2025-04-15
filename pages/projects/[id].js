import ImageCarousel from "@/components/projects/Imagechain";
import ProjectComponent from "@/components/projects/TextSection";
import Container from "@/components/ui/Container";
import { projectDetails } from "@/data/projects";
import Head from "next/head";
import { useRouter } from "next/router";
const projectPage = () => {
    const router = useRouter();
    const { id } = router.query;
    if (!id || !projectDetails[id]) {
        return <Container>Project not found</Container>;
    }
    const project = projectDetails[id];

    return (
        <Container className={"bg-lime-200"}>
            <Head>
                <title>{project.label} || TEAM NEW SUN FOUNDATION</title>
            </Head>
            <div className="text-4xl sm:text-5xl font-bold mx-10 p-2 text-orange-500 items-center mt-10">{project.label}
                <hr className="my-2 border-2 border-blue-400 rounded-xl" />
            </div>

            <ImageCarousel images={project.image} />

            <ProjectComponent project={project} />
            <div className="flex md:flex-row flex-col justify-center items-center">
                <img src={project.image[2]} className="h-[200px] w-[250px] border-2 m-2 rounded-md" />
                <img src={project.image[1]} className="h-[200px] w-[250px] border-2 m-2 rounded-md" />
                <img src={project.image[0]} className="h-[200px] w-[250px] border-2 m-2 rounded-md" />
            </div>



        </Container>
    )
}
export default projectPage;