const express = require('express');
const router = express.Router();
const NFT = require('../models/nft.model');


router.post('/nfts', async (req, res) => {
  try {
    const {
      tokenId,
      title,
      description,
      price,
      ipfsHash,
      artistAddress,
      galleryAddress,
      metadata
    } = req.body;

    const nft = new NFT({
      tokenId,
      title,
      description,
      price,
      ipfsHash,
      artistAddress,
      galleryAddress,
      metadata,
      contractAddress: process.env.ARTBLOCK_CONTRACT_ADDRESS,
      network: 'linea-sepolia',
      createdAt: new Date()
    });

    await nft.save();
    res.status(201).json(nft);
  } catch (err) {
    console.error('Error storing NFT:', err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/nfts/artist/:address', async (req, res) => {
  try {
    const nfts = await NFT.find({ 
      artistAddress: req.params.address.toLowerCase() 
    }).sort({ createdAt: -1 });
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 