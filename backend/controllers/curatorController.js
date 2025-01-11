import Curator from '../models/Curator.js';
import Gallery from '../models/Gallery.js';

export const getCuratorDashboard = async (req, res) => {
  try {
    const curator = await Curator.findById(req.params.id);
    if (!curator) {
      return res.status(404).json({ message: 'Curator not found' });
    }

    console.log('Raw curator data from DB:', curator); 

    const response = {
      profile: {
        ...curator.profile.toObject(),
        role: 'Curator',
        badges: ['🏛️', '👨‍🎨', '🎭']
      },
      analytics: {
        ...curator.analytics.toObject(),
      },
      contract: {
        ...curator.contract.toObject(),
      },
      galleries: await Gallery.find({ curator: curator._id })
        .select('name description coverImage artworksCount artistsCount visitorCount')
        .lean()
    };

    console.log('Sending response:', response); // Debug log
    res.json(response);

  } catch (error) {
    console.error('Curator Dashboard Error:', error);
    res.status(500).json({ message: error.message });
  }
}; 