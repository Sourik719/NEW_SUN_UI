import Goals from "@/components/about/Goals";
import Journey from "@/components/about/Journey";
import Team from "@/components/about/Team";
import Container from "@/components/ui/Container";

const aboutUs = () => {
    return (
        <Container>
            <Journey />
            <div className="flex flex-col md:flex-row">
                <Goals />
                <Team />
            </div>
        </Container>
    )
}
export default aboutUs;