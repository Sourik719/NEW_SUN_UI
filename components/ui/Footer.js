import Link from "next/link";
import { FaFacebook, FaHeart, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <p className="text-lg font-extrabold">TEAM NEW SUN FOUNDATION</p>
          <p className="mt-3 text-sm leading-6 text-stone-300">A volunteer-driven nonprofit creating practical support, awareness, and joy across communities.</p>
          <p className="mt-4 flex text-sm text-stone-300">
            <span>Made with</span>
            <span className="text-red-500 px-1 mt-px">
              <FaHeart />
            </span>
            <span>by our volunteers</span>
          </p>
        </section>

        <section>
          <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Registration</p>
          <p className="mt-3 text-sm leading-6 text-stone-300">Registered as section-8 company under Ministry of Corporate Affairs</p>
          <p className="mt-3 text-sm font-bold text-white">CIN: U88900WB2024NPL269257</p>
          <p className="mt-1 text-sm font-bold text-white">Darpan ID: WB/2024/0429114</p>
        </section>

        <section>
          <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Quick Links</p>
          <div className="mt-3 grid gap-2 text-sm text-stone-300">
            <Link className="hover:text-white" href="/about">About</Link>
            <Link className="hover:text-white" href="/gallery">Gallery</Link>
            <Link className="hover:text-white" href="/join-us">Join us</Link>
            <Link className="hover:text-white" href="/donate/cause">Donate</Link>
          </div>
        </section>

        <section>
          <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Follow Us</p>
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
              href="https://www.instagram.com/teamnewsunofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              className="p-2 cursor-pointer hover:text-red-600 transition duration-300"
              aria-label="youtube"
              href="https://www.youtube.com/@TeamNEWSUN2019"
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
              <FaXTwitter/>
            </a>
          </div>
        </section>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-sm text-stone-400">© {new Date().getFullYear()} TEAM NEW SUN FOUNDATION. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
