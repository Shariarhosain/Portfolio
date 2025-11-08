import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaCode />,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices',
    },
    {
      icon: <FaLightbulb />,
      title: 'Problem Solving',
      description: 'Creative solutions to complex technical challenges',
    },
    {
      icon: <FaRocket />,
      title: 'Fast Delivery',
      description: 'Efficient development with attention to detail',
    },
  ];

  return (
    <section id="about" className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900/30 to-gray-900 overflow-hidden -mt-1">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
      </div>

      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-4xl font-bold mb-8 text-white">
              Backend Developer | Problem Solver
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              I'm passionate about building web applications and solving real-world problems through code. 
              With experience in backend and full stack development, I love collaborating on innovative 
              projects and contributing to the tech community.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              You should consider working with me because of my strong analytical thinking, problem-solving 
              mindset, and genuine passion for web technologies. Whenever I face challenges, I enjoy diving 
              deep into solutions—partly because teaching others pushes me to understand problems thoroughly!
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              I can work effectively under pressure, and honestly, I enjoy that intensity. I have strong 
              knowledge in PostgreSQL, MySQL, SQL databases, and backend frameworks like Node.js (Express.js, 
              Nest.js). I'm also skilled with Prisma ORM, frontend basics, real-time communication (Socket.io), 
              and requirement analysis.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              I chose to major in Information Systems because information is everywhere—and the web is the 
              best place to capture and harness it. That's why I love coding for the web.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
                }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-6">
                  <div className="text-5xl text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
