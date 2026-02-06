# KKBP Backend API

> Version 1.0.0 | Last Updated: February 6, 2026

Backend API server for Kambaa Knowledge Base Portal

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your database credentials:

```bash
cp .env.example .env
```

Update the following in `.env`:

- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username (default: root)
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default: kkbp_db)
- `JWT_SECRET` - Secret key for JWT tokens

### 3. Setup Database

Make sure MySQL is running and create the database:

```sql
CREATE DATABASE kkbp_db;
```

### 4. Seed Database

Run the seed script to create tables and initial data:

```bash
npm run seed
```

This will create:

- Admin user: `admin@kambaa.in` / `admin123`
- Employee users: `john.doe@kambaa.in` / `employee123`
- Sample categories

### 5. Start Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Articles

- `GET /api/articles` - Get all articles (with filters)
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article (employee only)
- `GET /api/articles/my-articles` - Get user's articles
- `PATCH /api/articles/:id/approve` - Approve article (admin only)
- `PATCH /api/articles/:id/reject` - Reject article (admin only)
- `DELETE /api/articles/:id` - Delete article
- `GET /api/articles/stats` - Get article statistics (admin only)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)

## Business Rules

1. **Email Validation**: Only `@kambaa.in` emails are allowed
2. **Article Creation**: Only EMPLOYEE role can create articles (admins cannot)
3. **Article Approval**: Only ADMIN role can approve/reject articles
4. **Default Role**: New registrations get EMPLOYEE role by default

## Technologies

- Node.js / Express
- MySQL with Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing

---

**Built with ❤️ by Kambaa Team**
