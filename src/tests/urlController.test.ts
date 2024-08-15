import request from 'supertest';
import app from '../app'; // Ensure the path is correct

describe('GET /', () => {
  it('should return Hello, Scissor URL Shortener!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Scissor URL Shortener!');
  });
});
