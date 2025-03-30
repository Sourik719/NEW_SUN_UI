import { FaFacebook, FaHeart, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 px-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section: Copyright and Made With Love */}
        <section className="text-center sm:text-left mb-6 sm:mb-0">
          <p className="text-sm">© {new Date().getFullYear()} TEAM NEW SUN FOUNDATION. All rights reserved.</p>
          <p className="flex justify-center sm:justify-start mt-2 text-sm">
            <span>Made with</span>
            <span className="text-red-500 px-1 mt-px">
              <FaHeart />
            </span>
            <span>by our volunteers</span>
          </p>
        </section>

        {/* Middle Section: Registration Information */}
        <section className="text-center mb-6 sm:mb-0">
          <p className="text-sm mb-2">Registered as section-8 company under Ministry of Corporate Affairs</p>
          <p className="text-orange-500 font-bold text-sm">CIN: U88900WB2024NPL269257</p>
          <p className="text-orange-500 font-bold text-sm mt-1">Darpan ID: WB/2024/0429114</p>
        </section>

        {/* Right Section: Follow Us */}
        <section className="flex flex-col items-center">
          <p className="text-sm mb-2">Follow us on</p>
          <div className="flex space-x-3 text-lg">
            <a
              className="p-2 cursor-pointer hover:text-blue-500 transition duration-300"
              aria-label="facebook"
              href="https://www.facebook.com/helpingsociety2019/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              className="p-2 cursor-pointer hover:text-pink-500 transition duration-300"
              aria-label="instagram"
              href="https://www.instagram.com/newsun2019/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className="p-2 cursor-pointer hover:text-red-600 transition duration-300"
              aria-label="youtube"
              href="https://www.youtube.com/@newsunfoundation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              className="p-2 cursor-pointer hover:text-blue-400 transition duration-300"
              aria-label="twitter"
              href="https://twitter.com/newsunngo2019"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;