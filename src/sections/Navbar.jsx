import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Navigation = ({ isMobile = false, onItemClick }) => {
  const [active, setActive] = useState("Home");
  const links = ["Home", "About", "Work", "Contact"];

  // Stagger animation for mobile menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: isMobile ? -50 : 0,
      y: isMobile ? 0 : 20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <motion.ul 
      className={`flex ${isMobile ? "flex-col space-y-6" : "flex-col items-center space-y-12"} h-full justify-center`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {links.map((link,) => (
        <motion.li
          key={link}
          className="relative cursor-pointer group"
          variants={itemVariants}
          onClick={() => {
            setActive(link);
            if (onItemClick) onItemClick();
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.a
            href={`#${link.toLowerCase()}`}
            className={`relative text-neutral-400 hover:text-white transition-all duration-300 text-lg font-medium ${
              active === link ? "text-cyan-400" : ""
            }`}
            style={{
              writingMode: isMobile ? "horizontal-tb" : "vertical-rl",
              transform: isMobile ? "none" : "rotate(180deg)",
            }}
            whileHover={{
              textShadow: "0 0 8px rgba(6, 182, 212, 0.6)",
            }}
          >
            {link}
            
            {/* Animated underline for mobile */}
            {isMobile && (
              <motion.div
                className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
          </motion.a>

          {/* Vertical indicator for desktop */}
          {!isMobile && active === link && (
            <motion.div
              layoutId="active-indicator"
              className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-500 rounded-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            />
          )}

          {/* Glowing dot animation for desktop */}
          {!isMobile && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.5, 1],
                opacity: active === link ? [0.5, 1, 0.5] : 0
              }}
              transition={{
                duration: 2,
                repeat: active === link ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll position for navbar effects
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Animated hamburger icon variants
  const topLine = {
    closed: { rotate: 0, y: 0, scaleX: 1 },
    open: { rotate: 45, y: 7, scaleX: 1.1 },
  };
  const middleLine = {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0.8 },
  };
  const bottomLine = {
    closed: { rotate: 0, y: 0, scaleX: 1 },
    open: { rotate: -45, y: -7, scaleX: 1.1 },
  };

  // Backdrop blur based on scroll
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"]);
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);

  return (
    <>
      {/* Desktop vertical sidebar */}
      <motion.div 
        className="hidden sm:flex fixed top-0 left-0 z-50 w-16 h-screen bg-black/80 backdrop-blur-sm border-r border-white/10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        style={{
          backdropFilter: backdropBlur,
          backgroundColor: `rgba(0, 0, 0, ${navOpacity})`
        }}
       
      >
        <Navigation />
        
        {/* Animated border gradient */}
        <motion.div
          className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Mobile hamburger */}
      <motion.div 
        className="sm:hidden fixed top-4 left-4 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.9, rotate: -5 }}
      >
        <motion.button
          className={`text-white focus:outline-none p-3 rounded-xl backdrop-blur-sm transition-all duration-300 ${
            isScrolled ? 'bg-black/70 shadow-lg' : 'bg-black/50'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileHover={{
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          }}
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <motion.div
              className="w-full h-0.5 bg-gradient-to-r from-white to-cyan-300 rounded-full"
              variants={topLine}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.div
              className="w-full h-0.5 bg-gradient-to-r from-white to-cyan-300 rounded-full"
              variants={middleLine}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.div
              className="w-full h-0.5 bg-gradient-to-r from-white to-cyan-300 rounded-full"
              variants={bottomLine}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Mobile drawer menu with overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Simple overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              transition={{ duration: 0.3 }}
            />
            
            {/* Mobile menu drawer with enhanced styling */}
            <motion.div
              className="fixed top-0 left-0 w-3/4 max-w-xs h-full z-50 bg-gradient-to-b from-black/95 via-black/90 to-gray-900/95 backdrop-blur-md shadow-2xl border-r border-white/10"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ 
                x: "-100%", 
                opacity: 0,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                opacity: { duration: 0.2 }
              }}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative z-10 p-6 h-full">
                <Navigation isMobile onItemClick={() => setIsOpen(false)} />
                
                {/* Enhanced close button */}
                <motion.button
                  className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 90,
                    boxShadow: "0 0 15px rgba(6, 182, 212, 0.4)"
                  }}
                  whileTap={{ scale: 0.9, rotate: -90 }}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Decorative elements */}
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleX: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;