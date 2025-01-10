import axios from 'axios';

const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
const pinataSecretKey = process.env.REACT_APP_PINATA_SECRET_KEY;

export const uploadToIPFS = async (file) => {
  try {
    // Create form data
    const formData = new FormData();
    
    // If the input is a File object (for images)
    if (file instanceof File) {
      formData.append('file', file);
    } 
    // If the input is JSON metadata
    else {
      const blob = new Blob([JSON.stringify(file)], { type: 'application/json' });
      formData.append('file', blob, 'metadata.json');
    }

    // Upload to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretKey,
        },
      }
    );

    // Return the IPFS hash
    return response.data.IpfsHash;
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw new Error('Failed to upload to IPFS');
  }
}; 