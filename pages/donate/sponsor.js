import QueryForm from "@/components/sponsor/queryForm";
import Container from "@/components/ui/Container";
import Head from "next/head";
const sponsorEvent = () => {
    return (<Container className={"bg-red-200"}>
        <Head>
            <title>Celebrate your special days</title>
        </Head>
        <div className="font-semibold text-4xl text-center">
            Is your Special Day coming?
            <div className="text-orange-500 p-2">
                Celebrate it in a unique way.
            </div>
        </div>
        <div className="flex flex-col md:flex-row my-5 mx-5 rounded-lg">
            <div className="md:w-1/3 w-full h-[350px]">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/6L6MNBHx6dg?si=Yc5ha3AXwnEpWIqf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className="items-center"></iframe>
            </div>
            <div className="md:w-2/3 w-full bg-white md:h-[350px] md:overflow-y-auto">
                <h1 className="text-center text-pink-800 font-bold text-2xl pt-2">
                    Transforming Special Days into Priceless Smiles with <div className="text-orange-500 pt-2">
                        Team New Sun Foundation
                    </div> </h1>
                <p className="text-xl p-6 text-justify">Throughout the year, we celebrate numerous special days—birthdays, anniversaries, and milestones that mark significant moments in our lives. We host parties, share treats with friends and family, and revel in the joy these occasions bring. However, have you ever considered that by allocating just a quarter of your celebration budget, you could make a profound impact on the lives of many children?

                    Imagine transforming your joy into theirs by providing essential items such as food or educational accessories. While the idea might seem daunting—figuring out where to go, how to arrange it, and dealing with the logistics—it doesn't have to be. This is where Team New Sun Foundation steps in.
                </p>
            </div>
        </div>

        <div className="flex flex-col md:flex-row my-5 mx-5 rounded-lg">
            <div className="md:w-1/2 w-full mx-5 pr-5 md:border-r">
                <div className="text-orange-500 p-2 font-bold text-2xl ">
                    Here’s how we make it simple for you:
                </div>
                <div className="text-justify p-2">
                    <h1 className="font-bold text-xl py-2">Seamless Arrangements:</h1> We handle all the logistics, from identifying the needs of children to delivering the items. You don’t have to worry about a thing.<br />

                    <h1 className="font-bold text-xl py-2">Transparency and Accountability:</h1> We ensure that every donation is used effectively and provide feedback on how your contribution has made a difference.<br />

                    <h1 className="font-bold text-xl py-2">Personalized Experiences:</h1> Whether it’s a birthday, anniversary, or any other celebration, we create a personalized experience for you, connecting you with the joy of the children you’ve helped.
                </div>
            </div>
            <div className="md:w-1/2 w-full mx-5 pr-5">
                <div className="text-orange-500 p-2 font-bold text-2xl ">
                    How you can contribute ?
                </div>
                <div className="text-justify p-2">
                    <h1 className="font-bold text-xl py-2">Donate a Portion of Your Budget:</h1> Just a quarter of your celebration budget can go a long way in providing food, school supplies, or other necessities for children in need.<br />

                    <h1 className="font-bold text-xl py-2">Volunteer Your Time:</h1> If you prefer a hands-on approach, we welcome volunteers to help in organizing and distributing the donations.<br />

                    <h1 className="font-bold text-xl py-2">Spread the Word:</h1> Tell your friends and family about Team New Sun Foundation. The more people who get involved, the bigger the impact we can make.
                </div>
            </div>

        </div>
        <div className="mx-10 font-semibold text-center">
            Celebrate your next special day with the knowledge that you’re making a difference. By choosing to share your joy with those less fortunate, you’re not just creating memories for yourself, but also for the children whose lives you touch.

            Join us in our mission to spread happiness and make every special day a little more special for everyone involved.

            <div className="font-bold text-2xl my-1 text-blue-800">Contact Team New Sun Foundation today and let’s make those priceless smiles happen together!</div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <QueryForm />
        </div>
    </Container>
    )
}
export default sponsorEvent;
