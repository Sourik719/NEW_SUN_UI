import Image from "next/image";
import Link from "next/link";

const heroImages = [
    {
        src: "https://res.cloudinary.com/dcikuo4sk/image/upload/v1708784658/samples/New-Sun-Projects/IMG_3882_nzgp4a.jpg",
        label: "Sharing joy with children",
    },
    {
        src: "https://res.cloudinary.com/dcikuo4sk/image/upload/v1708758155/samples/New-Sun-Projects/IMG-20230604-WA0094_ntrmrp.jpg",
        label: "Community awareness drive",
    },
    {
        src: "https://res.cloudinary.com/dcikuo4sk/image/upload/v1708759372/samples/New-Sun-Projects/IMG-20220507-WA1012_d9o1ls.jpg",
        label: "Environmental protection volunteers",
    },
];

const Carousel = () => (
    <section className="relative overflow-hidden bg-stone-50">
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
            <div className="max-w-2xl">
                <p className="mb-4 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-orange-700">
                    Section 8 registered nonprofit
                </p>
                <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                    Helping children and communities rise with dignity.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
                    Team New Sun Foundation supports vulnerable children, families, and communities through celebrations, education-led awareness, cultural initiatives, and essential relief.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/donate/cause" className="rounded-md bg-orange-600 px-6 py-3 text-center text-base font-bold text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700">
                        Donate Now
                    </Link>
                    <Link href="/join-us" className="rounded-md border border-slate-300 bg-white px-6 py-3 text-center text-base font-bold text-slate-900 transition hover:border-slate-500 hover:bg-slate-100">
                        Join as Volunteer
                    </Link>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3 text-center sm:max-w-lg">
                    {[
                        ["5+", "Initiatives"],
                        ["100+", "Special days"],
                        ["2024", "Darpan ID"],
                    ].map(([value, label]) => (
                        <div className="rounded-md border border-stone-200 bg-white px-3 py-4 shadow-sm" key={label}>
                            <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative min-h-[360px] overflow-hidden rounded-md shadow-2xl sm:col-span-2 lg:min-h-[430px]">
                    <Image className="object-cover" src={heroImages[0].src} fill sizes="(min-width: 1024px) 54vw, 100vw" alt={heroImages[0].label} priority unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <p className="absolute bottom-5 left-5 text-2xl font-bold text-white">Sharing joy where it matters most</p>
                </div>
                {heroImages.slice(1).map((image) => (
                    <div className="relative min-h-[190px] overflow-hidden rounded-md shadow-lg" key={image.label}>
                        <Image className="object-cover" src={image.src} fill sizes="(min-width: 1024px) 27vw, 50vw" alt={image.label} unoptimized />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Carousel;
