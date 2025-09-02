# Deployment Guide

## Quick Deployment Options

### 1. Railway (Backend) + Vercel (Frontend)

#### Backend on Railway:
1. Create account at [Railway](https://railway.app)
2. Connect GitHub repository
3. Select `notesapp-backend` folder
4. Add environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NODE_ENV=production
   ```
5. Deploy

#### Frontend on Vercel:
1. Create account at [Vercel](https://vercel.com)
2. Connect GitHub repository
3. Select `notesapp-frontend` folder
4. Add environment variables:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   REACT_APP_API_URL=https://your-railway-backend-url.railway.app/api
   ```
5. Deploy

### 2. Heroku (Backend) + Netlify (Frontend)

#### Backend on Heroku:
1. Install Heroku CLI
2. Create Heroku app:
   ```bash
   cd notesapp-backend
   heroku create your-app-name
   ```
3. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASS=your_email_password
   heroku config:set GOOGLE_CLIENT_ID=your_google_client_id
   heroku config:set GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. Deploy:
   ```bash
   git subtree push --prefix notesapp-backend heroku master
   ```

#### Frontend on Netlify:
1. Create account at [Netlify](https://netlify.com)
2. Connect GitHub repository
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `notesapp-frontend`
4. Add environment variables in Netlify dashboard
5. Deploy

### 3. DigitalOcean App Platform (Full-Stack)

1. Create account at [DigitalOcean](https://digitalocean.com)
2. Create new App
3. Connect GitHub repository
4. Configure services:
   - Backend: Node.js service from `notesapp-backend`
   - Frontend: Static site from `notesapp-frontend`
5. Add environment variables
6. Deploy

## Database Options

### MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://mongodb.com/atlas)
2. Create cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Use in MONGODB_URI environment variable

### Local MongoDB (Development)
```bash
# Install MongoDB locally
# Start MongoDB service
mongod --dbpath /path/to/your/db
```

## Environment Variables Checklist

### Backend (.env)
- [ ] PORT
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] EMAIL_USER
- [ ] EMAIL_PASS
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET
- [ ] NODE_ENV

### Frontend (.env)
- [ ] REACT_APP_GOOGLE_CLIENT_ID
- [ ] REACT_APP_API_URL

## Post-Deployment Steps

1. **Update Google OAuth Settings:**
   - Add production URLs to authorized origins
   - Add production URLs to authorized redirect URIs

2. **Test All Features:**
   - [ ] User registration with email/OTP
   - [ ] Google OAuth login
   - [ ] Email/password login
   - [ ] Create notes
   - [ ] Delete notes
   - [ ] Responsive design on mobile

3. **Monitor Logs:**
   - Check backend logs for errors
   - Monitor frontend console for issues

## Troubleshooting

### Common Deployment Issues:

1. **CORS Errors:**
   - Update backend CORS configuration with frontend URL
   - Check environment variables

2. **Database Connection:**
   - Verify MongoDB URI
   - Check network access settings

3. **Email Not Working:**
   - Verify Gmail app password
   - Check email service configuration

4. **Google OAuth Issues:**
   - Update authorized origins in Google Console
   - Verify client ID in frontend

## Performance Optimization

1. **Backend:**
   - Enable gzip compression
   - Add rate limiting
   - Implement caching

2. **Frontend:**
   - Code splitting
   - Image optimization
   - Bundle analysis

## Security Considerations

1. **Environment Variables:**
   - Never commit .env files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **Database:**
   - Use strong passwords
   - Enable authentication
   - Regular backups

3. **API:**
   - Implement rate limiting
   - Input validation
   - HTTPS only in production