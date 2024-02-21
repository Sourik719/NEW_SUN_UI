import Carousel from "@/components/home/carousel"
import Contact from "@/components/home/contact"
import FeedbackCont from "@/components/home/feedbackView"
import Purpose from "@/components/home/purpose"
import Head from "next/head"
const Home = () => {
    return (<div className="bg-black">
        <Head>
            <title>Home</title>
        </Head>
        <Carousel />
        <Purpose />
        <FeedbackCont />
        <Contact />
    </div>)
}

export default Home
