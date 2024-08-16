
# Shortify

Shortify is a URL shortening platform that allows users to shorten long URLs, customize short URLs, generate QR codes for URLs, and track analytics such as clicks and user interactions. The platform provides a simple and secure way to manage URLs and is built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **User Authentication**: Users can sign up, log in, and manage their profile.
- **URL Shortening**: Convert long URLs into short, easy-to-share links.
- **Custom URLs**: Customize short URLs with your own preferred alias.
- **QR Code Generation**: Generate QR codes for any shortened URL.
- **Analytics**: Track clicks, view detailed analytics, and monitor user interactions with your URLs.
- **Link History**: View a history of all URLs you've shortened.

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Caching**: Redis (for caching URL analytics)
- **Other Tools**: dotenv (environment variable management), bcrypt (password hashing)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Redis](https://redis.io/) (for caching, optional)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ajibode-Daniel/Shortify.git
   cd Shortify
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   In the root directory, create a `.env` file with the following environment variables:

   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/shortify
   JWT_SECRET=your_secret_key_here
   ```

4. **Compile TypeScript**:
   ```bash
   npm run build
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

### API Endpoints

#### Authentication

- **POST /api/auth/signup**: Sign up a new user.
  - Request Body: `{ "name": "Temi Tems", "email": "Temsbaby@example.com", "password": "Mybabypassword" }`

- **POST /api/auth/login**: Log in a user.
  - Request Body: `{ "email": "Temsbaby@example.com", "password": "Mybabypassword" }`

- **GET /api/auth/profile**: Get the authenticated user's profile.
  - Headers: `Authorization: Bearer <JWT>`

#### URL Management

- **POST /shorten**: Shorten a long URL.
  - Headers: `Authorization: Bearer <JWT>`
  - Request Body: `{ "longUrl": "https://www.example.com" }`

- **POST /customize**: Customize a short URL.
  - Headers: `Authorization: Bearer <JWT>`
  - Request Body: `{ "shortUrl": "shortcode", "customCode": "custom-alias" }`

- **GET /qrcode/:shortUrl**: Get a QR code for a short URL.

- **GET /analytics/:shortUrl**: Get analytics for a short URL.
  - Headers: `Authorization: Bearer <JWT>`

- **GET /history**: Get the authenticated user's URL history.
  - Headers: `Authorization: Bearer <JWT>`

### Running Tests

Run the unit and integration tests using Jest:

```bash
npm test
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue if you have any suggestions or improvements.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact

If you have any questions or need further assistance, feel free to reach out:

- **GitHub**: [Ajibode-Daniel](https://github.com/Ajibode-Daniel)

