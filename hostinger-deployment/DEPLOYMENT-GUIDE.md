# Detagenix Hostinger Deployment Guide

## 📦 Package Contents
- `backend/` - Node.js Express backend with MongoDB
- `frontend/` - React frontend with admin panel

## 🚀 Deployment Steps

### Step 1: Upload Files to Hostinger
1. Compress both folders: `backend` and `frontend`
2. Login to Hostinger control panel
3. Go to **File Manager** or use **FTP/SFTP**
4. Upload the compressed files to your hosting directory
5. Extract them on the server

### Step 2: Backend Setup (Node.js App)

#### 2.1 Configure Backend Environment
Create `backend/.env` file with:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/detagenix
JWT_SECRET=your_secure_jwt_secret_key_here
FRONTEND_URL=https://yourdomain.com
```

**For Hostinger MongoDB:**
- If using Hostinger's MongoDB, update MONGO_URI
- Or use MongoDB Atlas (free cloud database): https://www.mongodb.com/cloud/atlas

#### 2.2 Install Backend Dependencies
SSH into your Hostinger server:
```bash
cd backend
npm install --production
```

#### 2.3 Create Admin User
```bash
node createAdmin.js
```
Default credentials: admin@detagenix.com / admin123

#### 2.4 Start Backend
```bash
# For production
npm start

# Or use PM2 (recommended for auto-restart)
npm install -g pm2
pm2 start index.js --name detagenix-backend
pm2 save
pm2 startup
```

### Step 3: Frontend Setup (React App)

#### 3.1 Configure Frontend Environment
Create `frontend/.env.production` file:
```env
REACT_APP_BASE_URL=https://yourdomain.com/api
```
Replace `yourdomain.com` with your actual domain

#### 3.2 Build Frontend on Server
```bash
cd frontend
npm install
npm run build
```

**Important:** If build fails with CSS error on server, try:
```bash
npm install --legacy-peer-deps
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 3.3 Serve Frontend
The `build` folder contains your production React app.

**Option A: Serve with Backend (Recommended)**
Add to `backend/index.js` before `app.listen()`:
```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
```

**Option B: Use Hostinger's Static Site Hosting**
- Point document root to `frontend/build` folder
- Set up reverse proxy for API calls to backend

### Step 4: Configure Hostinger Node.js App

1. **Go to Hostinger Control Panel → Advanced → Node.js**
2. **Create Node.js Application:**
   - Application root: `/path/to/backend`
   - Application URL: Your domain
   - Application startup file: `index.js`
   - Node.js version: 18.x or higher
3. **Set Environment Variables** in Hostinger panel
4. **Start the application**

### Step 5: Database Setup

**Option A: MongoDB Atlas (Recommended - Free)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGO_URI` in backend `.env`
5. Whitelist all IPs (0.0.0.0/0) for Hostinger

**Option B: Local MongoDB on Hostinger**
- Check if Hostinger plan includes MongoDB
- Configure connection in `.env`

### Step 6: SSL Certificate
1. Go to Hostinger Control Panel → SSL
2. Install free SSL certificate
3. Force HTTPS redirect

### Step 7: Test Deployment
1. Visit your domain
2. Check website loads correctly
3. Test admin login: https://yourdomain.com/admin
   - Email: admin@detagenix.com
   - Password: admin123
4. Test creating blog/service/job from admin panel

## 🔒 Security Checklist
- [ ] Change default admin password after first login
- [ ] Update JWT_SECRET in production .env
- [ ] Enable CORS only for your domain
- [ ] Set up MongoDB authentication
- [ ] Configure firewall rules
- [ ] Enable HTTPS (SSL)

## 🐛 Troubleshooting

### Build Fails on Server
```bash
# Increase memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or skip build and use development mode (not recommended)
npm start
```

### Port Already in Use
```bash
# Change PORT in .env to different value
PORT=3001
```

### MongoDB Connection Failed
- Check MONGO_URI format
- Ensure MongoDB service is running
- Verify firewall allows MongoDB port (27017)
- Check MongoDB Atlas IP whitelist

### Backend Not Starting
```bash
# Check logs
pm2 logs detagenix-backend

# Restart
pm2 restart detagenix-backend
```

## 📁 File Structure on Server
```
/home/your-username/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── .env (create this)
│   ├── createAdmin.js
│   ├── src/
│   └── uploads/
└── frontend/
    ├── build/ (after npm run build)
    ├── package.json
    ├── .env.production (create this)
    └── src/
```

## 🔄 Updating Your Site
1. Make changes locally
2. Test locally
3. Rebuild frontend: `npm run build`
4. Upload new files via FTP/File Manager
5. Restart backend: `pm2 restart detagenix-backend`

## 📞 Support
- Hostinger Support: https://www.hostinger.com/contact
- Check Hostinger Knowledge Base for Node.js hosting guides

## 🎉 Your Site URLs After Deployment
- Main Website: https://yourdomain.com
- Admin Panel: https://yourdomain.com/admin
- Backend API: https://yourdomain.com/api

---
**Note:** Replace `yourdomain.com` with your actual Hostinger domain throughout this guide.
