import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-grow relative z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-8">Welcome to the Connect Amravati portal dashboard.</p>
          
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
