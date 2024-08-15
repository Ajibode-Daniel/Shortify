import express from 'express';
import { shortenUrl, customizeUrl, getQrCode, getAnalytics, getLinkHistory } from '../controllers/urlController';
import { trackAnalytics } from '../middlewares/analyticsMiddleware';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.post('/customize', customizeUrl);
router.get('/qrcode/:shortUrl', getQrCode);
router.get('/analytics/:shortUrl', getAnalytics);
router.get('/:shortUrl', trackAnalytics);
router.get('/history', getLinkHistory);

export default router;
