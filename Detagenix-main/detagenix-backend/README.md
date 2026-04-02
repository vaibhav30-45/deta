# Detagenix Backend API

Backend API for Detagenix website and admin panel.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (File uploads)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/detagenix
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
```

3. Start MongoDB locally

4. Create admin user:
```bash
node createAdmin.js
```

5. Run development server:
```bash
npm run dev
```

Server runs on: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Submit application
- `DELETE /api/applications/:id` - Delete application

### Contact
- `GET /api/contact` - Get all contacts
- `POST /api/contact` - Submit contact form
- `DELETE /api/contact/:id` - Delete contact

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

## Deployment

See [RENDER-DEPLOYMENT.md](./RENDER-DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy automatically

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/detagenix
JWT_SECRET=secure_random_string_32_chars_minimum
FRONTEND_URL=https://your-frontend-domain.com
```

## Admin Credentials (Default)

- Email: admin@detagenix.com
- Password: Atarsen101@

**⚠️ Change password if needed in production!**

## Project Structure

```
detagenix-backend/
├── src/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Auth & file upload
│   ├── models/            # Mongoose models
│   └── routes/            # API routes
├── uploads/               # Uploaded files
├── index.js              # Entry point
├── createAdmin.js        # Admin creation script
└── package.json
```

## License

ISC
