# NotesApp - Full-Stack Note-Taking Application

A modern, responsive note-taking application built with React TypeScript frontend and Node.js TypeScript backend.

## Features

- **User Authentication**
  - Email/Password signup with OTP verification
  - Google OAuth integration
  - JWT-based authorization
  - Secure password hashing

- **Notes Management**
  - Create, read, and delete notes
  - Real-time updates
  - User-specific notes

- **Responsive Design**
  - Mobile-friendly interface
  - Modern UI/UX
  - Cross-browser compatibility

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation
- Axios for API calls
- Google OAuth integration
- Responsive CSS

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Nodemailer for email services
- Google Auth Library

## Prerequisites

- Node.js (v20.18.0 or higher)
- MongoDB (local or cloud instance)
- Gmail account for email services
- Google Cloud Console project for OAuth

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HighwayAssign
```

### 2. Backend Setup

```bash
cd notesapp-backend
npm install
```

Create `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notesapp
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../notesapp-frontend
npm install
```

Create `.env` file in the frontend directory:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins:
   - `http://localhost:3000` (for development)
   - Your production domain
6. Copy Client ID and Client Secret to your `.env` files

### 5. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in `EMAIL_PASS` environment variable

### 6. MongoDB Setup

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/notesapp` as MONGODB_URI

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string and replace MONGODB_URI

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd notesapp-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd notesapp-frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Production Build

**Backend:**
```bash
cd notesapp-backend
npm run build
npm start
```

**Frontend:**
```bash
cd notesapp-frontend
npm run build
npm run preview
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth

### Notes (Protected Routes)
- `GET /api/notes` - Get user notes
- `POST /api/notes` - Create new note
- `DELETE /api/notes/:id` - Delete note

## Project Structure

```
HighwayAssign/
├── notesapp-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── notesapp-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── App.css
│   ├── .env
│   └── package.json
└── README.md
```

## Features Implementation

### 1. User Registration & Authentication
- Email validation and OTP verification
- Secure password hashing with bcrypt
- JWT token generation and validation
- Google OAuth integration

### 2. Notes Management
- CRUD operations for notes
- User-specific note isolation
- Real-time updates

### 3. Security Features
- JWT-based authentication
- Protected API routes
- Input validation
- CORS configuration

### 4. Error Handling
- Comprehensive error messages
- Input validation errors
- API failure handling
- User-friendly error display

## Deployment

### Backend Deployment (Railway/Heroku)
1. Create account on Railway or Heroku
2. Connect your repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Create account on Vercel or Netlify
2. Connect your repository
3. Set build command: `npm run build`
4. Set environment variables
5. Deploy

### Environment Variables for Production
Update your environment variables with production URLs and credentials.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string
   - Verify network access (for Atlas)

2. **Email Not Sending**
   - Verify Gmail credentials
   - Check app password
   - Enable less secure apps (if needed)

3. **Google OAuth Not Working**
   - Verify client ID
   - Check authorized origins
   - Ensure OAuth consent screen is configured

4. **CORS Errors**
   - Check frontend URL in backend CORS configuration
   - Verify API endpoints

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository.