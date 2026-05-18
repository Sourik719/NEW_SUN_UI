import Goals from "@/components/about/Goals";
import Journey from "@/components/about/Journey";
import Team from "@/components/about/Team";
import Container from "@/components/ui/Container";
import Head from "next/head";
const aboutUs = () => {
    return (

        <Container className="bg-white">
            <Head>
                <title>About Us | Team New Sun Foundation</title>
            </Head>
            <Journey />
            <div className="flex flex-col ">
                <Goals />
                <Team />
            </div>
        </Container>
    )
}
export default aboutUs;
