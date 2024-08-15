import { Request, Response } from 'express';
import { generateShortUrl } from '../services/urlService';
import { setCache, getCache } from '../services/cacheService';
import { AuthenticatedRequest } from '../middlewares/authMiddleware'; // Custom type for req.user
import Url from '../models/urlModel';
import QRCode from 'qrcode';

export const shortenUrl = async (req: Request, res: Response) => {
  const { longUrl, customCode } = req.body;

  if (!longUrl) {
    return res.status(400).json({ message: 'longUrl is required' });
  }

  const cachedUrl = getCache(longUrl);

  if (cachedUrl) {
    return res.status(200).json({ shortUrl: cachedUrl });
  }

  try {
    const { shortUrl, qrCode } = await generateShortUrl(longUrl, customCode);
    setCache(longUrl, shortUrl);
    return res.status(201).json({ shortUrl, qrCode });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid URL') {
        return res.status(400).json({ message: 'Invalid URL provided' });
      }
      return res.status(500).json({ message: 'Server error: ' + error.message });
    }

    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

export const getLinkHistory = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const urls = await Url.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ urls });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Customize URL
export const customizeUrl = async (req: AuthenticatedRequest, res: Response) => {
  const { shortUrl, customCode } = req.body;
  
  const url = await Url.findOneAndUpdate(
    { shortUrl, userId: req.user?.id },
    { shortUrl: customCode },
    { new: true }
  );

  if (url) {
    return res.status(200).json(url);
  } else {
    return res.status(404).json({ message: 'URL not found or could not be updated' });
  }
};

// Generate QR Code
export const getQrCode = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const qrCode = await QRCode.toDataURL(url.shortUrl);
    return res.status(200).json({ qrCode });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get Analytics
export const getAnalytics = async (req: AuthenticatedRequest, res: Response) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl, userId: req.user?.id });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const analytics = {
      clicks: url.clicks,
      clickDetails: url.clickDetails,
    };

    return res.status(200).json(analytics);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
