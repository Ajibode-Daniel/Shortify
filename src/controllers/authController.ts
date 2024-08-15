import { Response } from 'express';
import User, { IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middlewares/authMiddleware'; // Import the custom interface

// Generate JWT Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

// User Signup
export const signupUser = async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = (await User.create({ name, email, password })) as IUser;

  if (user) {
    res.status(201).json({
      _id: user._id.toString(), // Convert ObjectId to string
      email: user.email,
      token: generateToken(user._id.toString()), // Convert ObjectId to string
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// User Login
export const loginUser = async (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body;

  const user = (await User.findOne({ email })) as IUser;

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id.toString(),
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Get User Profile
export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  const user = (await User.findById(req.user?.id).select('-password')) as IUser;

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
