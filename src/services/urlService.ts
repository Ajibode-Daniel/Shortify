import Url from '../models/urlModel';
import QRCode from 'qrcode';

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const generateShortUrl = async (
  longUrl: string,
  customCode?: string
): Promise<{ shortUrl: string; qrCode: string }> => {
  if (!isValidUrl(longUrl)) {
    throw new Error('Invalid URL');
  }
  const {nanoid} = await import ('nanoid')
  
  const urlCode = customCode || nanoid(6);
  const baseUrl = process.env.BASE_URL || '';

  const existingUrl = await Url.findOne({ longUrl });

  if (existingUrl) {
    return {
      shortUrl: existingUrl.shortUrl,
      qrCode: existingUrl.qrCode || '', // Return existing QR code or an empty string if not available
    };
  }

  const shortUrl = `${baseUrl}/${urlCode}`;

  // Generate QR code
  const qrCode = await QRCode.toDataURL(shortUrl);

  const newUrl = new Url({ longUrl, shortUrl, urlCode, qrCode });
  await newUrl.save();

  return { shortUrl, qrCode }; // Ensure a return statement in all paths
};
