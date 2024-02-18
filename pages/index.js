import Head from "next/head"
import Carousel from "@/components/home/carousel"
import Contact from "@/components/home/contact"
import Purpose from "@/components/home/purpose"
import Container from "@/components/ui/Container"

const Home = () => {
    return (<Container className="bg-yellow-100">
        <Head>
            <title>Home</title>
        </Head>
        <Carousel />
        <Purpose />
        <Contact />
    </Container>)
}

export default Home
