import { motion } from "framer-motion";
import { useEffect, useRef, useState } from 'react';

const ProjectComponent = ({ project }) => {
    const [selectedSection, setSelectedSection] = useState(null);
    const sidebarRefs = useRef([]);
    const contentRefs = useRef([]);


    const handleScroll = () => {
        const contentContainer = document.getElementById('contentContainer');
        if (!contentContainer) return;


        const scrollPosition = contentContainer.scrollTop + contentContainer.clientHeight / 2;
        let index = 0;

        for (let i = 0; i < contentRefs.current.length; i++) {
            const sectionRef = contentRefs.current[i];
            const sectionTop = sectionRef.offsetTop;
            const sectionBottom = sectionTop + sectionRef.clientHeight;

            // Check if scroll position is within the bounds of the current section
            if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
                index = i;
                break;
            }

        }

        if (selectedSection !== index) {
            setSelectedSection(index);
        }
    };

    useEffect(() => {
        const contentContainer = document.getElementById('contentContainer');
        if (contentContainer) {
            contentContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (contentContainer) {
                contentContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleSectionClick = (index) => {
        if (contentRefs.current[index]) {
            contentRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
        setSelectedSection(index);
    };

    return (
        <div className="relative my-8 overflow-hidden rounded-md border border-stone-200 bg-white text-slate-800 shadow-sm">
            <div className="absolute left-0 h-full w-0 overflow-y-auto border-r border-stone-200 bg-stone-50 invisible md:visible md:w-1/4">
                <ul className="list-none">
                    {project.content.map((section, index) => (
                        <motion.li
                            key={index}
                            ref={(el) => (sidebarRefs.current[index] = el)}
                            className={`cursor-pointer p-5 ${selectedSection === index ? 'bg-orange-600 font-bold text-white' : 'font-semibold text-slate-700 hover:bg-orange-50'}`}
                            onClick={() => handleSectionClick(index)}
                            animate={{ fontSize: selectedSection === index ? '1.05rem' : '1rem' }}
                            transition={{ duration: 0.5 }}
                        >
                            {section.section}
                        </motion.li>
                    ))}
                </ul>
            </div>

            <div id="contentContainer" className="relative h-[520px] w-full overflow-y-auto p-5 md:left-1/4 md:w-3/4 md:p-8">
                <div className="mx-1 my-3 space-y-8">
                    {project.content.map((section, index) => (
                        <div
                            key={index}
                            ref={(el) => (contentRefs.current[index] = el)}
                            className="cursor-pointer"
                        >
                            <h2 className="my-2 text-2xl font-extrabold text-slate-950">{section.section}</h2>
                            <p className="text-base leading-8 text-slate-700 sm:text-lg">
                                {section.text}
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default ProjectComponent;
