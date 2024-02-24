import Carousel from "@/components/home/carousel"
import Contact from "@/components/home/contact"
import FeedbackCont from "@/components/home/feedbackView"
import Participation from "@/components/home/Participation"
import Projects from "@/components/home/projects"
import Purpose from "@/components/home/purpose"
import Container from "@/components/ui/Container"
import Head from "next/head"

const Home = () => {
    return (<Container>
        <Head>
            <title>Home</title>
        </Head>
        <Carousel />
        <Purpose />
        <Projects />
        <Participation />
        <FeedbackCont />
        <Contact />
    </Container>)
}

export default Home
