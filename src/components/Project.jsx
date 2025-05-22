import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="relative"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div
        className="flex flex-col items-start justify-between py-10 gap-7 sm:flex-row sm:items-center "
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
        onFocus={() => setPreview(image)}
        onBlur={() => setPreview(null)}
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-medium text-white">{title}</h3>
          <div className="flex flex-wrap gap-3 text-neutral-400">
            {tags.map((tag) => (
              <motion.span
                key={tag.id}
                className="px-3 py-1 text-sm rounded-full bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {tag.name}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg group bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg hover:shadow-purple-500/25"
       
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          aria-label={`Read more about ${title}`}
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>
      </div>

      {/* Divider with animation */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent w-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectDetails
            title={title}
            description={description}
            subDescription={subDescription}
            image={image}
            tags={tags}
            href={href}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Project;