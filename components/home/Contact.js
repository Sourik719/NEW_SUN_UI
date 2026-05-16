import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
const Contact = () => {
    return (
        <section className="w-full bg-stone-50 px-5 py-16 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Contact Us</p>
                    <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">Let us build something kind together.</h2>
                    <p className="mt-4 text-lg leading-8 text-slate-700">
                        Reach out for volunteering, event sponsorship, collaboration, or donation support.
                    </p>
                </div>

                <div className="grid gap-4 text-slate-800 sm:grid-cols-2">
                    <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm sm:col-span-2">
                        <a className="inline-flex items-start gap-3 font-semibold hover:text-orange-700" href="https://www.google.com/maps/place/Team+NEW+SUN/@22.6610194,88.379178,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89daada69fc67:0x1e128db1d24150c2!8m2!3d22.6610145!4d88.3817529!16s%2Fg%2F11j3wykqj2?entry=ttu" target="_blank" rel="noopener noreferrer">
                        <FaLocationDot />
                            <span>2/A, Degree College Road, Belgharia, Kolkata-56</span>
                    </a>
                    </div>
                    <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
                        <a className="inline-flex items-center gap-3 font-semibold hover:text-orange-700" href="tel:+918617790162">
                        <FaPhone />
                            <span>+91 8617790162</span>
                    </a>
                    </div>
                    <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
                        <a className="inline-flex items-center gap-3 font-semibold hover:text-orange-700" href="mailto:contact@teamnewsunfoundation.org">
                        <IoMail />
                            <span>contact@teamnewsunfoundation.org</span>
                    </a>
                    </div>
                    <div className="flex rounded-md border border-stone-200 bg-white p-5 text-2xl shadow-sm sm:col-span-2">
                        <a className="mr-4 transition hover:scale-110 hover:text-blue-600" aria-label="Facebook" href="https://www.facebook.com/helpingsociety2019/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a className="mr-4 transition hover:scale-110 hover:text-pink-600" aria-label="Instagram" href="https://www.instagram.com/teamnewsunofficial" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a className="mr-4 transition hover:scale-110 hover:text-red-600" aria-label="YouTube" href="https://www.youtube.com/@TeamNEWSUN2019" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                        <a className="transition hover:scale-110 hover:text-slate-700" aria-label="X" href="https://twitter.com/newsunngo2019" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;
