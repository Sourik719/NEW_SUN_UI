import Container from "@/components/ui/Container";
import { projectDetails } from "@/data/projects";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const projectCharm = {
    specialdaycelebration: {
        eyebrow: "Shared celebrations",
        charm: "A personal milestone becomes a table full of laughter, food, and children who feel remembered.",
        accent: "orange",
        highlights: ["100+ special days", "Birthdays and anniversaries", "Joy-led giving"],
        cta: "Sponsor a Celebration",
        ctaHref: "/donate/sponsor",
    },
    agomonirahobane: {
        eyebrow: "Durga Puja outreach",
        charm: "New clothes, Pujo excitement, and the dignity of being included in Bengal's biggest festival.",
        accent: "rose",
        highlights: ["Festive garments", "Children and elders", "Pujo Porikroma"],
        cta: "Support the Festival Drive",
        ctaHref: "/donate/cause",
    },
    sampreeti: {
        eyebrow: "Culture and togetherness",
        charm: "Independence Day turns into a stage where art, music, and young talent meet community pride.",
        accent: "sky",
        highlights: ["Cultural performances", "Drawing competitions", "Community stage"],
        cta: "Explore the Gallery",
        ctaHref: "/gallery",
    },
    sobujersondhane: {
        eyebrow: "Environment action",
        charm: "A sapling becomes a promise: shade, care, and a greener habit passed to the next generation.",
        accent: "emerald",
        highlights: ["Tree plantation", "Youth awareness", "World Environment Day"],
        cta: "Donate to a Cause",
        ctaHref: "/donate/cause",
    },
    winterssmile: {
        eyebrow: "Winter relief",
        charm: "Warmth arrives quietly: a jacket, a blanket, and the relief of facing winter with dignity.",
        accent: "blue",
        highlights: ["Blankets and jackets", "Tribal village outreach", "Christmas spirit"],
        cta: "Help Spread Warmth",
        ctaHref: "/donate/cause",
    },
};

const accentClasses = {
    orange: {
        text: "text-orange-600",
        bg: "bg-orange-600",
        soft: "bg-orange-50",
        border: "border-orange-200",
        chip: "bg-orange-100 text-orange-700",
        ring: "ring-orange-200",
    },
    rose: {
        text: "text-rose-600",
        bg: "bg-rose-600",
        soft: "bg-rose-50",
        border: "border-rose-200",
        chip: "bg-rose-100 text-rose-700",
        ring: "ring-rose-200",
    },
    sky: {
        text: "text-sky-600",
        bg: "bg-sky-600",
        soft: "bg-sky-50",
        border: "border-sky-200",
        chip: "bg-sky-100 text-sky-700",
        ring: "ring-sky-200",
    },
    emerald: {
        text: "text-emerald-600",
        bg: "bg-emerald-600",
        soft: "bg-emerald-50",
        border: "border-emerald-200",
        chip: "bg-emerald-100 text-emerald-700",
        ring: "ring-emerald-200",
    },
    blue: {
        text: "text-blue-600",
        bg: "bg-blue-600",
        soft: "bg-blue-50",
        border: "border-blue-200",
        chip: "bg-blue-100 text-blue-700",
        ring: "ring-blue-200",
    },
};

const cleanImages = (images = []) => images.map((image) => image.trim()).filter(Boolean);

