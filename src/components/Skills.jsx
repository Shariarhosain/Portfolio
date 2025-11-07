import React from 'react';
import { motion } from 'framer-motion';
import {
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaPython,
  FaCog,
  FaHtml5,
  FaCss3Alt,
} from 'react-icons/fa';
import {
  SiMongodb,
  SiExpress,
  SiPostgresql,
  SiNestjs,
  SiPhp,
  SiLaravel,
  SiRedis,
  SiRabbitmq,
  SiSocketdotio,
  SiFirebase,
  SiJsonwebtokens,
  SiNextdotjs,
  SiTailwindcss,
  SiPostman,
  SiSwagger,
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-400' },
        { name: 'Express', icon: <SiExpress />, color: 'text-gray-300' },
        { name: 'Nest.js', icon: <SiNestjs />, color: 'text-red-400' },
        { name: 'PHP', icon: <SiPhp />, color: 'text-purple-400' },
        { name: 'Python', icon: <FaPython />, color: 'text-yellow-400' },
        { name: 'Laravel', icon: <SiLaravel />, color: 'text-red-400' },
      ],
    },
    {
      title: 'Frontend',
      skills: [
        { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-white' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'text-cyan-400' },
        { name: 'HTML5', icon: <FaHtml5 />, color: 'text-orange-500' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: 'text-blue-500' },
      ],
    },
    {
      title: 'Database & Cache',
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-400' },
        { name: 'MySQL', icon: <FaDatabase />, color: 'text-orange-400' },
        { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-400' },
        { name: 'Redis', icon: <SiRedis />, color: 'text-red-400' },
        { name: 'Prisma', icon: <FaDatabase />, color: 'text-indigo-400' },
      ],
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'RabbitMQ', icon: <SiRabbitmq />, color: 'text-orange-400' },
        { name: 'Socket.io', icon: <SiSocketdotio />, color: 'text-cyan-400' },
        { name: 'Firebase', icon: <SiFirebase />, color: 'text-yellow-400' },
        { name: 'JWT', icon: <SiJsonwebtokens />, color: 'text-green-400' },
        { name: 'Git', icon: <FaGitAlt />, color: 'text-orange-400' },
        { name: 'Postman', icon: <SiPostman />, color: 'text-orange-500' },
        { name: 'Swagger', icon: <SiSwagger />, color: 'text-green-500' },
        { name: 'CI/CD', icon: <FaCog />, color: 'text-blue-400' },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-24 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-32 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
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
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* First row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {skillCategories.slice(0, 3).map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl shadow-2xl hover:border-cyan-500/30 transition-all duration-300"
              >
                <h3 className="text-3xl font-bold mb-8 text-center text-white">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 8,
                        y: -10,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                      }}
                      className="flex flex-col items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl shadow-lg hover:border-cyan-400/30 transition-all duration-300 group"
                    >
                      <div className={`text-6xl mb-3 ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                        {skill.icon}
                      </div>
                      <span className="text-white text-sm font-medium text-center group-hover:text-cyan-300 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Second row - 1 card centered */}
          {skillCategories.length > 3 && (
            <div className="flex justify-center">
              <motion.div
                key={skillCategories[3].title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 3 * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl shadow-2xl hover:border-cyan-500/30 transition-all duration-300 w-full max-w-sm"
              >
                <h3 className="text-3xl font-bold mb-8 text-center text-white">
                  {skillCategories[3].title}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {skillCategories[3].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 8,
                        y: -10,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                      }}
                      className="flex flex-col items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm border border-white/5 rounded-2xl shadow-lg hover:border-cyan-400/30 transition-all duration-300 group"
                    >
                      <div className={`text-6xl mb-3 ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                        {skill.icon}
                      </div>
                      <span className="text-white text-sm font-medium text-center group-hover:text-cyan-300 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
