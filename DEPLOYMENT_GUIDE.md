# Deployment Guide for Detagenix

## Frontend Build Information

**Build Location:** `c:\Users\Rahul\Desktop\Detagenix\Detagenix-Website-main\frontend\build`

### What's in the Build Folder:
- `index.html` - Main HTML file
- `static/` - Contains optimized JS, CSS, and media files
- `favicon.ico` - Website favicon
- `manifest.json` - PWA manifest file
- `robots.txt` - SEO robots file

### How to Deploy Frontend:

1. **To Local Server:**
   ```bash
   npx serve -s build
   ```

2. **To Hosting Services:**
   - **Netlify:** Drag and drop the `build` folder
   - **Vercel:** Upload the `build` folder
   - **GitHub Pages:** Push the `build` folder to gh-pages branch
   - **AWS S3:** Upload `build` folder contents to S3 bucket
   - **Azure:** Deploy as static web app

### Build Folder Structure:
```
build/
├── index.html
├── favicon.ico
├── manifest.json
├── robots.txt
├── static/
│   ├── js/     (Minified JavaScript)
│   ├── css/    (Optimized CSS)
│   └── media/  (Optimized Images)
└── hero-video.mp4
```

## Backend Deployment

**Backend Location:** `c:\Users\Rahul\Desktop\Detagenix\Detagenix-main\detagenix-backend`

### Environment Variables Needed (.env):
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

### Deploy Backend To:
- **Heroku:** `git push heroku main`
- **Railway:** Connect GitHub repo
- **Render:** Connect GitHub repo
- **AWS EC2:** Copy files and run with Node
- **DigitalOcean:** App Platform

### View Database Records:
```bash
node viewData.js
```

## Testing Before Deployment

1. **Frontend:** `npm start` (Port 3000)
2. **Backend:** `node index.js` (Port 5000)
3. **View DB:** `node viewData.js`

All set for deployment! 🚀
