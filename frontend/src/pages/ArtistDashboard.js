// explaining the imports - react hooks are imported from react
// useState: Manage local component state
// useEffect: Handle side effects (data fetching)
// useNavigate: Handle routing
// useWalletConnection: Manage wallet connection
// framer motion for animations, feather icons for icons, recharts for charts, axios for API calls
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Image, DollarSign, Eye, Heart, 
  PieChart, Settings, Zap, BarChart2, 
} from 'react-feather';
import { 
  AreaChart, Area, BarChart, Bar, PieChart as ReChart, Pie, 
  Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import CreateNFTModal from '../components/CreateNFTModal';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
// were using wallet connection hook to listen for wallet connection changes. if disconnected user will be redirected to auth page
import useWalletConnection from '../hooks/useWalletConnection';
import useNFTContract from '../hooks/useNFTContract';

const LOCAL_STORAGE_KEYS = {
  TOKEN: 'artblock_token',
  USER: 'artblock_user',
  WALLET: 'artblock_wallet'
};

const ArtistDashboard = () => {
  const navigate = useNavigate();
  const { getArtistNFTs } = useNFTContract();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    profile: {
      displayName: '',
      followersCount: 0,
      artworksCount: 0,
      followingCount: 0,
      salesCount: 0,
      role: 'Artist',
      badges: ['🎨', '⭐', '🏆']
    },
    analytics: {
      totalArtworksListed: 0,
      totalSalesValue: 0,
      averagePrice: 0,
      totalViews: 0,
      totalLikes: 0
    },
    distributionSettings: {
      artistShare: 85,
      galleryShare: 10,
      platformFee: 5
    },
    artworks: [],
    loading: true,
    error: null,
    chainNFTs: [],
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Add wallet connection listener
  useWalletConnection();

  useEffect(() => {
    let mounted = true;

    const fetchAllData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER));
        if (!user?.walletAddress) {
          console.log('No user wallet address found');
          return;
        }
        console.log('Current User:', user);

        // Fetch NFTs from blockchain
        const nftsFromChain = await getArtistNFTs(user.walletAddress);
        console.log('NFTs from blockchain:', nftsFromChain);

        if (!mounted) return;

        // Fetch dashboard data from backend
        const response = await axiosInstance.get(`/api/artist/dashboard/${user.id}`);
        
        if (!mounted) return;

        setDashboardData(prev => ({
          ...prev,
          ...response.data,
          chainNFTs: nftsFromChain || [],
          loading: false,
          error: null
        }));

      } catch (err) {
        console.error('Error fetching data:', err);
        if (!mounted) return;
        
        setDashboardData(prev => ({
          ...prev,
          chainNFTs: [],
          error: err.message || 'Failed to load data',
          loading: false
        }));
        
        if (err.response?.status === 401) {
          navigate('/auth');
        }
      }
    };

    fetchAllData();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array

  
  const AnalyticCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border-3 border-black rounded-xl p-6
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
        transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 font-medium">{title}</p>
          <h3 className="text-2xl font-black mt-1">
            {typeof value === 'number' ? value : value || 0}
          </h3>
        </div>
        <div className={`p-3 ${color} rounded-xl border-2 border-black`}>
          <Icon size={24} className="text-black" />
        </div>
      </div>
    </motion.div>
  );

  
  const DistributionCard = ({ title, value, color }) => (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-center justify-between p-4 bg-gray-50 
        border-2 border-black rounded-xl"
    >
      <span className="font-medium">{title}</span>
      <div className="flex items-center gap-2">
        <div 
          className="h-2 rounded-full bg-black"
          style={{ width: `${value}px` }}
        />
        <span className={`font-bold ${color}`}>{value}%</span>
      </div>
    </motion.div>
  );

  
  const AnalyticsSection = () => {
    const pieData = [
      { name: 'Listed', value: dashboardData.analytics.totalArtworksListed },
      { name: 'Sold', value: dashboardData.analytics.totalSalesValue },
    ];

    const barData = [
      { name: 'Views', value: dashboardData.analytics.totalViews },
      { name: 'Likes', value: dashboardData.analytics.totalLikes },
      { name: 'Sales', value: dashboardData.analytics.totalSalesValue },
    ];

    const COLORS = ['#FFE951', '#A8FF76', '#76DEFF', '#FF76F6'];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Performance Overview */}
        <div className="bg-white border-4 border-black rounded-2xl p-6 
          shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart2 size={24} />
            Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '2px solid black',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Bar dataKey="value" fill="#FFE951" radius={[8, 8, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* NFT Distribution */}
        <div className="bg-white border-4 border-black rounded-2xl p-6 
          shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <PieChart size={24} />
            NFT Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ReChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#FFE951"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '2px solid black',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Legend />
            </ReChart>
          </ResponsiveContainer>
        </div>

        {/* Price Trends */}
        <div className="md:col-span-2 bg-white border-4 border-black rounded-2xl 
          p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={24} />
            Price Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={[
                { name: 'Jan', price: dashboardData.analytics.averagePrice },
                { name: 'Feb', price: dashboardData.analytics.averagePrice * 1.2 },
                { name: 'Mar', price: dashboardData.analytics.averagePrice * 0.8 },
                
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '2px solid black',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#FFE951"
                fill="#FFE951"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    );
  };

  
  const NFTGrid = () => {
    const [filter, setFilter] = useState('all');

    // Combine backend and blockchain NFTs
    const allNFTs = dashboardData.chainNFTs.map(nft => ({
      _id: nft.tokenId.toString(),
      title: nft.title,
      description: nft.description,
      price: nft.price,
      ipfsHash: nft.image,
      status: nft.isListed ? 'listed' : 'sold',
      analytics: {
        views: 0,
        likes: 0
      }
    }));

    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border-4 border-black rounded-2xl p-8
          shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold">Your NFTs</h3>
          <div className="flex gap-4">
            {['all', 'listed', 'sold'].map((status) => (
              <motion.button
                key={status}
                onClick={() => setFilter(status)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 border-2 border-black rounded-xl 
                  font-bold capitalize ${
                  filter === status 
                    ? 'bg-[#FFE951] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white'
                }`}
              >
                {status}
              </motion.button>
            ))}
          </div>
        </div>

        {allNFTs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No NFTs found. Create your first NFT!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allNFTs
              .filter(nft => filter === 'all' || nft.status === filter)
              .map((nft) => (
                <motion.div
                  key={nft._id}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className="border-3 border-black rounded-xl overflow-hidden 
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                    transition-all"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={nft.ipfsHash}
                      alt={nft.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 
                      border-2 border-black rounded-lg text-sm font-bold"
                    >
                      {nft.status}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h4 className="font-bold">{nft.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{nft.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600">Price</span>
                      <span className="font-bold">{nft.price} ETH</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </motion.section>
    );
  };

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen bg-[#F7F5FF] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-black rounded-full 
            border-t-[#FFE951]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5FF]">
      {/* Hero Section */}
      <div className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block"
              >
                <span className="px-6 py-2 bg-[#FFE951] border-3 border-black 
                  rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-base 
                  font-bold inline-block transform -rotate-2"
                >
                  {dashboardData.profile.role} Dashboard 🎨
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black">
                Welcome back,
                <br />
                {dashboardData.profile.displayName}!
              </h1>
            </div>
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#FFE951] text-lg font-bold border-3 
                border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                hover:shadow-none transition-all flex items-center gap-2"
            >
              <Zap className="animate-pulse" />
              Create New NFT
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnalyticCard
              title="Total Artworks"
              value={dashboardData.analytics.totalArtworksListed}
              icon={Image}
              color="bg-[#FFE951]"
            />
            <AnalyticCard
              title="Total Sales"
              value={`${dashboardData.analytics.totalSalesValue} ETH`}
              icon={DollarSign}
              color="bg-[#A8FF76]"
            />
            <AnalyticCard
              title="Total Views"
              value={dashboardData.analytics.totalViews}
              icon={Eye}
              color="bg-[#76DEFF]"
            />
            <AnalyticCard
              title="Total Likes"
              value={dashboardData.analytics.totalLikes}
              icon={Heart}
              color="bg-[#FF76F6]"
            />
          </div>

          {/* Profile and Distribution Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-1 bg-white border-4 border-black rounded-2xl 
                overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="p-6 space-y-6">
                <div className="text-center space-y-4">
                  <div className="inline-block p-4 bg-[#FFE951] border-3 
                    border-black rounded-full">
                    <Users size={32} />
                  </div>
                  <h2 className="text-2xl font-black">
                    {dashboardData.profile.displayName}
                  </h2>
                  <div className="flex justify-center gap-2">
                    {dashboardData.profile.badges.map((badge, index) => (
                      <span key={index} className="text-2xl">{badge}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 border-2 border-black rounded-xl 
                    text-center">
                    <div className="text-sm text-gray-600">Followers</div>
                    <div className="text-xl font-bold">
                      {dashboardData.profile.followersCount}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border-2 border-black rounded-xl 
                    text-center">
                    <div className="text-sm text-gray-600">Following</div>
                    <div className="text-xl font-bold">
                      {dashboardData.profile.followingCount}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Distribution Settings Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 bg-white border-4 border-black rounded-2xl 
                p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <PieChart size={24} />
                  Revenue Distribution
                </h3>
                <span className="p-2 bg-gray-100 border-2 border-black 
                  rounded-lg">
                  <Settings size={20} />
                </span>
              </div>
              
              <div className="space-y-4">
                <DistributionCard
                  title="Artist Share"
                  value={dashboardData.distributionSettings?.artistShare || 0}
                  color="text-green-600"
                />
                <DistributionCard
                  title="Gallery Share"
                  value={dashboardData.distributionSettings?.galleryShare || 0}
                  color="text-blue-600"
                />
                <DistributionCard
                  title="Platform Fee"
                  value={dashboardData.distributionSettings?.platformFee || 0}
                  color="text-purple-600"
                />
              </div>
            </motion.div>
          </div>

          
          <AnalyticsSection />
          
          
          <NFTGrid />
        </div>
      </div>

      <CreateNFTModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ArtistDashboard; 