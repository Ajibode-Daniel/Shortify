import { generateShortUrl } from '../services/urlService';

describe('URL Service Tests', () => {
  it('should generate a short URL', async () => {
    const longUrl = 'https://www.example.com';
    const { shortUrl } = await generateShortUrl(longUrl); // Await the promise to resolve

    // Ensure the short URL starts with the expected base URL
    expect(shortUrl.startsWith('https://scissor.com/')).toBe(true);

    // Ensure the short URL has a length of base URL + 6 characters
    expect(shortUrl.length).toBe('https://scissor.com/'.length + 6);
  });
});
