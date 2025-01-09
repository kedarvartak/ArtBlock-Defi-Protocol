import React from 'react';
import { motion } from 'framer-motion';

const FooterLink = ({ children }) => (
  <motion.a
    href="#"
    whileHover={{ x: 4, scale: 1.05 }}
    className="text-gray-600 hover:text-black transition-colors inline-block"
  >
    <span className="relative">
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black"
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </span>
  </motion.a>
);

const SocialButton = ({ icon, label, color }) => (
  <motion.a
    href="#"
    whileHover={{ scale: 1.1, rotate: 5, y: -4 }}
    whileTap={{ scale: 0.95 }}
    className={`p-4 ${color} border-3 border-black rounded-xl 
      shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
      transition-all text-2xl relative overflow-hidden group`}
    aria-label={label}
  >
    <span className="relative z-10">{icon}</span>
    <motion.div
      className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 
        transition-opacity duration-200"
    />
  </motion.a>
);

const Footer = () => {
  return (
    <footer className="relative bg-[#F7F5FF]  
      border-t-3 border-black overflow-hidden"
    >
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
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Main Footer Content */}
        <div className="bg-white border-4 border-black rounded-3xl 
          shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12 md:p-16 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-20 h-20 border-4 border-black 
              rounded-full opacity-10"
          />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <div className="flex items-center gap-3">
                  <motion.span 
                    whileHover={{ rotate: -5 }}
                    className="text-3xl font-black bg-[#FFE951] border-3 border-black 
                      shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-6 py-3 rounded-xl 
                      transform -rotate-2"
                  >
                    Art
                  </motion.span>
                  <motion.span 
                    whileHover={{ rotate: 5 }}
                    className="text-3xl font-black bg-[#E4E0FF] border-3 border-black 
                      shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-6 py-3 rounded-xl 
                      transform rotate-2"
                  >
                    Block
                  </motion.span>
                </div>
              </motion.div>

              <p className="text-xl text-gray-600">
                Join our creative community and transform your digital art into unique NFTs. 
                Build, collect, and trade with confidence.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: "🐦", label: "Twitter", color: "bg-[#FFE951]" },
                  { icon: "📸", label: "Instagram", color: "bg-[#E4E0FF]" },
                  { icon: "🎮", label: "Discord", color: "bg-[#9BF6FF]" },
                  { icon: "🎨", label: "OpenSea", color: "bg-white" }
                ].map((social, i) => (
                  <SocialButton key={i} {...social} />
                ))}
              </div>
            </div>

            {/* Quick Links Columns */}
            {[
              {
                title: "Platform",
                links: ["Explore NFTs", "Create", "Marketplace", "How it Works"]
              },
              {
                title: "Community",
                links: ["Token", "Discussion", "Voting", "Discord Server"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Contact"]
              }
            ].map((column, i) => (
              <div key={i} className="lg:col-span-2 space-y-6">
                <motion.h3 
                  whileHover={{ x: 4 }}
                  className="text-2xl font-bold"
                >
                  {column.title}
                </motion.h3>
                <ul className="space-y-4">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <FooterLink>{link}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F7F5FF] border-3 border-black rounded-2xl 
                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center space-y-6"
            >
              <h3 className="text-3xl font-black">Join Our Newsletter 💫</h3>
              <p className="text-xl text-gray-600">
                Get the latest updates about new features and upcoming drops.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 text-lg border-3 border-black rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-[#FFE951]"
                />
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#FFE951] text-lg font-bold border-3 
                    border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                    hover:shadow-none transition-all whitespace-nowrap"
                >
                  Subscribe →
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 text-center">
          <div className="inline-block bg-white px-8 py-4 border-3 border-black 
            rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">© 2024</span>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="font-bold"
                >
                  ArtBlock
                </motion.span>
                <span className="text-gray-600">All rights reserved.</span>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link, i) => (
                  <FooterLink key={i}>{link}</FooterLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 