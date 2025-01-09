import axios from 'axios';

const testVerbwireKey = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://api.verbwire.com/v1/nft/data/owned',
      headers: {
        'X-API-Key': process.env.VERBWIRE_API_KEY
      }
    });
    console.log('Verbwire API Test Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Verbwire API Test Error:', {
      status: error.response?.status,
      message: error.response?.data,
      headers: error.response?.headers
    });
    throw error;
  }
};

// Run the test
testVerbwireKey(); 