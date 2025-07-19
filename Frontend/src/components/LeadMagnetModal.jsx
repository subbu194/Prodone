import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LEAD_MAGNET_KEY = 'leadMagnetSubmitted';

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce',
  'Real Estate', 'Manufacturing', 'Entertainment', 'Non-profit', 'Other'
];

const LeadMagnetModal = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (!localStorage.getItem(LEAD_MAGNET_KEY)) {
      const timer = setTimeout(() => setOpen(true), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom event to open modal
  useEffect(() => {
    const handler = () => {
      if (!localStorage.getItem(LEAD_MAGNET_KEY)) setOpen(true);
    };
    window.addEventListener('open-lead-magnet', handler);
    return () => window.removeEventListener('open-lead-magnet', handler);
  }, []);

  const onSubmit = async (data) => {
    setError('');
    try {
      await axios.post('/api/leads', data);
      setSubmitted(true);
      localStorage.setItem(LEAD_MAGNET_KEY, 'true');
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setOpen(false);
          setFadeOut(false);
          window.dispatchEvent(new Event('open-calendly-meeting'));
        }, 250); // fade out duration (was 350)
      }, 400); // confirmation visible duration (was 1200)
      reset();
    } catch (err) {
      setError('There was an error. Please try again.');
    }
  };

  if (!open || localStorage.getItem(LEAD_MAGNET_KEY)) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-1 transition-opacity duration-300 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="bg-dark-900 rounded-xl p-4 max-w-xs w-full text-white shadow-xl border border-dark-700 relative mt-4 mb-4 overflow-y-auto max-h-[80vh] transition-all duration-300">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
          aria-label="Close"
        >×</button>
        {!submitted ? (
          <>
            <h2 className="text-lg font-bold mb-2 text-primary-400">Request a Quote</h2>
            <p className="text-xs text-gray-300 mb-3">
              Please enter your details below as a professional. This helps us understand your business needs and provide you with the best possible solution.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Industry */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Industry *</label>
                <select {...register('industry', { required: 'Select industry' })} className="input-field w-full text-xs py-1">
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>}
              </div>
              {/* Business Type */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Business Type *</label>
                <select {...register('businessType', { required: 'Select business type' })} className="input-field w-full text-xs py-1">
                  <option value="">Select Business Type</option>
                  <option value="B2B">B2B</option>
                  <option value="B2C">B2C</option>
                  <option value="Both">Both</option>
                </select>
                {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType.message}</p>}
              </div>
              {/* Name and City */}
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Name *</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name required', minLength: { value: 2, message: 'Min 2 chars' } })}
                    className="input-field w-full text-xs py-1"
                    placeholder="Full name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">City *</label>
                  <input
                    type="text"
                    {...register('city', { required: 'City required', minLength: { value: 2, message: 'Min 2 chars' } })}
                    className="input-field w-full text-xs py-1"
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                </div>
              </div>
              {/* Phone and Email */}
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Phone *</label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone required', pattern: { value: /^[+]?[1-9][\d]{0,15}$/, message: 'Invalid phone' } })}
                    className="input-field w-full text-xs py-1"
                    placeholder="Phone"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' } })}
                    className="input-field w-full text-xs py-1"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Message *</label>
                <textarea
                  {...register('message', { required: 'Message required', minLength: { value: 10, message: 'Min 10 chars' }, maxLength: { value: 500, message: 'Max 500 chars' } })}
                  rows={2}
                  className="input-field w-full text-xs resize-none py-1"
                  placeholder="Your project description"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>
              {error && <div className="text-red-400 text-xs">{error}</div>}
              <button type="submit" className="btn-primary w-full py-1 rounded font-semibold text-sm">Request</button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-base font-bold text-green-400 mb-1">Thank you!</h3>
            <p className="text-gray-300 text-xs">We’ve received your request. Our team will contact you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadMagnetModal;