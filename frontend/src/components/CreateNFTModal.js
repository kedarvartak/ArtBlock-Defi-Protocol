import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'react-feather';

const CreateNFTModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    gallery: '',
    tags: [],
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentTag, setCurrentTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample galleries - replace with actual data from backend
  const galleries = [
    { id: '1', name: 'Modern Art Gallery' },
    { id: '2', name: 'Digital Dreams' },
    { id: '3', name: 'Crypto Collection' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Handle form submission here
      // You'll need to:
      // 1. Upload image to IPFS
      // 2. Create NFT metadata
      // 3. Save to MongoDB
      // 4. Close modal on success
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 
        flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white border-4 border-black rounded-2xl 
            shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 max-w-2xl w-full 
            max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black">Create New NFT 🎨</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 
              rounded-xl text-red-600 text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="font-bold block mb-2">NFT Image</label>
              <div className="border-3 border-black rounded-xl p-4 
                bg-gray-50 text-center">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-white 
                        border-2 border-black rounded-lg hover:bg-gray-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-gray-600">
                      Drag and drop your image here or click to browse
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="nft-image"
                    />
                    <label
                      htmlFor="nft-image"
                      className="inline-block px-6 py-3 bg-[#FFE951] 
                        text-base font-bold border-3 border-black rounded-xl 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                        hover:shadow-none transition-all cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="font-bold block mb-2">NFT Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-3 border-black 
                  rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  focus:shadow-none transition-all outline-none"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="font-bold block mb-2">Price (ETH)</label>
              <input
                type="number"
                step="0.001"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-3 border-black 
                  rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  focus:shadow-none transition-all outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-bold block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white border-3 border-black 
                  rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  focus:shadow-none transition-all outline-none"
                required
              />
            </div>

            {/* Gallery Selection */}
            <div>
              <label className="font-bold block mb-2">Select Gallery</label>
              <select
                name="gallery"
                value={formData.gallery}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-3 border-black 
                  rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  focus:shadow-none transition-all outline-none"
                required
              >
                <option value="">Select a gallery</option>
                {galleries.map(gallery => (
                  <option key={gallery.id} value={gallery.id}>
                    {gallery.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="font-bold block mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 border-2 border-black 
                      rounded-lg font-medium flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white border-3 border-black 
                    rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                    focus:shadow-none transition-all outline-none"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-3 bg-[#FFE951] text-base font-bold 
                    border-3 border-black rounded-xl 
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
                    transition-all whitespace-nowrap"
                >
                  Add Tag
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
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
                  Creating...
                </span>
              ) : (
                'Create NFT'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateNFTModal; 