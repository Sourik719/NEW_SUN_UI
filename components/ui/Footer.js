import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaHeart } from "react-icons/fa"

const Footer = () => {
    return (<footer className="flex flex-col sm:flex-row sm:justify-between items-center bg-slate-900 text-white text-sm p-4 sm:p-10">
        <section className="text-center sm:text-left mb-7 sm:mb-0">
            <p>&copy; {new Date().getFullYear()} Team New Sun NGO. All rights reserved.</p>
            <p className="flex justify-center sm:justify-start mt-2">
                <span>Made with</span>
                <span className="text-red-500 px-1 mt-1"><FaHeart /></span>
                <span>by our volunteers</span>
            </p>
        </section>
        <section className="flex flex-col items-center">
            <p>Follow us on</p>
            <div className="text-xl space-x-0.5 flex mt-2">
                <a className="p-2 cursor-pointer" aria-label="facebook" href="https://www.facebook.com/helpingsociety2019/" target="_blank">
                    <FaFacebook />
                </a>
                <a className="p-2 cursor-pointer" aria-label="instagram" href="https://www.instagram.com/newsun2019/" target="_blank">
                    <FaInstagram />
                </a>
                <a className="p-2 cursor-pointer" aria-label="youtube" href="https://www.youtube.com/@TeamNEWSUN2019" target="_blank">
                    <FaYoutube />
                </a>
                <a className="p-2 cursor-pointer" aria-label="twitter" href="https://twitter.com/newsunngo2019" target="_blank">
                    <FaTwitter />
                </a>
            </div>
        </section>
    </footer>)
}

export default Footer