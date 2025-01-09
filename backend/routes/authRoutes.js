import express from 'express';
import { registerUser, loginUser } from '../services/authService.js';
import { deployContractForUser, checkDeploymentStatus } from '../utils/contractDeployment.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password, walletAddress } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { walletAddress }] 
    });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username or wallet address already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create initial user
    const newUser = new User({
      username,
      password: hashedPassword,
      walletAddress: walletAddress.toLowerCase(),
      role: 'artist',
      contract: {
        network: 'sepolia',
        totalMinted: 0,
        deploymentStatus: 'pending'
      }
    });

    // Save user first
    const savedUser = await newUser.save();

    try {
      // Deploy contract
      const deploymentResult = await deployContractForUser(username);
      
      // Update user with contract details
      await User.findByIdAndUpdate(
        savedUser._id,
        {
          'contract.address': deploymentResult.contractAddress,
          'contract.deploymentDate': new Date(),
          'contract.transactionHash': deploymentResult.transactionHash,
          'contract.blockExplorerUrl': deploymentResult.blockExplorerUrl,
          'contract.transactionId': deploymentResult.transactionId,
          'contract.deploymentStatus': deploymentResult.status === 'Sent' ? 'pending' : 'deployed'
        }
      );
    } catch (deployError) {
      console.error('Contract deployment failed:', deployError);
      // Continue with registration even if contract deployment fails
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        walletAddress: savedUser.walletAddress,
        contract: savedUser.contract
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ 
      message: 'Registration failed',
      error: error.message 
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { password, walletAddress } = req.body;
    const result = await loginUser({ password, walletAddress });
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Test auth route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

export default router; 