import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';
import axiosInstance from '../utils/axios';
import useWalletConnection from '../hooks/useWalletConnection';

const LOCAL_STORAGE_KEYS = {
  TOKEN: 'artblock_token',
  USER: 'artblock_user',
  WALLET: 'artblock_wallet'
};

const setUserSession = (token, user) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(LOCAL_STORAGE_KEYS.WALLET, user.walletAddress);
};

const clearUserSession = () => {
  Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    walletAddress: '',
    role: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Add wallet connection listener
  useWalletConnection();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    const user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    const wallet = localStorage.getItem(LOCAL_STORAGE_KEYS.WALLET);
    
    if (token && user && wallet) {
      navigate('/dashboard');
      return;
    }

    // Clear any existing session data
    localStorage.clear();
  }, [navigate]);

  useEffect(() => {
    // Check if user came from role selection
    const searchParams = new URLSearchParams(window.location.search);
    const fromRole = searchParams.get('fromRole');
    const selectedRole = localStorage.getItem('selectedRole');
    
    if (fromRole && selectedRole) {
      setFormData(prev => ({
        ...prev,
        role: selectedRole
      }));
      // Clear the temporary storage
      localStorage.removeItem('selectedRole');
      // Clear the URL parameter
      window.history.replaceState({}, '', '/auth');
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to continue');
      }

      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setFormData(prev => ({ ...prev, walletAddress: address }));
      
    } catch (err) {
      setError(err.message);
      clearUserSession();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.walletAddress) {
        throw new Error('Please connect your wallet first');
      }

      // For signup, first collect user details then redirect to role selection
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        // Store signup data temporarily
        localStorage.setItem('signupData', JSON.stringify({
          username: formData.username,
          password: formData.password,
          walletAddress: formData.walletAddress
        }));
        
        // Redirect to role selection
        navigate('/role-selection');
        return;
      }

      // Handle login
      const response = await axiosInstance.post('/api/auth/login', {
        password: formData.password,
        walletAddress: formData.walletAddress
      });

      setUserSession(response.data.token, response.data.user);
      
      // Redirect based on user role
      if (response.data.user.role === 'curator') {
        navigate('/dashboard/curator');
      } else if (response.data.user.role === 'artist') {
        navigate('/dashboard/artist');
      } else {
        navigate('/dashboard'); // fallback
      }

    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.message || err.message);
      clearUserSession();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Render connect wallet screen if no wallet is connected
  if (!formData.walletAddress) {
    return (
      <div className="min-h-screen bg-[#F7F5FF] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-black rounded-2xl 
            shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full mx-4"
        >
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-black">Welcome to ArtBlock! 🎨</h1>
            <p className="text-gray-600">
              Connect your wallet to {isLogin ? 'login' : 'create an account'}
            </p>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 border-2 border-red-500 rounded-xl 
                  text-red-600 text-sm font-bold"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              onClick={connectWallet}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full py-4 ${loading ? 'bg-gray-200' : 'bg-[#FFE951]'} 
                text-lg font-bold border-3 border-black rounded-xl 
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                transition-all relative`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" 
                      stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connecting...
                </span>
              ) : (
                'Connect Wallet'
              )}
            </motion.button>

            <div className="text-center">
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-bold hover:underline"
              >
                {isLogin ? 
                  "Don't have an account? Sign up" : 
                  "Already have an account? Login"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render auth form if wallet is connected
  return (
    <div className="min-h-screen bg-[#F7F5FF]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-4 border-black rounded-2xl 
              shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-[#FFE951] border-3 border-black 
                  rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-base 
                  font-bold inline-block transform -rotate-2"
                >
                  {isLogin ? 'Welcome Back! ✨' : 'Join Us! 🎨'}
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-black"
              >
                {isLogin ? 'Login to Your Account' : 'Create Your Account'}
              </motion.h1>
            </div>

            {/* Updated Form */}
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-100 border-2 border-red-500 rounded-xl 
                    text-red-600 text-sm font-bold"
                >
                  {error}
                </motion.div>
              )}

              {!isLogin && (
                <div>
                  <label className="font-bold block mb-2">Username</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-3 border-black 
                      rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      focus:shadow-none transition-all outline-none"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              )}

              <div>
                <label className="font-bold block mb-2">Wallet Address</label>
                <motion.input
                  type="text"
                  value={formData.walletAddress}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border-3 border-black 
                    rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    focus:shadow-none transition-all outline-none font-mono text-sm"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Connected wallet address will be used for authentication
                </p>
              </div>

              <div>
                <label className="font-bold block mb-2">Password</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-3 border-black 
                    rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    focus:shadow-none transition-all outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="font-bold block mb-2">Confirm Password</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-3 border-black 
                      rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                      focus:shadow-none transition-all outline-none"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-4 ${loading ? 'bg-gray-200' : 'bg-[#FFE951]'} 
                  text-lg font-bold border-3 border-black rounded-xl 
                  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                  transition-all mt-8 relative`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" 
                        stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLogin ? 'Login' : 'Sign Up'
                )}
              </motion.button>

              {/* Toggle Login/Signup */}
              <div className="text-center mt-6">
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({
                      ...formData,
                      username: '',
                      password: '',
                      confirmPassword: ''
                    });
                  }}
                  className="text-sm font-bold hover:underline"
                >
                  {isLogin ? 
                    "Don't have an account? Sign up" : 
                    "Already have an account? Login"}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 