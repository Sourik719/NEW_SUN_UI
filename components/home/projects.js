import Image from "next/image"
const Purpose = () => {
    return (
        <div className="w-full flex flex-col bg-black px-2 items-center py-5">
            <p className="text-white text-3xl py-10">WHAT IS TEAM NEW SUN?</p>


            <div className="flex flex-col sm:flex-row justify-center text-justify text-white text-md px-5 w-full">
                <p><Image className="sm:w-1/3 w-full h-[200px] hover:scale-105 duration-300 float-left px-5 pb-2" src={"/Sampreeti.jpg"} height={500} width={500} />
                    We, at Team NEW SUN, are a dedicated social welfare organization committed to the betterment of those most in need within our communities. Our mission is clear: to uplift individuals, particularly children, who find themselves at the bottom rungs of the economic ladder.
                    Our vision revolves around providing not just opportunities but also the essential support needed for children to realize their aspirations and dreams. Through our various initiatives, we aim to address the diverse needs of vulnerable members across different segments of society.
                    However, our work extends beyond direct assistance. We firmly believe in the power of inspiration and motivation. While we may not be able to solve every problem on our own, we strive to ignite a spark in others to join us in our mission. Together, we can create a ripple effect of positive change, paving the way for a brighter tomorrow.</p>
            </div>

        </div>

    )
}
export default Purpose