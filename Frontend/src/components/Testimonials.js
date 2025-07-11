import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'CEO, TechStart Inc.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      quote: 'Working with this ProDone was a game-changer for our startup. They delivered our e-commerce platform on time and exceeded our expectations. The team is professional, responsive, and truly understands business needs.',
      project: 'E-Commerce Platform',
      results: '300% increase in online sales'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Founder, AI Solutions',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      quote: 'The AI integration they built for our customer service has transformed our business. Response times improved dramatically and customer satisfaction scores went through the roof. Highly recommended!',
      project: 'AI Chatbot Integration',
      results: '80% faster response times'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Marketing Director, FinanceCorp',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      quote: 'Their mobile banking app development was exceptional. The app is intuitive, secure, and our customers love it. The team went above and beyond to ensure every detail was perfect.',
      project: 'Mobile Banking App',
      results: '50% increase in mobile users'
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'CTO, Innovation Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      quote: 'The project management tool they built has streamlined our entire development process. It\'s intuitive, powerful, and has become an essential part of our daily operations.',
      project: 'Project Management Platform',
      results: '40% improvement in productivity'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="section-padding bg-dark-950">
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
            Client Testimonials
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Testimonial */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="card text-center relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, index) => (
                    <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-gray-300 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-500/30"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-gray-400 text-sm">{testimonials[currentIndex].title}</p>
                  </div>
                </div>

                {/* Project Info */}
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-gray-400 text-sm">Project</p>
                      <p className="text-white font-medium">{testimonials[currentIndex].project}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Results</p>
                      <p className="text-primary-400 font-medium">{testimonials[currentIndex].results}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-dark-800/80 hover:bg-dark-700/80 border border-dark-600 hover:border-primary-500/50 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-dark-800/80 hover:bg-dark-700/80 border border-dark-600 hover:border-primary-500/50 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : 'bg-dark-600 hover:bg-dark-500'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '99%', label: 'Client Satisfaction' },
            { number: '15+', label: 'Happy Clients' },
            { number: '25+', label: 'Projects Completed' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 