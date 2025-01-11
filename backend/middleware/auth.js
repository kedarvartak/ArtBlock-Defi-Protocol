import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Curator from '../models/Curator.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id) || 
                    await Curator.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const authenticateCurator = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id) || 
                    await Curator.findById(decoded.id);

        if (!user || user.role !== 'curator') {
            return res.status(403).json({ message: 'Curator access required' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Curator auth error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const authenticateArtist = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== 'artist') {
            return res.status(403).json({ message: 'Artist access required' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Artist auth error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}; 