import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  // Typewriter effect state - using useMemo to prevent re-creation on every render
  const wordsToType = useMemo(() => [
    "Backend Developer",
    "API Designer", 
    "Problem Solver",
    "Tech Enthusiast",
    "Team Leader"
  ], []);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const handleTyping = () => {
      const fullWord = wordsToType[currentWordIndex];

      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(80);
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullWord) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordsToType.length);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingSpeed, currentWordIndex, wordsToType]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900/30 to-gray-900 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
      </div>

      {/* Parallax Background Shapes */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative container mx-auto text-center z-10"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ 
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-44 h-44 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1.5 shadow-2xl shadow-blue-500/25"
          >
            <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden ring-2 ring-white/10">
              <img
                src="/images/profile.png"
                alt="Md. Shariar Hosain Sanny"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
        >
          Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Md Shariar Hosain Sanny</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <div className="h-16 md:h-20 flex items-center justify-center">
            <div className="text-2xl md:text-3xl text-center">
              <span className="text-gray-200">I'm a </span>
              <span className="text-white font-bold">
                {currentText}
              </span>
              <span className="text-white font-bold animate-blink">|</span>
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg  mt-3 md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Building efficient, scalable, and <span className=" text-white">reliable backend applications</span> with modern technologies.
          Passionate about <span className=" text-white">problem-solving and team leadership</span>.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-8 mb-12"
        >
          <motion.a
            whileHover={{ scale: 1.3, rotate: 10, y: -5 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/Shariarhosain"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
          >
            <FaGithub size={28} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.3, rotate: 10, y: -5 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.linkedin.com/in/shariar-hosain-sanny"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-blue-400 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-400/25"
          >
            <FaLinkedin size={28} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.3, rotate: 10, y: -5 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:shariarhosain131529@gmail.com"
            className="p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-purple-400 hover:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-purple-400/25"
          >
            <FaEnvelope size={28} />
          </motion.a>
        </motion.div>

        <motion.a
          variants={itemVariants}
          href="#about"
          className="inline-block mb-8"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.a>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16 mb-8 flex justify-center"
        >
          <motion.a
            href="#about"
            aria-label="Scroll down"
            animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-12 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors duration-300">
              <svg 
                className="w-6 h-6 text-cyan-400 hover:text-blue-400 transition-colors duration-300" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.a>
        </motion.div>

      </motion.div>

      {/* Custom CSS for typewriter and scroll animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
