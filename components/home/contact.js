import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
const Contact = () => {
    return (
        <div className="w-full flex flex-col bg-transparent text-white px-5 shadow-gray-600 shadow-sm rounded-sm items-center">
            <span className="px-2 py-2 text-3xl">
                Contact Us
            </span>
            <div className="flex  flex-col justify-end items-center py-5 px-2 group transition-transform duration-300">
                <div className="flex flex-row my-2">
                    <a className="text-black p-1" href="https://www.google.com/maps/place/Team+NEW+SUN/@22.6610194,88.379178,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89daada69fc67:0x1e128db1d24150c2!8m2!3d22.6610145!4d88.3817529!16s%2Fg%2F11j3wykqj2?entry=ttu">
                        <FaLocationDot />
                    </a>
                    <p>2/A,Degree College Road, Belgharia, Kol-56</p>
                </div>
                <div className="flex flex-row my-2">
                    <a className="text-black p-1" href="tel:+918617790162">
                        <FaPhone />
                    </a>
                    <p>+91 8617790162 /+91 8981277673</p>
                </div>
                <div className="flex flex-row my-2">
                    <a className="text-black p-1 text-xl" href="mailto:newsunngo2019@gmail.com">
                        <IoMail />
                    </a>
                    <p>newsunngo2019@gmail.com</p>
                </div>
                <div className="flex flex-row my-2">
                    <a className="text-2xl p-2 hover:scale-110" href="https://www.facebook.com/helpingsociety2019/"><FaFacebook /></a>
                    <a className="text-2xl p-2 hover:scale-110" href="https://www.instagram.com/newsun2019/"><FaInstagram /></a>
                    <a className="text-2xl p-2 hover:scale-110" href="https://www.youtube.com/@TeamNEWSUN2019"><FaYoutube /></a>
                    <a className="text-2xl p-2 hover:scale-110" href="https://twitter.com/newsunngo2019"><FaTwitter /></a>
                </div>
            </div>
        </div>
    )
}

export default Contact;