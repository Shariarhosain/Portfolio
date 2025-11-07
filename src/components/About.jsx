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
    <section id="about" className="relative py-24 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
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
              As a backend developer at MAK Tech Solution, I focus on building efficient, scalable, 
              and reliable applications. I have experience in teaching, problem-solving, and leading 
              development teams through complex technical challenges.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              My expertise includes Node.js, Express.js, Nest.js, Prisma, Redis, and RabbitMQ. 
              I've built microservices, implemented caching solutions, and developed robust backend 
              architectures for various high-impact projects.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              I graduated with a GPA of 3.86/4.00 in Computer Science and Engineering from AIUB. 
              My passion for education and helping others motivates me to make a positive impact 
              in the tech community.
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
