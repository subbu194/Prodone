import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import LiveChat from './components/LiveChat';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply dark mode to body
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading</h2>
          <p className="text-gray-400">Preparing your digital experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App bg-dark-950 text-white min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
      <FloatingContact />
      <LiveChat />
    </div>
  );
}

export default App; 