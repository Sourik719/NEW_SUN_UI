import PositionHolder from "./Teammembers";

const Team = () => {
    return (
        <div className="w-full bg-slate-800 py-12 px-6 flex flex-col items-center">
            <h2 className="text-3xl text-white font-bold mb-8">
                Meet the people behind <span className="text-orange-500">TEAM NEW SUN FOUNDATION</span>
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <PositionHolder
                    name="Sourik Bhuiya"
                    position="Director"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743072064/core-member/qqsycbs28zxanckeqrwf.jpg"
                />
                <PositionHolder
                    name="Bikram Basak"
                    position="Director"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743071038/core-member/jdj9tpl3mnnm7arbkzj3.jpg"
                />
                <PositionHolder
                    name="Kaustuv Das"
                    position="Treasurer"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743076914/core-member/bkx1askxrbtv0t8cobrs.jpg"
                />
                <PositionHolder
                    name="Arup Dey"
                    position="Treasurer"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743071036/core-member/xoo50c45j1gf0i2hfbgf.jpg"
                />
                <PositionHolder
                    name="Sayantan Raha"
                    position="Head of Operations"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743078132/core-member/gcnjg32aru6dnztlgaiz.jpg"
                />
                <PositionHolder
                    name="Rupali Bhuiya"
                    position="Head of Operations"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743101959/core-member/yf2zn761f7vsr9qx3knh.jpg"
                />
                <PositionHolder
                    name="Sanchari Dey"
                    position="Head of Women Cell"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743097787/core-member/qedhhdu4pwbgwzpdusno.jpg"
                />
                <PositionHolder
                    name="Soumita Mullick"
                    position="Head of Women Cell"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743101795/core-member/rskwjuirthf3u3u36lyu.jpg"
                />
                <PositionHolder
                    name="Sucharita Dey"
                    position="Social Media Manager"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/t_Sucharita_Dey/core-member/a8fon10cmn8hipgzxqca"
                />
                <PositionHolder
                    name="Ayantika Ghosh"
                    position="Social Media Manager"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743097670/core-member/heefvdx37oevu8tv2ecn.jpg"
                />
                <PositionHolder
                    name="Anisha Adhikary"
                    position="Head of Cultural Cell"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743145133/core-member/d46z9pdjvenkxreuxdqb.jpg"
                />
                <PositionHolder
                    name="Kankana Basak"
                    position="Head of Cultural Cell"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/c_crop,g_north,h_800,w_800/core-member/rslvcnphfbfe6rxjo40p"
                />
                <PositionHolder
                    name="Niladri Banerjee"
                    position="Project Coordinator-Boighor"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743071037/core-member/fhq3l8wl3nwssdo3spp4.jpg"
                />
                <PositionHolder
                    name="Sohon Biswas"
                    position="Project Coordinator-SUNSHINE"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/c_scale,h_1600,w_1600/core-member/lcukteyr2fnt1y5zh7ok"
                />
                <PositionHolder
                    name="Debanjan Mandal"
                    position="Project Coordinator-Sobujer Sondhane"
                    imageUrl="https://res.cloudinary.com/dcikuo4sk/image/upload/v1743071039/core-member/vtsa5qkpijwtjoeifkfj.jpg"
                />
            </div>
            <p className="text-yellow-500 font-bold text-center">Our organization's strength and impact are a testament to the collective efforts of many. Beyond our core team, dedicated volunteers tirelessly contribute their time and skills during our projects. We are also deeply grateful to our esteemed well-wishers, whose invaluable guidance and feedback shape our direction. Finally, the unwavering belief and generous donations from our supporters enable us to continue our vital work and bring our projects to fruition.


            </p>
        </div>
    );
};

export default Team;