import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useNFTContract from '../hooks/useNFTContract';
import axiosInstance from '../utils/axios';

const CreateNFTModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
    galleryAddress: ''
  });
  
  const [localError, setLocalError] = useState('');
  const { mintNFT, loading, error: contractError } = useNFTContract();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, image: file }));
      setLocalError('');
    } else {
      setLocalError('Please select a valid image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    try {
      if (!formData.image) {
        setLocalError('Please select an image file');
        return;
      }

      const receipt = await mintNFT(formData, formData.galleryAddress);
      console.log("Mint receipt:", receipt);

      const mintEvent = receipt.logs.find(
        log => log.fragment && log.fragment.name === 'ArtworkMinted'
      );

      if (!mintEvent) {
        throw new Error('Minting event not found in transaction receipt');
      }

      // Extract and log the tokenId
      const tokenId = mintEvent.args[0];
      console.log('🎉 NFT Minted Successfully!');
      console.log('Token ID:', tokenId.toString());
      console.log('View on OpenSea:', `https://testnets.opensea.io/assets/linea-sepolia/${process.env.REACT_APP_ARTBLOCK_CONTRACT_ADDRESS}/${tokenId}`);

      alert(`NFT minted successfully! Token ID: ${tokenId}`);
      onClose();

    } catch (err) {
      console.error('Minting failed:', err);
      setLocalError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Create New NFT</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (ETH)</label>
            <input
              type="number"
              step="0.001"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Artwork File</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gallery Address</label>
            <input
              type="text"
              value={formData.galleryAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, galleryAddress: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {(localError || contractError) && (
            <div className="text-red-500 text-sm">
              {localError || contractError}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create NFT'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateNFTModal; 