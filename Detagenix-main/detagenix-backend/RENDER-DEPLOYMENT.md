# Render Deployment Guide for Detagenix Backend

## Prerequisites
- Render account (free tier available)
- MongoDB Atlas account (free tier available)
- GitHub repository

## Step 1: Prepare MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Cluster**
   - Create a free M0 cluster
   - Choose a cloud provider and region (closest to your users)

3. **Setup Database Access**
   - Database Access → Add New Database User
   - Create username and password (save these!)
   - Grant "Read and write to any database" permission

4. **Setup Network Access**
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Render to connect

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/detagenix?retryWrites=true&w=majority`

## Step 2: Push Code to GitHub (if not already done)

```bash
cd C:\Users\Rahul\Desktop\Detagenix\Detagenix-main\detagenix-backend
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 3: Deploy on Render

1. **Sign Up / Login to Render**
   - Go to https://render.com/
   - Sign up or login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `detagenix-backend` folder or repository

3. **Configure Service Settings**
   - **Name**: `detagenix-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty if backend is at root, otherwise set path
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/detagenix?retryWrites=true&w=majority
   JWT_SECRET=generate_a_long_random_string_here_at_least_32_characters
   FRONTEND_URL=https://your-frontend-domain.com
   ```

   **Important Notes:**
   - `MONGO_URI`: Your MongoDB Atlas connection string from Step 1
   - `JWT_SECRET`: Generate a secure random string (use https://randomkeygen.com/)
   - `FRONTEND_URL`: Your actual frontend domain (update after frontend deployment)
   - `PORT`: Render uses this automatically

5. **Create Service**
   - Click "Create Web Service"
   - Render will automatically deploy your backend
   - Wait 5-10 minutes for first deployment

## Step 4: Create Admin User

After deployment, you need to create the admin user in MongoDB:

**Option 1: MongoDB Atlas Web Interface**
1. Go to MongoDB Atlas → Browse Collections
2. Select your database → `admins` collection
3. Click "Insert Document"
3. Add:
   ```json
   {
     "email": "admin@detagenix.com",
     "password": "Atarsen101@"
   }
   ```

**Option 2: Using Render Shell**
1. In Render dashboard, go to your service
2. Click "Shell" tab
3. Run:
   ```bash
   node createAdmin.js
   ```

## Step 5: Test Deployment

1. **Get Your Backend URL**
   - In Render dashboard, you'll see: `https://detagenix-backend.onrender.com`
   - Copy this URL

2. **Test API Endpoints**
   ```bash
   # Test root endpoint
   curl https://detagenix-backend.onrender.com/

   # Test admin login
   curl -X POST https://detagenix-backend.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@detagenix.com","password":"Atarsen101@"}'
   ```

3. **Expected Response**
   - Root: "Detagenix Backend Running"
   - Login: JSON with token

## Step 6: Update Frontend

Update your frontend environment variables:
```
REACT_APP_BASE_URL=https://detagenix-backend.onrender.com
```

Then rebuild and redeploy your frontend.

## Step 7: Update CORS (Important!)

After deploying frontend, update `FRONTEND_URL` in Render:
1. Go to Render dashboard → Your service
2. Environment → Edit `FRONTEND_URL`
3. Set to your actual frontend URL: `https://your-frontend-domain.com`
4. Save (service will auto-redeploy)

## Troubleshooting

### Service Won't Start
- Check logs in Render dashboard
- Verify all environment variables are set
- Check MongoDB connection string is correct

### Connection Errors
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check database user has correct permissions
- Verify connection string password is URL-encoded

### Admin Login Not Working
- Verify admin user exists in MongoDB
- Check JWT_SECRET is set in environment variables
- Check backend logs for errors

### CORS Errors
- Update FRONTEND_URL in Render environment variables
- Make sure frontend domain is correct
- Check allowedOrigins in index.js includes your domain

## Important Notes

1. **Free Tier Limitations**
   - Render free tier spins down after 15 minutes of inactivity
   - First request after spin-down takes 30-60 seconds
   - Upgrade to paid tier for always-on service

2. **Environment Variables**
   - Never commit .env file to GitHub
   - Keep JWT_SECRET secure and random
   - Update FRONTEND_URL after frontend deployment

3. **MongoDB Atlas**
   - Free tier includes 512MB storage
   - Monitor usage in Atlas dashboard
   - Set up backups for production

4. **File Uploads**
   - Render ephemeral filesystem: uploaded files deleted on restart
   - For production, use AWS S3 or Cloudinary
   - Current `/uploads` folder won't persist

## Monitoring

- **Render Dashboard**: View logs, metrics, deployments
- **MongoDB Atlas**: Monitor database performance, storage
- **Set up alerts**: Configure email notifications for errors

## Next Steps

1. Deploy frontend (website-build) to hosting service
2. Deploy admin panel (admin-build) separately or on subdomain
3. Update FRONTEND_URL in Render after frontend deployment
4. Test all API endpoints from frontend
5. Change default admin password
6. Set up custom domain (optional)
7. Configure SSL certificate (automatic on Render)

## Support

- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Issues: Check Render logs and MongoDB Atlas monitoring
