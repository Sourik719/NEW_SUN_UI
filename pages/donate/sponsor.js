import QueryForm from "@/components/sponsor/queryForm";
import Container from "@/components/ui/Container";
import Head from "next/head";
const sponsorEvent = () => {
    return (<Container className="bg-stone-50">
        <Head>
            <title>Sponsor an Event | Team New Sun Foundation</title>
        </Head>
        <main className="px-5 py-16 sm:px-8">
            <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Sponsor an Event</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
                Celebrate your special day in a way children remember.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">Turn birthdays, anniversaries, and milestones into food, learning materials, and joyful moments for children who need them most.</p>
        </div>
        <div className="mt-10 grid overflow-hidden rounded-md border border-stone-200 bg-white shadow-xl md:grid-cols-[0.8fr_1.2fr]">
            <div className="h-[350px]">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/6L6MNBHx6dg?si=Yc5ha3AXwnEpWIqf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="p-6 md:h-[350px] md:overflow-y-auto sm:p-8">
                <h2 className="text-2xl font-extrabold leading-tight text-slate-950">
                    Transforming special days into priceless smiles.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-700">Throughout the year, we celebrate numerous special days, birthdays, anniversaries, and milestones that mark significant moments in our lives. We host parties, share treats with friends and family, and revel in the joy these occasions bring. However, have you ever considered that by allocating just a quarter of your celebration budget, you could make a profound impact on the lives of many children?

                    Imagine transforming your joy into theirs by providing essential items such as food or educational accessories. While the idea might seem daunting—figuring out where to go, how to arrange it, and dealing with the logistics—it doesn't have to be. This is where Team New Sun Foundation steps in.
                </p>
            </div>
        </div>

        <div className="my-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
                <div className="text-2xl font-extrabold text-slate-950">
                    Here’s how we make it simple for you:
                </div>
                <div className="mt-4 space-y-4 leading-7 text-slate-700">
                    <h1 className="font-bold text-xl py-2">Seamless Arrangements:</h1> We handle all the logistics, from identifying the needs of children to delivering the items. You don’t have to worry about a thing.<br />

                    <h1 className="font-bold text-xl py-2">Transparency and Accountability:</h1> We ensure that every donation is used effectively and provide feedback on how your contribution has made a difference.<br />

                    <h1 className="font-bold text-xl py-2">Personalized Experiences:</h1> Whether it’s a birthday, anniversary, or any other celebration, we create a personalized experience for you, connecting you with the joy of the children you’ve helped.
                </div>
            </div>
            <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
                <div className="text-2xl font-extrabold text-slate-950">
                    How you can contribute ?
                </div>
                <div className="mt-4 space-y-4 leading-7 text-slate-700">
                    <h1 className="font-bold text-xl py-2">Donate a Portion of Your Budget:</h1> Just a quarter of your celebration budget can go a long way in providing food, school supplies, or other necessities for children in need.<br />

                    <h1 className="font-bold text-xl py-2">Volunteer Your Time:</h1> If you prefer a hands-on approach, we welcome volunteers to help in organizing and distributing the donations.<br />

                    <h1 className="font-bold text-xl py-2">Spread the Word:</h1> Tell your friends and family about Team New Sun Foundation. The more people who get involved, the bigger the impact we can make.
                </div>
            </div>

        </div>
        <div className="mx-auto max-w-4xl rounded-md bg-slate-950 p-6 text-center font-semibold leading-8 text-white">
            Celebrate your next special day with the knowledge that you’re making a difference. By choosing to share your joy with those less fortunate, you’re not just creating memories for yourself, but also for the children whose lives you touch.

            Join us in our mission to spread happiness and make every special day a little more special for everyone involved.

            <div className="my-1 text-2xl font-extrabold text-orange-300">Contact Team New Sun Foundation today and let’s make those priceless smiles happen together!</div>
        </div>
        <div className="flex justify-center">
            <QueryForm />
        </div>
            </div>
        </main>
    </Container>
    )
}
export default sponsorEvent;
