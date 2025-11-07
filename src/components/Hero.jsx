import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
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
          <motion.p
            className="text-2xl m-5 md:text-3xl text-gray-300 mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-bold text-white">Backend Developer | API Designer | Tech Enthusiast </span> 
          </motion.p>
          
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

        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12"
        >
          <FaArrowDown className="mx-auto text-cyan-400" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
