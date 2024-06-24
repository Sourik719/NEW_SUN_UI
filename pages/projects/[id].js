import ImageCarousel from "@/components/projects/Imagechain";
import ProjectComponent from "@/components/projects/TextSection";
import Container from "@/components/ui/Container";
import { projectDetails } from "@/data/projects";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
const projectPage = () => {
    const router = useRouter();
    const { id } = router.query;
    if (!id || !projectDetails[id]) {
        return <Container>Project not found</Container>;
    }
    const project = projectDetails[id];
    const [selectedSection, setSelectedSection] = useState(null);

    const sectionRefs = useRef([]);
    const sidebarRefs = useRef([]);
    const handleSectionClick = (index) => {
        setSelectedSection(index);
        sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Container>
            <div className="text-5xl font-bold mx-10 p-2 text-orange-500">{project.label}
                <hr className="my-2 border-2 " />
            </div>

            <ImageCarousel images={project.image} />

            <ProjectComponent project={project} />



        </Container>
    )
}
export default projectPage;