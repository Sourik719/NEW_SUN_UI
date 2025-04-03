import Carousel from "@/components/home/Carousel.js"
import Contact from "@/components/home/Contact.js"
import FeedbackCont from "@/components/home/feedbackView.js"
import Participation from "@/components/home/Participation.js"
import Projects from "@/components/home/Projectsection.js"
import Purpose from "@/components/home/Purpose.js"
import Container from "@/components/ui/Container.js"
import Head from "next/head"

const Home = () => {
    return (<Container>
        <Head>
            <title>Home || TEAM NEW SUN FOUNDATION</title>
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
