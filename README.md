# Kambaa Knowledge Base Portal

Enterprise-grade internal knowledge management system with AI-powered search and admin dashboard.

## Features

- 📚 **Knowledge Base Management** - Create, organize, and search articles
- 🤖 **AI-Powered Search** - Intelligent chatbot for finding solutions
- 👥 **User Management** - Role-based access (Admin/Employee)
- 📊 **Admin Dashboard** - Comprehensive analytics and management
- ✅ **Approval Workflow** - Article review and approval system
- 🏷️ **Categories & Tags** - Organized content structure
- 📱 **Responsive Design** - Modern, mobile-friendly UI

## Tech Stack

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- RESTful API

**Frontend:**
- React 18
- React Router v6
- Framer Motion
- Lucide Icons

## Quick Start (Development)

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure environment
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env

# Start MongoDB
mongod

# Seed database (optional)
cd backend && node seed.js

# Start backend (Terminal 1)
cd backend && npm run dev

# Start frontend (Terminal 2)
cd frontend && npm start
```

Access: [http://localhost:3000](http://localhost:3000)

## Default Credentials

**Admin:**
- Email: admin@kambaa.in
- Password: admin123

**Employee:**
- Email: john.doe@kambaa.in
- Password: employee123

⚠️ **Change passwords in production!**

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive production deployment instructions.

Quick production build:

```bash
# Build frontend
cd frontend && npm run build

# Start backend with PM2
pm2 start ecosystem.config.js
```

## Project Structure

```
Kambaa-Knowledge-Base-Portal/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable components
│       ├── context/     # Auth context
│       ├── pages/       # Page components
│       └── utils/       # API utilities
├── ecosystem.config.js  # PM2 configuration
└── DEPLOYMENT.md        # Deployment guide
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Articles
- `GET /api/articles` - List articles
- `GET /api/articles/:id` - Get article details
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Admin
- `GET /api/admin/pending-articles` - Pending approvals
- `PUT /api/admin/articles/:id/approve` - Approve article
- `PUT /api/admin/articles/:id/reject` - Reject article
- `GET /api/admin/users` - List users
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Dashboard statistics

### Categories & Tags
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `GET /api/categories/:id/tags` - Get tags by category

### Chatbot
- `POST /api/chatbot/search` - AI search query
- `GET /api/chatbot/stats` - Search statistics

## Environment Variables

**Backend** (`backend/.env`):

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://127.0.0.1:27017/kkbp
JWT_SECRET=your_secure_secret_here
JWT_EXPIRE=7d
```

**Frontend** (`frontend/.env`):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## License

Proprietary - Kambaa Internal Use Only

## Support

For deployment assistance, contact your system administrator.
