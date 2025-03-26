import { FaFacebook, FaHeart, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

const Footer = () => {
    return (<footer className="flex flex-col sm:flex-row sm:justify-between items-center bg-slate-900 text-white text-sm p-4 sm:p-10">
        <section className="text-center sm:text-left mb-7 sm:mb-0">
            <p>&copy; {new Date().getFullYear()} TEAM NEW SUN FOUNDATION. All rights reserved.</p>
            <p className="flex justify-center sm:justify-start mt-2">
                <span>Made with</span>
                <span className="text-red-500 px-1 mt-1"><FaHeart /></span>
                <span>by our volunteers</span>
            </p>
        </section>
        <section className="text-center justify-center items-center text-md">
            <p className="mb-2">Registered as section-8 company under Ministry of Corporate Affairs</p>
            <p className="text-orange-500 font-bold">CIN: U88900WB2024NPL269257</p>
            <p className="mt-2 text-orange-500 font-bold">Darpan ID: WB/2024/0429114</p>
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