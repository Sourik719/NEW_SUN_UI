import Carousel from "@/components/home/carousel"
import Contact from "@/components/home/contact"
import Purpose from "@/components/home/projects"
import Container from "@/components/ui/Container"

const Home = () => {
    return (<Container>
        <Carousel />
        <Purpose />
        <Contact />
    </Container>)
}

export default Home
