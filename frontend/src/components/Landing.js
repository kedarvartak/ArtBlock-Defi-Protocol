import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ConnectWalletButton from './ConnectWalletButton';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser, clearUserSession } from '../utils/auth';
import useWalletConnection from '../hooks/useWalletConnection';

const HeroSection = () => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  // Add wallet connection listener
  useWalletConnection();

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      navigate('/auth');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <section className="relative px-4 py-24 overflow-hidden bg-[#F7F5FF]">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#FFE951]/10 
            rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#E4E0FF]/20 
            rounded-full blur-2xl"
        />
      </div>
          
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="relative z-10 space-y-10">
            {/* Enhanced Brand Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#FFE951] 
                  border-3 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                  hover:shadow-none transition-all"
              >
                <span className="text-xl">✨</span>
                <span className="font-bold">Next-Gen NFT Platform</span>
              </motion.div>
            </motion.div>

            {/* Enhanced Headline */}
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-black space-y-4"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <motion.span
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="inline-block bg-white border-4 border-black px-6 py-2 
                      rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                      transition-all"
                  >
                    Create
                  </motion.span>
                  <motion.span
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block text-5xl"
                  >
                    🎨
                  </motion.span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <motion.span
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="inline-block bg-[#E4E0FF] border-4 border-black px-6 py-2 
                      rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                      transition-all"
                  >
                    Collect
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="inline-block bg-[#9BF6FF] border-4 border-black px-6 py-2 
                      rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                      transition-all"
                  >
                    Trade
                  </motion.span>
                </div>
              </motion.h1>

              {/* Enhanced Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-lg"
              >
                Join the revolution of digital art. Create, collect, and trade unique NFTs 
                in a vibrant community of creators and collectors.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-6"
              >
                {[
                  { value: '10K+', label: 'Artists' },
                  { value: '50K+', label: 'NFTs' },
                  { value: '2M+', label: 'Sales' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="bg-white px-4 py-3 border-3 border-black rounded-xl 
                      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                      transition-all"
                  >
                    <div className="font-black text-2xl">{stat.value}</div>
                    <div className="text-sm font-bold text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  onClick={handleCreateClick}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#FFE951] text-lg font-bold border-3 
                    border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                    hover:shadow-none transition-all"
                >
                  {isLoggedIn ? 'Start Creating 🎨' : 'Join Now 🎨'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-lg font-bold border-3 
                    border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                    hover:shadow-none transition-all"
                >
                  Learn More →
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Enhanced Visual */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative z-10"
            >
              {/* Main Featured Art */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                className="relative aspect-[4/3] bg-white border-4 border-black 
                  rounded-3xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                <img 
                  src="https://wallpaperaccess.com/full/8054251.jpg" 
                  alt="Featured Art"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-8 -right-8 bg-[#FFE951] p-4 border-3 
                    border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                    transform rotate-12"
                >
                  <span className="text-2xl">🔥</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-[#9BF6FF] p-4 border-3 
                    border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                    transform -rotate-12"
                >
                  <span className="text-2xl">💎</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "For Artists",
      emoji: "👨‍🎨",
      color: "bg-[#FFE951]",
      image: "https://wallpaperaccess.com/full/8054251.jpg",
      description: "Create and sell your digital masterpieces as NFTs. Set your own terms, earn royalties, and join a community of creative pioneers.",
      features: [
        "Mint NFTs easily",
        "Earn royalties forever",
        "Build your collector base",
        "Join exclusive events"
      ]
    },
    {
      title: "For Curators",
      emoji: "🏛️",
      color: "bg-[#E4E0FF]",
      image: "https://wallpaperaccess.com/full/8054251.jpg",
      description: "Discover emerging artists, curate exclusive galleries, and earn through successful exhibitions and sales.",
      features: [
        "Create virtual galleries",
        "Earn curation rewards",
        "Launch exhibitions",
        "Support artists"
      ]
    },
    {
      title: "For Collectors",
      emoji: "💎",
      color: "bg-[#9BF6FF]",
      image: "https://wallpaperaccess.com/full/8054251.jpg",
      description: "Invest in the future of art. Build your collection, support artists, and join an exclusive community of art enthusiasts.",
      features: [
        "Build your portfolio",
        "Access exclusive drops",
        "Trade with confidence",
        "Join collector events"
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-[#F7F5FF]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-[#FFE951]/10 
            border-4 border-black rounded-3xl transform rotate-12"
        />
        <motion.div
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#E4E0FF]/20 
            border-4 border-black rounded-full transform -rotate-12"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="inline-block"
          >
            <span className="px-8 py-3 bg-[#FFE951] border-3 border-black 
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-lg font-bold 
              inline-block transform -rotate-1 rounded-xl"
            >
              What We Do ✨
            </span>
          </motion.div>
          <h2 className="text-6xl md:text-7xl font-black mt-8 mb-4">
            Join The Revolution
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how ArtBlock is transforming the digital art landscape
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <motion.div
            animate={{ x: `${-currentSlide * 100}%` }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="flex w-full"
          >
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 px-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div 
                  whileHover={{ y: -8 }}
                  className={`${slide.color} border-4 border-black rounded-2xl 
                    shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 h-full 
                    transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Content */}
                    <div className="space-y-8">
                      {/* Slide Header */}
                      <div className="flex items-center gap-4">
                        <motion.span 
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-5xl"
                        >
                          {slide.emoji}
                        </motion.span>
                        <h3 className="text-4xl font-black">{slide.title}</h3>
                      </div>

                      {/* Description */}
                      <p className="text-xl text-gray-800">{slide.description}</p>

                      {/* Features List */}
                      <div className="space-y-4">
                        {slide.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 group"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              className="w-3 h-3 bg-black rounded-full"
                            />
                            <span className="font-bold group-hover:translate-x-2 
                              transition-transform"
                            >
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-black text-lg font-bold 
                          border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                          hover:shadow-none transition-all rounded-xl"
                      >
                        Learn More →
                      </motion.button>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.02, rotate: 2 }}
                        className="relative bg-white p-4 border-4 border-black 
                          shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-xl 
                          transform -rotate-2 overflow-hidden"
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-[450px] object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 border-2 border-black rounded-lg" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-6 mt-12">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className={`w-4 h-4 rounded-full border-3 border-black 
                  transition-all ${currentSlide === index ? 
                  slides[index].color : 'bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const JoinUsSection = () => {
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-[#F7F5FF] ">
      {/* Enhanced Animated Background Elements */}
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
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#9BF6FF]/20 
            border-4 border-black rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white border-4 border-black rounded-3xl 
            shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12 md:p-16 overflow-hidden"
        >
          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-20 h-20 border-4 border-black 
              rounded-full opacity-10"
          />
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-32 h-32 border-4 border-black 
              rounded-xl opacity-10 transform rotate-45"
          />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
            {/* Left Column */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span className="px-6 py-2 bg-[#FFE951] border-3 border-black 
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-base font-bold 
                  inline-block transform -rotate-2"
                >
                  Join Now 🚀
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-black"
              >
                Ready to Transform Your Art into NFTs?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                Join thousands of artists who have already started their NFT journey. 
                Create, collect, and trade with confidence.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { value: '10K+', label: 'Artists', color: 'bg-[#FFE951]' },
                  { value: '50K+', label: 'NFTs', color: 'bg-[#E4E0FF]' },
                  { value: '2M+', label: 'Sales', color: 'bg-[#9BF6FF]' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, rotate: -2 }}
                    className={`${stat.color} p-4 border-3 border-black rounded-xl 
                      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                      transition-all text-center`}
                  >
                    <div className="text-2xl font-black mb-2">{stat.value}</div>
                    <div className="text-sm font-bold">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#FFE951] text-lg font-bold border-3 
                    border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                    hover:shadow-none transition-all"
                >
                  Start Creating 🎨
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-lg font-bold border-3 
                    border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                    hover:shadow-none transition-all"
                >
                  Learn More →
                </motion.button>
              </motion.div>
            </div>

            {/* Right Column - Featured Artists */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 2 }}
                  className="bg-white p-6 border-4 border-black rounded-2xl 
                    shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-2"
                >
                  {/* Artist Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <motion.div
                        key={item}
                        whileHover={{ y: -4 }}
                        className="aspect-square bg-gray-100 rounded-xl border-2 
                          border-black overflow-hidden"
                      >
                        {/* Add artist image here */}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Join Artists Banner */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="mt-6 p-4 bg-[#FFE951] border-3 border-black 
                      rounded-xl text-center font-bold"
                  >
                    Join 10,000+ Artists Today! 🎨
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Decorative Shapes */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-20 h-20 border-4 border-black 
                  rounded-full opacity-10 -z-10"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <HeroSection />
        <CarouselSection />
        <JoinUsSection />
      </div>
    </div>
  );
};

export default Landing;