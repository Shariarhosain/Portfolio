import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectsData } from '../data/portfolio';
import ProjectDetails from './ProjectDetails';

const Projects = () => {
  // Show only the first 8 projects
  const featuredProjects = projectsData.slice(0, 8);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleProjectClick = (project) => {
    // If project has live demo, open it in new tab
    if (project.demo && project.demo !== "#") {
      window.open(project.demo, '_blank');
    } 
    // Otherwise show project details modal (for projects with only GitHub)
    else if (project.github !== "#") {
      setSelectedProject(project);
      setIsDetailsOpen(true);
    }
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900/30 to-gray-900 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Here are some of my recent projects showcasing my backend development skills and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)"
              }}
              onClick={() => handleProjectClick(project)}
              className={`bg-gray-800/60 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500 group cursor-pointer ${
                project.demo !== "#" ? 'hover:border-blue-400/50 hover:shadow-blue-500/20' : 'hover:border-cyan-400/50'
              }`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  style={{ minHeight: '224px' }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                
                {/* Click hints based on project type */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  {project.demo !== "#" ? (
                    <span className="text-white text-sm font-medium bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-2">
                      <FaExternalLinkAlt className="text-xs" />
                      Click to view live demo
                    </span>
                  ) : project.github !== "#" ? (
                    <span className="text-white text-sm font-medium bg-cyan-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-400/30">
                      Click for project details
                    </span>
                  ) : (
                    <span className="text-white text-sm font-medium bg-gray-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-400/30">
                      Project showcase
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/20 hover:border-cyan-400/40 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {project.github !== "#" && (
                    <div className="flex items-center space-x-2 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                      <FaGithub className="group-hover:rotate-6 transition-transform duration-300" />
                      <span className="text-sm font-medium">Code Available</span>
                    </div>
                  )}
                  {project.demo !== "#" && (
                    <div className="flex items-center space-x-2 text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                      <FaExternalLinkAlt className="group-hover:rotate-6 transition-transform duration-300" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetails
        project={selectedProject}
        isOpen={isDetailsOpen}
        onClose={closeDetails}
      />
    </section>
  );
};

export default Projects;
