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
                block: 'start',
            });
        }
        setSelectedSection(index);
    };

    return (
        <div className="md:mx-20 my-5 text-black text-xl text-justify rounded-md relative bg-orange-200">
            <div className="absolute left-0 md:w-1/4 w-1/3 h-full border-r border-gray-300 overflow-y-auto">
                <ul className="list-none">
                    {project.content.map((section, index) => (
                        <motion.li
                            key={index}
                            ref={(el) => (sidebarRefs.current[index] = el)}
                            className={`cursor-pointer p-5 ${selectedSection === index ? 'bg-blue-800 font-bold text-white rounded-md' : 'font-semibold'}`}
                            onClick={() => handleSectionClick(index)}
                            animate={{ fontSize: selectedSection === index ? '1.4rem' : '1.2rem' }}
                            transition={{ duration: 0.5 }}
                        >
                            {section.section}
                        </motion.li>
                    ))}
                </ul>
            </div>

            <div id="contentContainer" className="relative md:left-1/4 left-1/3 md:w-3/4 w-2/3 h-[350px] overflow-y-auto md:p-4 pt-2 pb-20 webkit-scrollbar-track">
                <div className="mx-1 my-3">
                    {project.content.map((section, index) => (
                        <div
                            key={index}
                            ref={(el) => (contentRefs.current[index] = el)}
                            className="my-3 cursor-pointer"
                        >
                            <h1 className="font-bold text-2xl my-2 text-blue-800">{section.section}</h1>
                            <p className="md:mx-6 mx-2 text-md my-2">
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
