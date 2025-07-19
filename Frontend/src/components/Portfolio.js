import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    name: 'CutTheQ',
    url: 'https://cuttheq.in/',
    image: '/cuttheq-logo.png',
    description: 'Skip the Line, Order Online – Food ordering and pickup platform.'
  },
  {
    name: 'Klinic',
    url: 'https://klinic.cloud/login',
    image: '/klinic-logo.png',
    description: 'Healthcare at your fingertips – Digital health platform.'
  },
  {
    name: 'Keep AI',
    url: 'https://www.keepai.se/',
    image: '/keepai.png',
    description: 'AI for flexible energy resources – Smart energy optimization.'
  },
  {
    name: 'Zysk Technologies',
    url: 'https://zysk.tech/',
    image: '/zysk-logo.png',
    description: 'Product engineering, AI, and web development experts.'
  },
  {
    name: 'Early2nine',
    url: 'https://www.early2nine.com/',
    image: '/early2nine_logo.png',
    description: 'Wholesale Import and Export – Early2nine.'
  },
];

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="portfolio" className="section-padding bg-dark-900/50" data-testid="portfolio-section">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center px-6 py-2 rounded-full bg-primary-600/10 border border-primary-500/30 text-primary-400 text-base font-semibold mb-6 shadow"
            data-testid="portfolio-header-badge"
          >
            Our Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 gradient-text drop-shadow"
            data-testid="portfolio-header-title"
          >
            Projects & Partnerships
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            data-testid="portfolio-header-desc"
          >
            A selection of our recent work and valued collaborations. Click a card to visit the project.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4"
          data-testid="portfolio-grid"
        >
          {PROJECTS.map((item, idx) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + idx * 0.15, duration: 0.7 }}
              className={
                `relative group overflow-hidden rounded-2xl shadow-lg border-2 border-dark-700 bg-gradient-to-br from-dark-900/80 to-dark-800/60 hover:scale-[1.03] transition-transform duration-300` +
                ` hover:border-primary-500/60`
              }
              aria-label={`Visit ${item.name}`}
              data-testid={`portfolio-card-${idx}`}
            >
              {/* Animated Glow */}
              <div className="absolute -inset-1 z-0 blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-500 pointer-events-none bg-gradient-to-br from-primary-500/30 to-primary-400/20" />
              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-center h-full p-7">
                {/* Logo */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-900/60 to-primary-500/20 flex items-center justify-center mb-5 border-4 border-primary-500/20 group-hover:border-primary-500 transition-all duration-300 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain rounded-full bg-white"
                    style={{ background: '#fff' }}
                    data-testid={`portfolio-logo-${idx}`}
                  />
                </div>
                {/* Name */}
                <h3 className="text-xl font-bold mb-2 text-white text-center group-hover:text-primary-400 transition-colors duration-300" data-testid={`portfolio-title-${idx}`}>{item.name}</h3>
                {/* Description */}
                <p className="text-gray-300 text-base text-center mb-4 min-h-[48px]" data-testid={`portfolio-desc-${idx}`}>{item.description}</p>
                {/* CTA */}
                <span className="mt-auto w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-base shadow bg-primary-500/90 hover:bg-primary-600 transition-all duration-300 group text-white cursor-pointer" style={{ fontWeight: 600 }}>
                  <span>Visit Site</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;