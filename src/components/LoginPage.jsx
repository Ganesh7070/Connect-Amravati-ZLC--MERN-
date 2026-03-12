import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';
import WelcomeOverlay from './WelcomeOverlay';
import CulturalSection from './CulturalSection';
import LoginForm from './LoginForm';

const LoginPage = ({ showToast }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden flex flex-col">
      <AnimatedBackground />

      <WelcomeOverlay />

      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <CulturalSection />
              <LoginForm showToast={showToast} />
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
