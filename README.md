# Todo Experiment

A full-stack todo management application built with AdonisJS (backend) and React (frontend). Supports creating, editing, deleting, and tracking tasks with different statuses.

## Tech Stack

- **Backend**: AdonisJS 6, TypeScript, MySQL, Lucid ORM
- **Frontend**: React 19, TypeScript, Redux Toolkit, Tailwind CSS, Vite

## Prerequisites

- Node.js (v22.21.1)
- Docker (for MySQL database)

## Installation
Clone the repository:
```bash
git clone https://github.com/Meynisa/todo-experiment.git
```

### Backend

```bash
cd backend
npm install
```

Copy the environment file and adjust values as needed:

```bash
cp .env.example .env
```

Start the MySQL database:

```bash
docker-compose up -d
```

Run database migrations:

```bash
node ace migration:run
```

Start the development server:

```bash
npm run dev
```

The backend runs on `http://localhost:3333`.

### Frontend

```bash
cd frontend
npm install
```

Copy the environment file:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Folder Structure

```
todo-experiment/
├── backend/
│   ├── app/
│   │   ├── controllers/       # HTTP request handlers
│   │   ├── models/            # Lucid ORM models
│   │   ├── services/          # Business logic
│   │   ├── validators/        # Request validation (Vine)
│   │   ├── enums/             # Status enums
│   │   ├── exceptions/        # Error handling
│   │   ├── middleware/        # Custom middleware
│   │   └── requests/          # Request type definitions
│   ├── config/                # App, database, CORS config
│   ├── database/migrations/   # Database migration files
│   ├── start/                 # Routes, kernel, env setup
│   ├── tests/                 # Unit tests
│   └── docker-compose.yml     # MySQL container
│
└── frontend/
    └── src/
        ├── components/        # Reusable UI components
        ├── pages/             # Page-level components
        ├── services/          # API client (Axios)
        ├── store/             # Redux store, slices, hooks
        ├── hooks/             # Custom React hooks
        └── utils/             # Types and helpers
```

## API Endpoints

All routes are prefixed with `/api/v1`.

| Method   | Endpoint         | Description         |
|----------|------------------|---------------------|
| `GET`    | `/todos`         | List todos (paginated) |
| `GET`    | `/todos/:id`     | Get a single todo   |
| `POST`   | `/todos`         | Create a new todo   |
| `PUT`    | `/todos/:id`     | Update a todo       |
| `DELETE` | `/todos/:id`     | Delete a todo       |
