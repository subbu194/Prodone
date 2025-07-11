import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X, ArrowLeft, ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce platform built with React and Node.js, featuring advanced search, payment integration, and admin dashboard.',
      shortDescription: 'Modern e-commerce platform with advanced features',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1556742049-0cfedf6a45d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfedf6a45d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfedf6a45d?w=600&h=400&fit=crop',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      features: [
        'Advanced product search and filtering',
        'Secure payment processing',
        'Real-time inventory management',
        'Admin dashboard with analytics',
        'Mobile-responsive design'
      ]
    },
    {
      id: 2,
      title: 'AI-Powered Chatbot',
      category: 'AI Integration',
      description: 'An intelligent chatbot solution that uses natural language processing to provide customer support and automate responses.',
      shortDescription: 'Intelligent chatbot with NLP capabilities',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      ],
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      features: [
        'Natural language processing',
        'Multi-language support',
        'Integration with CRM systems',
        'Analytics and reporting',
        'Custom training capabilities'
      ]
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'Mobile Development',
      description: 'A secure mobile banking application with biometric authentication, real-time transactions, and financial analytics.',
      shortDescription: 'Secure mobile banking with biometric auth',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      ],
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      features: [
        'Biometric authentication',
        'Real-time transaction monitoring',
        'Investment portfolio tracking',
        'Bill payment automation',
        'Financial goal setting'
      ]
    },
    {
      id: 4,
      title: 'Project Management Tool',
      category: 'Web Development',
      description: 'A comprehensive project management platform with task tracking, team collaboration, and real-time updates.',
      shortDescription: 'Comprehensive project management platform',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      ],
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      features: [
        'Real-time collaboration',
        'Task and milestone tracking',
        'Team communication tools',
        'Progress analytics',
        'File sharing and management'
      ]
    },
    {
      id: 5,
      title: 'Smart Home Dashboard',
      category: 'IoT & AI',
      description: 'An intelligent home automation dashboard that controls smart devices and provides energy consumption insights.',
      shortDescription: 'Smart home automation and energy monitoring',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      ],
      technologies: ['React', 'Python', 'MQTT', 'TensorFlow', 'Raspberry Pi'],
      liveUrl: '#',
      githubUrl: '#',
      features: [
        'Device automation and scheduling',
        'Energy consumption analytics',
        'Voice control integration',
        'Security monitoring',
        'Mobile app control'
      ]
    },
    {
      id: 6,
      title: 'Fitness Tracking App',
      category: 'Mobile Development',
      description: 'A comprehensive fitness tracking application with workout plans, nutrition tracking, and social features.',
      shortDescription: 'Comprehensive fitness tracking and social features',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      ],
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'HealthKit'],
      liveUrl: '#',
      githubUrl: '#',
      features: [
        'Workout planning and tracking',
        'Nutrition and calorie counting',
        'Social features and challenges',
        'Progress analytics',
        'Wearable device integration'
      ]
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-dark-900/50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
          >
            Our Portfolio
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our latest work and see how we've helped businesses transform their digital presence.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
              className="card group cursor-pointer overflow-hidden"
              onClick={() => openModal(project)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-primary-500 rounded-full p-3">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <span className="text-primary-400 text-sm font-medium">{project.category}</span>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.shortDescription}</p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-dark-700 flex items-center justify-between">
                  <div>
                    <span className="text-primary-400 text-sm font-medium">{selectedProject.category}</span>
                    <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Image Carousel */}
                  <div className="relative mb-6">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
                        >
                          <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
                        >
                          <ArrowRight className="w-5 h-5 text-white" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                index === currentImageIndex ? 'bg-primary-500' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Project Overview</h4>
                      <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.description}</p>
                      
                      <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-md border border-primary-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary w-full flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Live Project</span>
                        </a>
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary w-full flex items-center justify-center space-x-2"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Source Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio; 