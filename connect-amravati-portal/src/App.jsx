import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaArrowRight, FaBell, FaShieldAlt } from 'react-icons/fa';
import { GiIndiaGate } from 'react-icons/gi';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'info' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      showToast(t('login.error_required'), 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        showToast(t('login.success_admin'), 'success');
      } else if (formData.username === 'employee' && formData.password === 'emp123') {
        showToast(t('login.success_employee'), 'success');
      } else {
        showToast(t('login.error_invalid'), 'error');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Gradient Border */}
      <div className="gradient-border"></div>

      {/* Toast Notification */}
      <ToastNotification
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      {/* Welcome Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-r from-blue-900 to-blue-800 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-8"
              >
                <GiIndiaGate className="text-8xl mx-auto" />
              </motion.div>
              <h1 className="text-4xl font-bold mb-4">{t('app.welcome')}</h1>
              <p className="text-xl opacity-90">{t('app.welcome_subtitle')}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Side - Cultural Side */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden min-h-[400px]"
              >
                {/* Animated Background Circles */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute border-4 border-white rounded-full"
                      style={{
                        width: `${150 + i * 50}px`,
                        height: `${150 + i * 50}px`,
                        top: `${20 + i * 10}%`,
                        left: `${20 + i * 10}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 text-white text-center">
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="mb-8"
                  >
                    <GiIndiaGate className="text-8xl mx-auto" />
                  </motion.div>

                  <motion.h2
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-5xl font-bold mb-6"
                  >
                    {t('app.title')}
                  </motion.h2>

                  <div className="h-1 w-24 bg-gradient-to-r from-orange-400 via-white to-green-400 mx-auto mb-6" />

                  <p className="text-xl text-blue-100 mb-4">
                    {t('cultural.admin_title')}
                  </p>

                  <div className="flex justify-center space-x-4 mt-8">
                    {['a', 'ma', 'ra'].map((item, index) => (
                      <motion.div
                        key={item}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className={`h-12 w-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                          index === 0 ? 'bg-orange-500' : index === 1 ? 'bg-white' : 'bg-green-500'
                        }`}
                      >
                        <span className={`font-bold text-xl ${
                          index === 1 ? 'text-blue-900' : 'text-white'
                        }`}>
                          {t(`cultural.${item}`)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Login Form */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="lg:w-1/2 p-8 lg:p-12"
              >
                <div className="max-w-md mx-auto">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
                    <FaShieldAlt className="mr-3 text-blue-600" />
                    {t('login.title')}
                  </h2>
                  <p className="text-gray-600 mb-8 pl-12">
                    {t('login.subtitle')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl z-10" />
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        onFocus={() => setFocusedField('username')}
                        onBlur={() => setFocusedField(null)}
                        className="input-field"
                        placeholder=" "
                      />
                      <label className={`floating-label ${focusedField === 'username' || formData.username ? 'active' : ''}`}>
                        {t('login.username')}
                      </label>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl z-10" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="input-field"
                        placeholder=" "
                      />
                      <label className={`floating-label ${focusedField === 'password' || formData.password ? 'active' : ''}`}>
                        {t('login.password')}
                      </label>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center justify-end">
                        {t('login.forgot_password')} <FaArrowRight className="ml-1 text-xs" />
                      </a>
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="gradient-button"
                    >
                      {loading ? (
                        <>
                          <div className="spinner" />
                          <span>{t('login.logging_in')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('login.login_button')}</span>
                          <FaArrowRight />
                        </>
                      )}
                    </button>

                    {/* Demo Credentials */}
                    <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl border border-blue-100">
                      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <FaBell className="mr-2 text-blue-600 animate-pulse" />
                        {t('demo.title')}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div 
                          className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                          onClick={() => setFormData({ username: 'admin', password: 'admin123' })}
                        >
                          <span className="text-xs text-blue-700 block">{t('demo.admin')}</span>
                          <span className="text-xs font-mono">{t('demo.admin_cred')}</span>
                        </div>
                        <div 
                          className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                          onClick={() => setFormData({ username: 'employee', password: 'emp123' })}
                        >
                          <span className="text-xs text-green-700 block">{t('demo.employee')}</span>
                          <span className="text-xs font-mono">{t('demo.employee_cred')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <p className="text-xs text-gray-500 text-center mt-6 flex items-center justify-center">
                      <FaShieldAlt className="mr-1" />
                      {t('security.notice')}
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default App;