import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleCard = ({ title, description, icon, color, benefits, onClick, isSelected, image }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`${color} p-8 border-4 border-black rounded-2xl 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
      transition-all cursor-pointer relative overflow-hidden group
      ${isSelected ? 'ring-4 ring-black ring-offset-4' : ''}`}
  >
    {/* Selection Badge */}
    {isSelected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-4 right-4 bg-black text-white p-2 
          rounded-full z-10"
      >
        ✓
      </motion.div>
    )}

    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className="text-4xl bg-white p-3 border-3 border-black rounded-xl
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-black">{title}</h3>
      </div>

      {/* Role Image */}
      <div className="relative aspect-video rounded-xl border-3 border-black overflow-hidden
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Description */}
      <p className="text-gray-700 font-medium">{description}</p>
      
      {/* Benefits List */}
      <div className="space-y-2">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center gap-3 bg-white/50 p-2 rounded-lg"
          >
            <span>✨</span>
            <span className="text-sm text-gray-700">{benefit}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const { userRole, saveUserRole } = useAuth();

  useEffect(() => {
    // If role exists, redirect kar dashboard la
    if (userRole) {
      navigate(`/dashboard/${userRole.toLowerCase()}`);
    }
  }, [userRole, navigate]);

  const roles = [
    {
      title: "Artist",
      description: "Create and sell your digital masterpieces as NFTs",
      icon: "👨‍🎨",
      color: "bg-[#FFE951]",
      path: "/register/artist",
      image: "https://wallpaperaccess.com/full/8054251.jpg",
      benefits: [
        "Create and mint unique NFTs",
        "Earn royalties from secondary sales",
        "Build your artist profile",
        "Join exclusive artist communities"
      ]
    },
    {
      title: "Curator",
      description: "Discover and promote the best digital art collections",
      icon: "🎯",
      color: "bg-[#E4E0FF]",
      path: "/register/curator",
      image: "https://wallpaperaccess.com/full/8054251.jpg",
      benefits: [
        "Create themed galleries",
        "Earn commission from sales",
        "Discover emerging artists",
        "Shape the future of digital art"
      ]
    },
    {
      title: "Investor",
      description: "Build your digital art portfolio and support artists",
      icon: "💎",
      color: "bg-[#9BF6FF]",
      path: "/register/investor",
      image: "https://wallpaperaccess.com/full/8054251.jpg",
      benefits: [
        "Early access to new drops",
        "Portfolio analytics tools",
        "Exclusive investment opportunities",
        "Connect with top artists"
      ]
    }
  ];

  const handleRoleSelect = (role) => {
    const walletAddress = window.ethereum.selectedAddress;
    saveUserRole(role, walletAddress);
    navigate(`/dashboard/${role.toLowerCase()}`);
  };

  const handleContinue = () => {
    if (selectedRole) {
      handleRoleSelect(selectedRole);
    }
  };

  // If user already has a role, mag role option deu nakos tyala
  if (userRole) return null;

  return (
    <section className="min-h-screen bg-[#F7F5FF] 
      px-4 py-24 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            y: [0, 50, 0]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[#FFE951]/10 
            border-4 border-black rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.3, 1],
            x: [0, -50, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#E4E0FF]/20 
            border-4 border-black rounded-3xl transform -rotate-12 blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center space-y-8 mb-16">
          
           
        </div>

        {/* Enhanced Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <RoleCard 
                {...role} 
                isSelected={selectedRole === role.title}
                onClick={() => setSelectedRole(role.title)}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white text-base font-bold border-3 border-black 
              rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
              transition-all"
          >
            ← Go Back
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`px-8 py-3 text-base font-bold border-3 border-black 
              rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
              transition-all ${selectedRole ? 
                'bg-[#FFE951] cursor-pointer' : 
                'bg-gray-200 cursor-not-allowed opacity-50'}`}
          >
            Continue →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RoleSelection;