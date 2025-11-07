import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../data/portfolio';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/30 to-gray-900 overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            My academic background and educational achievements
          </p>
        </motion.div>

        <div className="space-y-8">
          {educationData.map((education, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute right-8 top-16 w-0.5 h-full bg-gradient-to-b from-purple-400 to-pink-600"></div>
              
              {/* Timeline dot */}
              <div className="absolute right-6 top-8 w-4 h-4 bg-purple-400 rounded-full border-4 border-slate-900 z-10 shadow-lg shadow-purple-400/50"></div>
              
              <div className="mr-16 bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {education.degree}
                    </h3>
                    <div className="flex items-center text-purple-400 mb-2">
                      <i className="fas fa-university mr-2"></i>
                      <span className="font-semibold">{education.institution}</span>
                    </div>
                    <div className="flex items-center text-gray-300 mb-2">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      <span>{education.location}</span>
                    </div>
                    {education.gpa && (
                      <div className="flex items-center text-green-400 mb-2">
                        <i className="fas fa-star mr-2"></i>
                        <span className="font-semibold">GPA: {education.gpa}</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-gradient-to-r from-purple-400 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mt-4 md:mt-0">
                    {education.period}
                  </div>
                </div>

                <p className="text-gray-300">
                  {education.description}
                </p>

                {/* Education Icon */}
                <div className="mt-6 flex justify-end">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                    <i className="fas fa-graduation-cap text-2xl text-purple-400"></i>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;