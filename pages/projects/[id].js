import ImageCarousel from "@/components/projects/Imagechain";
import ProjectComponent from "@/components/projects/TextSection";
import Container from "@/components/ui/Container";
import { projectDetails } from "@/data/projects";
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
            <div className="text-5xl font-bold mx-20 p-2 text-yellow-500">{project.label}
                <hr className="my-2 border-2 border-blue-400 rounded-xl" />
            </div>

            <ImageCarousel images={project.image} />

            <ProjectComponent project={project} />
            <div className="flex md:flex-row flex-col justify-center">
                <img src={project.image[2]} className="h-[200px] w-[300px] border-2 m-2 rounded-md" />
                <img src={project.image[1]} className="h-[200px] w-[300px] border-2 m-2 rounded-md" />
                <img src={project.image[0]} className="h-[200px] w-[300px] border-2 m-2 rounded-md" />
            </div>



        </Container>
    )
}
export default projectPage;