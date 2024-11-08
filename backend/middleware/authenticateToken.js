
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token:', token); 
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.', success: false });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.', success: false });

        req.user = user; 
        console.log('User from token:', user); 
        next();
    });
};

export default authenticateToken;
