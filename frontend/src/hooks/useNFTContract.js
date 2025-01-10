import { useState } from 'react';
import { BrowserProvider, Contract, parseEther, formatEther } from 'ethers';
import { uploadToIPFS } from '../utils/ipfs';
import { contractABI } from '../constants/contractABI';

const useNFTContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mintNFT = async (artwork, galleryAddress) => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      setLoading(true);
      setError(null);

      const user = JSON.parse(localStorage.getItem('artblock_user'));
      const artistAddress = user.walletAddress;

      // Upload to IPFS and create metadata
      const imageHash = await uploadToIPFS(artwork.image);
      const metadata = {
        name: artwork.title,
        description: artwork.description,
        image: `ipfs://${imageHash}`,
        attributes: [
          {
            trait_type: "Artist",
            value: artistAddress
          },
          {
            trait_type: "Gallery",
            value: galleryAddress
          }
        ]
      };

      const metadataHash = await uploadToIPFS(JSON.stringify(metadata));

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(
        process.env.REACT_APP_ARTBLOCK_CONTRACT_ADDRESS,
        contractABI,
        signer
      );

      const price = parseEther(artwork.price.toString());
      
      console.log('Minting with params:', {
        artist: artistAddress,
        gallery: galleryAddress,
        title: artwork.title,
        description: artwork.description,
        ipfsHash: imageHash,
        price: price.toString(),
        uri: `ipfs://${metadataHash}`
      });

      const tx = await contract.mint(
        artistAddress,
        galleryAddress,
        artwork.title,
        artwork.description,
        imageHash,
        price,
        `ipfs://${metadataHash}`
      );

      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction receipt:', receipt);

      return receipt;

    } catch (err) {
      console.error('NFT minting error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getArtistNFTs = async (artistAddress) => {
    try {
      if (!artistAddress) {
        console.log('No artist address provided');
        return [];
      }

      console.log('Getting NFTs for artist:', artistAddress);
      
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(
        process.env.REACT_APP_ARTBLOCK_CONTRACT_ADDRESS,
        contractABI,
        provider
      );

      // Get all ArtworkMinted events for this artist
      const filter = contract.filters.ArtworkMinted(null, artistAddress);
      const events = await contract.queryFilter(filter);
      console.log('ArtworkMinted events:', events);

      const artistNFTs = await Promise.all(events.map(async (event) => {
        try {
          const { tokenId, artist, ipfsHash, price } = event.args;
          
          return {
            tokenId: tokenId.toString(),
            artist,
            ipfsHash,
            price: formatEther(price),
            image: `https://ipfs.io/ipfs/${ipfsHash}`,
            title: `Artwork #${tokenId}`,
            isListed: true 
          };
        } catch (err) {
          console.error('Error processing event:', err);
          return null;
        }
      }));

      const validNFTs = artistNFTs.filter(nft => nft !== null);
      console.log('Found artist NFTs:', validNFTs);
      return validNFTs;

    } catch (err) {
      console.error('Error fetching artist NFTs:', err);
      return [];
    }
  };

  return {
    mintNFT,
    getArtistNFTs,
    loading,
    error
  };
};

export default useNFTContract; 