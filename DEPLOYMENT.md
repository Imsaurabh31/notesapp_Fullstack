# Deployment Guide

## Quick Deploy Commands

### 1. Build Everything
```bash
npm run build-all
```

### 2. Deploy Backend (Railway)
1. Go to [Railway](https://railway.app)
2. Connect GitHub repository
3. Select `notesapp-backend` folder
4. Add environment variables:
   - `PORT=5000`
   - `MONGODB_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret`
   - `EMAIL_USER=your_gmail`
   - `EMAIL_PASS=your_gmail_app_password`
   - `GOOGLE_CLIENT_ID=your_google_client_id`
   - `GOOGLE_CLIENT_SECRET=your_google_client_secret`
   - `NODE_ENV=production`

### 3. Deploy Frontend (Vercel)
1. Go to [Vercel](https://vercel.com)
2. Import GitHub repository
3. Set root directory to `notesapp-frontend`
4. Add environment variables:
   - `REACT_APP_API_URL=your_railway_backend_url/api`
   - `REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id`

### Alternative: Netlify Frontend
1. Go to [Netlify](https://netlify.com)
2. Drag and drop `notesapp-frontend/dist` folder
3. Set environment variables in site settings

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

## Deployment Status Check

After deployment, test these endpoints:
- Backend: `https://your-backend-url/api/test`
- Frontend: `https://your-frontend-url`

## Troubleshooting

### 404 Errors
- Check build output directory
- Verify environment variables
- Ensure correct start commands

### CORS Errors
- Update backend CORS to include frontend URL
- Check API_URL in frontend environment

### Database Connection
- Verify MongoDB URI
- Check network access in MongoDB Atlas