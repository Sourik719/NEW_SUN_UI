import Carousel from "@/components/home/Carousel"
import Contact from "@/components/home/Contact"
import FeedbackCont from "@/components/home/feedbackView"
import Participation from "@/components/home/Participation"
import Projects from "@/components/home/Projects"
import Purpose from "@/components/home/Purpose"
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
