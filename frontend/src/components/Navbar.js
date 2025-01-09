import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NavButton = ({ children, primary, color = 'white', emoji, onClick, disabled }) => (
  <motion.button
    whileHover={{ 
      scale: 1.05, 
      rotate: primary ? -2 : 2,
      y: -2 
    }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`
      group px-6 py-3 text-sm font-bold border-3 border-black
      ${primary ? 
        'bg-[#FFE951] text-black hover:bg-[#FFE951]/90' : 
        `${color} hover:shadow-none`} 
      shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
      transition-all rounded-xl overflow-hidden relative
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    <motion.span className="relative z-10 flex items-center gap-2">
      {emoji && (
        <motion.span
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {emoji}
        </motion.span>
      )}
      {children}
    </motion.span>
    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 
      transition-opacity duration-200"
    />
  </motion.button>
);

const WalletButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      }
    };
    
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null);
        }
      });
    }
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask to continue!');
        window.open('https://metamask.io/download.html', '_blank');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        navigate('/role-selection');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  if (address) {
    return (
      <NavButton color="bg-[#E4E0FF]" emoji="👛">
        {`${address.slice(0, 6)}...${address.slice(-4)}`}
      </NavButton>
    );
  }

  return (
    <NavButton 
      primary 
      emoji="💫" 
      onClick={handleConnect}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⚡
          </motion.span>
          Connecting...
        </>
      ) : (
        'Connect Wallet'
      )}
    </NavButton>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-transparent border-b-3 border-black"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFE951]/10 
            rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E4E0FF]/20 
            rounded-full blur-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <motion.span 
              whileHover={{ rotate: -5, y: -2 }}
              className="text-2xl font-black bg-[#FFE951] border-3 border-black 
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-xl 
                transform -rotate-2 transition-all group-hover:shadow-none"
            >
              Art
            </motion.span>
            <motion.span 
              whileHover={{ rotate: 5, y: -2 }}
              className="text-2xl font-black bg-[#E4E0FF] border-3 border-black 
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-4 py-2 rounded-xl 
                transform rotate-2 transition-all group-hover:shadow-none"
            >
              Block
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-4">
              {[
                { name: 'Explore', emoji: '🎨', color: 'bg-[#FFE951]' },
                { name: 'Galleries', emoji: '🏛️', color: 'bg-[#E4E0FF]' },
                { name: 'Artists', emoji: '👨‍🎨', color: 'bg-[#9BF6FF]' },
              ].map((item) => (
                <NavButton
                  key={item.name}
                  color={item.color}
                  emoji={item.emoji}
                >
                  {item.name}
                </NavButton>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <WalletButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-4 bg-[#FFE951] border-3 border-black 
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
              transition-all rounded-xl text-xl relative overflow-hidden group"
          >
            <span className="relative z-10">{isMenuOpen ? '✕' : '☰'}</span>
            <div className="absolute inset-0 bg-black opacity-0 
              group-hover:opacity-5 transition-opacity duration-200"
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-[#F7F5FF] border-3 
                border-black rounded-xl mt-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="p-6 space-y-4">
                {[
                  { name: 'Explore', emoji: '🎨', color: 'bg-[#FFE951]' },
                  { name: 'Galleries', emoji: '🏛️', color: 'bg-[#E4E0FF]' },
                  { name: 'Artists', emoji: '👨‍🎨', color: 'bg-[#9BF6FF]' },
                ].map((item) => (
                  <NavButton
                    key={item.name}
                    color={item.color}
                    emoji={item.emoji}
                    className="w-full text-left"
                  >
                    {item.name}
                  </NavButton>
                ))}

                <div className="space-y-4 pt-4 border-t-2 border-black">
                  <WalletButton />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 