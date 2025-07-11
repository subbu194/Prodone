import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Globe, 
  Smartphone, 
  Brain, 
  ArrowRight,
  CheckCircle 
} from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
      features: [
        'React & Next.js Development',
        'E-commerce Solutions',
        'Custom CMS Development',
        'API Integration',
        'Performance Optimization',
        'SEO Optimization'
      ],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      features: [
        'React Native Development',
        'iOS & Android Apps',
        'App Store Optimization',
        'Push Notifications',
        'Offline Functionality',
        'App Maintenance'
      ],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
      features: [
        'Chatbot Development',
        'Predictive Analytics',
        'Image Recognition',
        'Natural Language Processing',
        'Automation Solutions',
        'AI Consulting'
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
  ];

  return (
    <section id="services" className="section-padding bg-dark-950">
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
            Our Services
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Services We <span className="gradient-text">Offer</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We provide comprehensive digital solutions tailored to your business needs. 
            From web development to AI integration, we've got you covered.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
              className={`card ${service.bgColor} ${service.borderColor} hover-lift group relative overflow-hidden`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {service.features.slice(0, 3).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary w-full flex items-center justify-center space-x-2 group"
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-white">
            Technologies We <span className="gradient-text">Use</span>
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-dark-800/50 border border-dark-700 hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-20 bg-dark-800/30 rounded-2xl p-8 border border-dark-700"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Our <span className="gradient-text">Process</span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We follow a proven methodology to ensure your project's success from concept to deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your requirements and goals' },
              { step: '02', title: 'Planning', description: 'Creating detailed project roadmap and architecture' },
              { step: '03', title: 'Development', description: 'Building your solution with best practices' },
              { step: '04', title: 'Launch', description: 'Deploying and maintaining your application' },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.0 + index * 0.2, duration: 0.8 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-500/30">
                  <span className="text-primary-500 font-bold text-lg">{process.step}</span>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">{process.title}</h4>
                <p className="text-gray-400 text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 