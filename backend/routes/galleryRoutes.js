import express from 'express';
import { 
    createGallery,
    getGalleryDetails,
    claimGalleryRevenue,
    getCuratorGalleries,
    updateGalleryStats
} from '../controllers/galleryController.js';
import { authenticateCurator } from '../middleware/auth.js';
import { 
    validateGalleryOwnership,
    validateGalleryStatus,
    validateGalleryRevenue 
} from '../middleware/galleryValidation.js';

const router = express.Router();

// Public routes
router.get('/details/:galleryId', getGalleryDetails);

// Protected routes
router.post('/create', authenticateCurator, createGallery);
router.get('/curator/:curatorId?', authenticateCurator, getCuratorGalleries);

// Protected routes with gallery validation
router.post(
    '/claim-revenue/:galleryId', 
    authenticateCurator, 
    validateGalleryOwnership,
    validateGalleryStatus,
    validateGalleryRevenue,
    claimGalleryRevenue
);

router.patch(
    '/stats/:galleryId',
    authenticateCurator,
    validateGalleryOwnership,
    validateGalleryStatus,
    updateGalleryStats
);

export default router; 