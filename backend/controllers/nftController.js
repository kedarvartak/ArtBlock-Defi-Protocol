import NFT from '../models/nft.model.js';
import Gallery from '../models/Gallery.js';
import contractService from '../services/contractService.js';

export const mintNFTInGallery = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            ipfsHash,
            galleryId,
            metadata
        } = req.body;
        const artistAddress = req.user.walletAddress;

        // Validate gallery
        const gallery = await Gallery.findById(galleryId);
        if (!gallery || gallery.status !== 'active') {
            return res.status(400).json({ 
                message: 'Invalid or inactive gallery' 
            });
        }

        // Mint NFT on blockchain
        const mintResult = await contractService.artBlockNFT.mint(
            artistAddress,
            gallery.galleryAddress,
            title,
            description,
            ipfsHash,
            ethers.parseEther(price.toString()),
            metadata.uri
        );

        // Create NFT record
        const nft = new NFT({
            tokenId: mintResult.tokenId,
            title,
            description,
            price,
            ipfsHash,
            artistAddress: artistAddress.toLowerCase(),
            galleryAddress: gallery.galleryAddress.toLowerCase(),
            metadata,
            contractAddress: process.env.ARTBLOCK_NFT_ADDRESS,
            network: process.env.NETWORK || 'sepolia',
            status: 'listed',
            mintTransactionHash: mintResult.transactionHash
        });

        await nft.save();

        // Update gallery stats
        await Gallery.findByIdAndUpdate(galleryId, {
            $inc: {
                'stats.artworksCount': 1
            },
            $addToSet: {
                artworks: nft._id,
                artists: req.user.id
            }
        });

        res.status(201).json({
            success: true,
            nft,
            transaction: mintResult.transactionHash
        });

    } catch (error) {
        console.error('NFT Minting error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

export const getGalleryNFTs = async (req, res) => {
    try {
        const { galleryId } = req.params;
        const gallery = await Gallery.findById(galleryId);
        
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }

        const nfts = await NFT.find({ 
            galleryAddress: gallery.galleryAddress.toLowerCase() 
        }).sort({ createdAt: -1 });

        res.json(nfts);

    } catch (error) {
        console.error('Error fetching gallery NFTs:', error);
        res.status(500).json({ message: error.message });
    }
};

// ... other NFT-related functions ... 