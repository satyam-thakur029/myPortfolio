import { motion, AnimatePresence } from "framer-motion";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

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
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-y-auto"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={closeModal}
      >
        <motion.div
          className="relative w-full max-w-4xl border shadow-2xl rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 overflow-hidden"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
        >
          {/* Close Button */}
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

          {/* Project Image */}
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src={image} 
              alt={title} 
              className="object-cover w-full h-64 md:h-80 lg:h-96"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
          </motion.div>

          {/* Project Content */}
          <div className="p-6 md:p-8">
            <motion.h3 
              className="mb-3 text-3xl font-bold text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h3>

            <motion.p 
              className="mb-4 text-lg text-neutral-300"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {description}
            </motion.p>

            {subDescription.map((subDesc, index) => (
              <motion.p
                key={index}
                className="mb-3 text-neutral-400"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                {subDesc}
              </motion.p>
            ))}

            {/* Tags and CTA */}
            <motion.div 
              className="flex flex-col items-start justify-between gap-6 mt-8 sm:flex-row sm:items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap gap-3 ">
                {tags.map((tag) => (
                  <motion.div
                    key={tag.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="transition-all"
                  >
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="w-10 h-10 rounded-lg"
                      title={tag.name}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-sm font-medium transition-all rounded-lg bg-sky-600/90 hover:bg-sky-500/90 text-white group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View Project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;