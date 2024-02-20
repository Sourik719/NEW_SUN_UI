import Image from "next/image"

const Background = () => {
    return (<div className="absolute w-full h-full pointer-events-none">
        <Image
            src={"/registration.svg"}
            alt="Background"
            width={0}
            height={0}
            priority
            className="rounded-xl w-full h-full object-cover"
        />
    </div>)
}

export default Background