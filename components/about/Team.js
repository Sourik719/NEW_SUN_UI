import PositionHolder from "./Teammembers";

const Team = () => {
    return (
        <section className="flex w-full flex-col items-center bg-white px-5 py-16 sm:px-8">
            <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Core Team</p>
            <h2 className="mb-8 mt-3 max-w-3xl text-center text-3xl font-extrabold text-slate-950 sm:text-4xl">
                Meet the people behind{" "}
                <span className="text-orange-600">TEAM NEW SUN FOUNDATION</span>
            </h2>
            <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <PositionHolder
                    name="Sourik Bhuiya"
                    position="Director and Project Coordinator - UDAAN"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364632/core%20member%202026-27/IMG-20260501-WA0010.jpg_psrhod.jpg"
                />
                <PositionHolder
                    name="Bikram Basak"
                    position="Director and Project Coordinator - SUNSHINE"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779365398/core%20member%202026-27/img_1767622849736.jpg_eplnls.jpg"
                />
                <PositionHolder
                    name="Arup Dey"
                    position="Treasurer and Project Coordinator - UDAAN"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743071036/core-member/xoo50c45j1gf0i2hfbgf.jpg"
                />
                <PositionHolder
                    name="Kaustuv Das"
                    position="Project Coordinator - Sobujer Sondhane"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743076914/core-member/bkx1askxrbtv0t8cobrs.jpg"
                />
                <PositionHolder
                    name="Rupali Bhuiya"
                    position="Project Coordinator - Sobujer Sondhane"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364633/core%20member%202026-27/IMG-20260502-WA0001_1_-a_vzrxfn.jpg"
                />
                <PositionHolder
                    name="Sudipa Saha"
                    position="Project Coordinator - Sobujer Sondhane"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364829/core%20member%202026-27/IMG-20260426-WA0004_1.jpg_jd8pd6.jpg"
                />
                <PositionHolder
                    name="Sayantan Raha"
                    position="Project Coordinator - BOIGHOR"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364632/core%20member%202026-27/IMG-20260426-WA0022.jpg_zaz9ie.jpg"
                />
                <PositionHolder
                    name="Debanjan Mandal"
                    position="Project Coordinator - BOIGHOR"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364632/core%20member%202026-27/IMG_20260502_123056.jpg_ttpxn4.jpg"
                />
                <PositionHolder
                    name="Sanchari Dey"
                    position="Head of Women Cell & Project Coordinator - SURAKSHA"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364633/core%20member%202026-27/IMG-20260430-WA0002.jpg_zfxgts.jpg"
                />
                <PositionHolder
                    name="Soumita Mullick"
                    position="Head of Women Cell & Project Coordinator - SURAKSHA"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364728/core%20member%202026-27/IMG-20260426-WA0008.jpg_olfmrv.jpg"
                />
                <PositionHolder
                    name="Sucharita Dey"
                    position="Head of Social Media & PR Cell"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/t_Sucharita_Dey/core-member/a8fon10cmn8hipgzxqca"
                />
                <PositionHolder
                    name="Ayantika Ghosh"
                    position="Head of Social Media & PR Cell"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364633/core%20member%202026-27/IMG-20260502-WA0001_1.jpg_e42ii8.jpg"
                />
                <PositionHolder
                    name="Anisha Adhikary"
                    position="Head of Cultural Cell & Coordinator - SAMPREETI"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364632/core%20member%202026-27/IMG-20260430-WA0002-a_cnfroy.jpg"
                />
                <PositionHolder
                    name="Kankana Basak"
                    position="Head of Cultural Cell & Coordinator - SAMPREETI"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/c_crop,g_north,h_800,w_800/core-member/rslvcnphfbfe6rxjo40p"
                />

                <PositionHolder
                    name="Sohon Biswas"
                    position="Project Coordinator - SUNSHINE"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1779364632/core%20member%202026-27/IMG-20260501-WA0002.jpg_tla60q.jpg"
                />

            </div>
            <p className="mx-auto mt-10 max-w-4xl rounded-md bg-slate-950 p-6 text-center font-semibold leading-7 text-stone-100">
                Our organization's strength and impact are a testament to the collective
                efforts of many. Beyond our core team, dedicated volunteers tirelessly
                contribute their time and skills during our projects. We are also
                deeply grateful to our esteemed well-wishers, whose invaluable
                guidance and feedback shape our direction. Finally, the unwavering
                belief and generous donations from our supporters enable us to
                continue our vital work and bring our projects to fruition.
            </p>
        </section>
    );
};

export default Team;
