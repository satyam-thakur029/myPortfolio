import { motion } from "framer-motion";

const HireMeButton = () => {
  const email = "thakursatyam029@gmail.com";
  
  const handleClick = () => {
    // Open Gmail compose with your email as recipient
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Let's%20work%20together!&body=Hi%20Satyam,`, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      className="relative px-8 py-4 rounded-full bg-gradient-to-r from-primary to-indigo-600 text-white font-medium cursor-pointer shadow-lg hover:shadow-primary/30 transition-all group overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        Hire Me
      </span>
      
      {/* Animated background effect */}
      <motion.span 
        className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
      />
    </motion.button>
  );
};

export default HireMeButton;