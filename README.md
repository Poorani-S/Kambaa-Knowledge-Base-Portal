# KKBP - Kambaa Knowledge Base Portal

> Version 1.0.0 | Last Updated: February 2026

A modern, interactive knowledge base portal for internal team collaboration with unique animations and a professional design system.

## Features

- 🎨 **Unique Design** - Custom color palette (1C4D8D, 4988C4, BDE8F5) with engaging animations
- 🔐 **Secure Authentication** - @kambaa.in email domain validation
- 📝 **Article Management** - Create, submit, and manage knowledge base articles
- ✅ **Approval Workflow** - Admin-only article approval system
- 🏢 **Role-Based Access** - Different permissions for Admins and Employees
- 🔍 **Smart Search** - Filter and search articles by category, tags, and keywords
- 📊 **Admin Dashboard** - Comprehensive overview and approval management
- 🎭 **Rich Animations** - Smooth transitions, hover effects, and micro-interactions

## Project Structure

```
KKBP/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components (Card, Button, Navbar)
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   └── utils/         # Utilities (API client)
│   └── public/
├── backend/           # Node.js/Express API server
│   ├── controllers/   # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Auth middleware
│   └── config/        # Configuration files
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### 1. Setup Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE kkbp_db;
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Configure `.env` file (already created with defaults):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kkbp_db
JWT_SECRET=kambaa_kb_portal_secret_key_2026
```

Seed the database:

```bash
npm run seed
```

Start backend server:

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

Backend runs on: http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: http://localhost:3000

### Quick Start Scripts (Windows)

- `start-backend.bat` - Start backend server
- `start-frontend.bat` - Start frontend app

## Default Test Accounts

After seeding the database:

**Admin Account:**

- Email: `admin@kambaa.in`
- Password: `admin123`
- Can approve/reject articles, cannot create articles

**Employee Account:**

- Email: `john.doe@kambaa.in`
- Password: `employee123`
- Can create and submit articles

## Key Business Rules

1. **Email Domain**: Only `@kambaa.in` emails are allowed for registration
2. **Article Creation**: Only EMPLOYEE role can create/submit articles
3. **Article Approval**: Only ADMIN role can approve or reject articles
4. **Admins Cannot Write**: Admins have approval-only access, not article creation
5. **Article States**: DRAFT, PENDING, APPROVED, REJECTED

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Articles

- `GET /api/articles` - List articles (with filters)
- `GET /api/articles/:id` - Get article details
- `POST /api/articles` - Create article (employee only)
- `GET /api/articles/my-articles` - Get user's articles
- `PATCH /api/articles/:id/approve` - Approve (admin only)
- `PATCH /api/articles/:id/reject` - Reject (admin only)
- `DELETE /api/articles/:id` - Delete article
- `GET /api/articles/stats` - Get statistics (admin only)

### Categories

- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (admin only)

## Technology Stack

### Frontend

- React 18.2.0
- React Router DOM 6.22.0
- Framer Motion 11.0.0 (animations)
- Axios 1.6.0
- Lucide React (icons)
- React Toastify (notifications)

### Backend

- Node.js / Express
- MySQL with Sequelize ORM
- JWT Authentication
- bcryptjs (password hashing)

## Color Palette

- Primary Dark: `#1C4D8D`
- Primary Medium: `#4988C4`
- Primary Light: `#BDE8F5`

## Development

### Frontend Development

```bash
cd frontend
npm start
```

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Database Reset

```bash
cd backend
npm run seed  # This will reset and reseed the database
```

## License

ISC

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ by Kambaa Team**
