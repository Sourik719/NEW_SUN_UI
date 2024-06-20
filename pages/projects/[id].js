import ImageCarousel from "@/components/projects/Imagechain";
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
        <Container>
            <div className="text-5xl font-bold mx-10 p-2 shadow-lg">{project.label}
                <hr className="my-2 border-2 " />
            </div>

            <ImageCarousel images={project.image} />

            <div className="p-2 mx-10 text-black text-xl text-justify">
                {Array.isArray(project.content) ? (
                    project.content.map((section, index) => (
                        <div className="my-3" key={index}>
                            <h1 className="font-bold text-2xl my-2">{section.section}</h1>
                            <p className="mx-6">{section.text}</p>
                        </div>
                    ))
                ) : (
                    <p>{project.content}</p>
                )}
            </div>


        </Container>
    )
}
export default projectPage;