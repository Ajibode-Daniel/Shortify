import { Response } from 'express';
import Url from '../models/urlModel';
import { setCache, getCache } from '../services/cacheService';
import { AuthenticatedRequest } from '../middlewares/authMiddleware'; // Import your custom type

export const getAnalytics = async (req: AuthenticatedRequest, res: Response) => {
  const { shortUrl } = req.params;

  const cachedAnalytics = getCache(`analytics_${shortUrl}`);

  if (cachedAnalytics) {
    return res.status(200).json(cachedAnalytics);
  }

  try {
    const url = await Url.findOne({ shortUrl, userId: req.user?.id });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    const analytics = {
      clicks: url.clicks,
      clickDetails: url.clickDetails,
    };

    setCache(`analytics_${shortUrl}`, analytics);

    return res.status(200).json(analytics);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
