import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Calendar,
  CheckCircle,
  ArrowRight 
} from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: registerAppointment,
    handleSubmit: handleSubmitAppointment,
    formState: { errors: appointmentErrors },
    reset: resetAppointment,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/contact`, data);
      toast.success(response.data.message);
      reset();
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitAppointment = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/appointments`, data);
      toast.success(response.data.message);
      resetAppointment();
      setIsAppointmentModalOpen(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'hello@yourProDone.com',
      link: 'mailto:hello@yourProDone.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Tech Street, Digital City, DC 12345',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon - Fri: 9AM - 6PM EST',
      link: '#',
    },
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'E-commerce',
    'Real Estate',
    'Manufacturing',
    'Entertainment',
    'Non-profit',
    'Other'
  ];

  return (
    <section id="contact" className="section-padding bg-dark-900/50">
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
            Get In Touch
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Let's Start Your <span className="gradient-text">Project</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to transform your business? Get in touch with us and let's discuss how we can help you achieve your goals.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="card"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Business Stage */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stage of Business Idea *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Not decided', 'Started', 'Ready to build'].map((stage) => (
                    <label key={stage} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={stage}
                        {...register('stage', { required: 'Please select a stage' })}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-gray-300 text-sm">{stage}</span>
                    </label>
                  ))}
                </div>
                {errors.stage && (
                  <p className="text-red-400 text-sm mt-1">{errors.stage.message}</p>
                )}
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industry *
                </label>
                <select
                  {...register('industry', { required: 'Please select an industry' })}
                  className="input-field w-full"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="text-red-400 text-sm mt-1">{errors.industry.message}</p>
                )}
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Type *
                </label>
                <select
                  {...register('businessType', { required: 'Please select a business type' })}
                  className="input-field w-full"
                >
                  <option value="">Select Business Type</option>
                  <option value="B2B">B2B</option>
                  <option value="B2C">B2C</option>
                  <option value="Both">Both</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-400 text-sm mt-1">{errors.businessType.message}</p>
                )}
              </div>

              {/* Name and City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className="input-field w-full"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    {...register('city', { 
                      required: 'City is required',
                      minLength: { value: 2, message: 'City must be at least 2 characters' }
                    })}
                    className="input-field w-full"
                    placeholder="Your city"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: { 
                        value: /^[+]?[1-9][\d]{0,15}$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                    className="input-field w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="input-field w-full"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    maxLength: { value: 1000, message: 'Message cannot exceed 1000 characters' }
                  })}
                  rows={4}
                  className="input-field w-full resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Appointment Booking */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-dark-700/50 hover:bg-dark-700 transition-colors duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors duration-300">
                      <info.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{info.title}</h4>
                      <p className="text-gray-400 text-sm">{info.content}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Appointment Booking */}
            <div className="card bg-gradient-to-br from-primary-500/10 to-primary-600/10 border-primary-500/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Book a Free Consultation</h3>
                <p className="text-gray-300 mb-6">
                  Schedule a 30-minute call to discuss your project and get a free quote.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="btn-primary flex items-center space-x-2 mx-auto group"
                >
                  <span>📆 Book Video Call</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-white">Why Choose Us?</h3>
              <div className="space-y-3">
                {[
                  'Free consultation and project assessment',
                  'Transparent pricing with no hidden fees',
                  'Dedicated project manager',
                  'Regular updates and communication',
                  'Post-launch support and maintenance',
                  '100% satisfaction guarantee'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Appointment Modal */}
        {isAppointmentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dark-800 rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Book Appointment</h3>
                <button
                  onClick={() => setIsAppointmentModalOpen(false)}
                  className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
                >
                  <span className="text-white">×</span>
                </button>
              </div>

              <form onSubmit={handleSubmitAppointment(onSubmitAppointment)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    {...registerAppointment('name', { required: 'Name is required' })}
                    className="input-field w-full"
                    placeholder="Your full name"
                  />
                  {appointmentErrors.name && (
                    <p className="text-red-400 text-sm mt-1">{appointmentErrors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...registerAppointment('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="input-field w-full"
                    placeholder="your@email.com"
                  />
                  {appointmentErrors.email && (
                    <p className="text-red-400 text-sm mt-1">{appointmentErrors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    {...registerAppointment('phone', { required: 'Phone is required' })}
                    className="input-field w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                  {appointmentErrors.phone && (
                    <p className="text-red-400 text-sm mt-1">{appointmentErrors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meeting Type *
                  </label>
                  <select
                    {...registerAppointment('meetingType', { required: 'Please select meeting type' })}
                    className="input-field w-full"
                  >
                    <option value="">Select Meeting Type</option>
                    <option value="Discovery Call">Discovery Call</option>
                    <option value="Project Discussion">Project Discussion</option>
                    <option value="Technical Review">Technical Review</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                  {appointmentErrors.meetingType && (
                    <p className="text-red-400 text-sm mt-1">{appointmentErrors.meetingType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    {...registerAppointment('scheduledDate', { required: 'Please select date and time' })}
                    className="input-field w-full"
                  />
                  {appointmentErrors.scheduledDate && (
                    <p className="text-red-400 text-sm mt-1">{appointmentErrors.scheduledDate.message}</p>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAppointmentModalOpen(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Meeting'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact; 