const projectPage = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id || !projectDetails[id]) {
        return (
            <Container className="bg-stone-50">
                <main className="px-5 py-16 text-center sm:px-8">
                    <div className="mx-auto max-w-2xl rounded-md border border-stone-200 bg-white p-8 shadow-xl">
                        <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Project</p>
                        <h1 className="mt-3 text-3xl font-extrabold text-slate-950">Project not found</h1>
                        <Link href="/" className="mt-6 inline-flex rounded-md bg-orange-600 px-5 py-3 font-bold text-white transition hover:bg-orange-700">
                            Back to Home
                        </Link>
                    </div>
                </main>
            </Container>
        );
    }

    const project = projectDetails[id];
    const charm = projectCharm[id] || projectCharm.specialdaycelebration;
    const accent = accentClasses[charm.accent];
    const images = cleanImages(project.image);
    const heroImage = images[0];
    const chapterImages = images.slice(1);

    return (
        <Container className="bg-stone-50">
            <Head>
                <title>{project.label} | Team New Sun Foundation</title>
            </Head>
            <main>
                <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-slate-950 text-white">
                    <Image
                        src={heroImage}
                        alt={project.label}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-45"
                        unoptimized
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/15" />
                    <div className="relative mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl flex-col justify-end px-5 pb-10 pt-20 sm:px-8 lg:pb-14">
                        <Link href="/" className={`mb-6 w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20`}>
                            Team New Sun Foundation
                        </Link>
                        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
                            <div>
                                <p className={`text-sm font-bold uppercase tracking-wide ${accent.text}`}>{charm.eyebrow}</p>
                                <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">{project.label}</h1>
                                <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-stone-100">{project.headLine}</p>
                            </div>
                            <div className={`rounded-md border ${accent.border} bg-white/95 p-5 text-slate-950 shadow-2xl backdrop-blur`}>
                                <p className={`text-sm font-bold uppercase tracking-wide ${accent.text}`}>Project Charm</p>
                                <p className="mt-3 text-lg font-extrabold leading-7">{charm.charm}</p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {charm.highlights.map((highlight) => (
                                        <span key={highlight} className={`rounded-full px-3 py-1 text-sm font-bold ${accent.chip}`}>{highlight}</span>
                                    ))}
                                </div>
                                <Link href={charm.ctaHref} className={`mt-5 inline-flex w-full justify-center rounded-md px-5 py-3 font-bold text-white transition ${accent.bg} hover:brightness-95`}>
                                    {charm.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-5 py-12 sm:px-8">
                    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[300px_1fr]">
                        <aside className="lg:sticky lg:top-28 lg:h-fit">
                            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
                                <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Storyline</p>
                                <nav className="mt-4 space-y-2">
                                    {project.content.map((section, index) => (
                                        <a
                                            href={`#section-${index}`}
                                            key={section.section}
                                            className="block rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-700"
                                        >
                                            {String(index + 1).padStart(2, '0')} · {section.section}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Large Image */}
                                <div className="relative h-[420px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
                                    <Image
                                        src={images[0]}
                                        alt={`${project.label} cover`}
                                        fill
                                        className="object-cover transition duration-500 hover:scale-105"
                                        unoptimized
                                    />
                                </div>

                                {/* Right Column */}
                                <div className="grid gap-4">
                                    {images.slice(1, 3).map((image, index) => (
                                        <div
                                            key={image + index}
                                            className="relative h-[200px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm"
                                        >
                                            <Image
                                                src={image}
                                                alt={`${project.label} ${index + 2}`}
                                                fill
                                                className="object-cover transition duration-500 hover:scale-105"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {project.content.map((section, index) => {
                                const image = chapterImages[index % chapterImages.length] || heroImage;
                                const reverse = index % 2 === 1;

                                return (
                                    <article
                                        id={`section-${index}`}
                                        key={section.section}
                                        className={`scroll-mt-28 overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm lg:grid lg:grid-cols-[0.9fr_1.1fr] ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
                                    >
                                        <div className="relative min-h-[280px]">
                                            <Image
                                                src={image}
                                                alt={`${project.label} ${section.section}`}
                                                fill
                                                sizes="(min-width: 1024px) 36vw, 100vw"
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="p-6 sm:p-8">
                                            <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold text-white ${accent.bg}`}>
                                                {index + 1}
                                            </div>
                                            <h2 className="text-3xl font-extrabold leading-tight text-slate-950">{section.section}</h2>
                                            <p className="mt-5 text-lg leading-8 text-slate-700">{section.text}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className={`px-5 pb-16 sm:px-8`}>
                    <div className={`mx-auto max-w-7xl overflow-hidden rounded-md border ${accent.border} ${accent.soft}`}>
                        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_420px] lg:items-center">
                            <div>
                                <p className={`text-sm font-bold uppercase tracking-wide ${accent.text}`}>Keep the story moving</p>
                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950">Every project grows through people who choose to show up.</h2>
                                <p className="mt-4 text-lg leading-8 text-slate-700">{charm.charm}</p>
                                <Link href={charm.ctaHref} className={`mt-6 inline-flex rounded-md px-6 py-3 font-bold text-white transition ${accent.bg} hover:brightness-95`}>
                                    {charm.cta}
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {images.slice(3, 7).map((image, index) => (
                                    <div key={image + index} className="relative aspect-square overflow-hidden rounded-md border border-white/80 bg-white shadow-sm">
                                        <Image
                                            src={image}
                                            alt={`${project.label} gallery ${index + 1}`}
                                            fill
                                            sizes="(min-width: 1024px) 210px, 45vw"
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Container>
    )
}

export default projectPage;
