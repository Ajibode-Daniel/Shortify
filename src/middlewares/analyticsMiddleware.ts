import { Request, Response, NextFunction } from 'express';
import Url from '../models/urlModel';
import geoip from 'geoip-lite';

export const trackAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { shortUrl } = req.params;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const geo = geoip.lookup(ip as string);

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    url.clicks += 1;
    url.clickDetails.push({
      ip: ip as string,
      country: geo?.country || 'Unknown',
      city: geo?.city || 'Unknown',
    });

    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
