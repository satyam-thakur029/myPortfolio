"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

const ExperienceModal = ({ experience, closeModal }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    exit: { opacity: 0, scale: 0.95, y: 10 }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-y-auto bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div
          className="relative w-full max-w-4xl border shadow-2xl rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            onClick={closeModal}
            className="absolute z-10 p-2 transition-all rounded-full top-4 right-4 bg-midnight/80 hover:bg-gray-700/80 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>

          <div className="p-8">
            <div className="flex flex-col gap-4 mb-6 md:flex-row">
              {experience.images && experience.images.map((img, index) => (
                <motion.div 
                  key={index}
                  className={`relative overflow-hidden rounded-lg ${
                    // On mobile (md:hidden), show only first image. On desktop (hidden md:flex), show all images
                    index === 0 ? 'flex md:flex-1' : 'hidden md:flex md:flex-1'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <img 
                    src={img} 
                    alt={`${experience.title} - ${experience.job}`}
                    className="object-cover w-full h-48"
                    loading="lazy"
                    onError={(e) => {
                      console.log('Image failed to load:', img);
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>

            <motion.h3 
              className="mb-2 text-3xl font-bold text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {experience.title} - {experience.job}
            </motion.h3>

            <motion.div 
              className="flex flex-wrap items-center gap-4 mb-6 text-neutral-400"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <span>{experience.date}</span>
            </motion.div>

            <div className="space-y-4">
              {experience.contents.map((content, index) => (
                <motion.p
                  key={index}
                  className="text-neutral-300"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  {content}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <h2 className="text-heading">My Work Experience</h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight">
                <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
              </div>
              <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                <h3>{item.date}</h3>
                <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden">
                <h3>{item.date}</h3>
                <h3 className="text-xl text-neutral-400">{item.title}</h3>
                <h3 className="text-xl text-neutral-500">{item.job}</h3>
              </div>
              
              {/* Show only first 1-2 lines in preview */}
              <div className="mb-4">
                <p className="font-normal text-neutral-400 line-clamp-2">
                  {item.contents[0]}
                </p>
              </div>
              
              <motion.button
                onClick={() => setSelectedExperience(item)}
                className="px-4 py-2 text-sm font-medium transition-all rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25"
          

                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Read More
              </motion.button>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
      
      {/* Modal for showing full experience details */}
      <AnimatePresence>
        {selectedExperience && (
          <ExperienceModal
            experience={selectedExperience}
            closeModal={() => setSelectedExperience(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};