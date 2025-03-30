import Goals from "@/components/about/Goals";
import Journey from "@/components/about/Journey";
import Team from "@/components/about/Team";
import Container from "@/components/ui/Container";

const aboutUs = () => {
    return (
        <Container className="bg-orange-300">
            <Journey />
            <div className="flex flex-col ">
                <Goals />
                <Team />
            </div>
        </Container>
    )
}
export default aboutUs;