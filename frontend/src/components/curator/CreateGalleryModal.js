import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import axiosInstance from '../../utils/axios';

const CreateGalleryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    theme: 'modern',
    submissionGuidelines: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/api/galleries/create', formData);
      console.log('Gallery created:', response.data);
      
      // Close modal and reset form
      onClose();
      setFormData({
        name: '',
        description: '',
        theme: 'modern',
        submissionGuidelines: '',
        coverImage: ''
      });
      
      // Optionally refresh the dashboard
      window.location.reload();
    } catch (err) {
      console.error('Error creating gallery:', err);
      setError(err.response?.data?.message || 'Failed to create gallery');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-4 border-black rounded-2xl p-6 w-full max-w-lg 
          shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Create New Gallery</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Gallery Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border-2 border-black rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border-2 border-black rounded-xl"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Theme</label>
            <select
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
              className="w-full p-3 border-2 border-black rounded-xl"
            >
              <option value="modern">Modern</option>
              <option value="classical">Classical</option>
              <option value="contemporary">Contemporary</option>
              <option value="minimalist">Minimalist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Submission Guidelines</label>
            <textarea
              value={formData.submissionGuidelines}
              onChange={(e) => setFormData({ ...formData, submissionGuidelines: e.target.value })}
              className="w-full p-3 border-2 border-black rounded-xl"
              rows="3"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-[#FFE951] font-bold border-2 border-black 
              rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
              transition-all ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Creating...' : 'Create Gallery'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateGalleryModal; 