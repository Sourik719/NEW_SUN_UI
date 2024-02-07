import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="w-full items-center py-2 px-10 flex flex-row justify-between bottom-10 items-center">
            <p className="w-2/3 text-black px-10">
                All Rights Reserved. Team NEW SUN.
            </p>
            <div className="flex flex-row">
                <a className="text-xl p-2" href="https://www.facebook.com/helpingsociety2019/"><FaFacebook /></a>
                <a className="text-xl p-2" href="https://www.instagram.com/newsun2019/"><FaInstagram /></a>
                <a className="text-xl p-2" href="https://www.youtube.com/@TeamNEWSUN2019"><FaYoutube /></a>
                <a className="text-xl p-2" href="https://twitter.com/newsunngo2019"><FaTwitter /></a>
            </div>
        </div>
    )
}
export default Footer;