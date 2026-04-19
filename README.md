# Blogopia

A full-stack blog application where users can create, read, update, and delete posts. Built with Node.js, Express, and EJS — backed by a PostgreSQL database so data persists across server restarts.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white)

---

## Features

- Create, read, update, and delete blog posts
- Posts stored in PostgreSQL — data survives server restarts
- Responsive UI built with Bootstrap 5 and custom CSS

---

## Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Runtime    | Node.js                  |
| Framework  | Express.js               |
| Templating | EJS                      |
| Database   | PostgreSQL               |
| DB Client  | node-postgres (`pg`)     |
| Styling    | Bootstrap 5 + Custom CSS |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) installed and running

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NitinMoturu72/Blog-Web-Application.git
cd blogopia
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Open `psql` and run:

```sql
CREATE DATABASE blogpost;
\c blogpost

CREATE TABLE posts (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```
DBUSER=postgres
DBHOST=localhost
DATABASE=yourt_DB_name
DBPASSWORD=your_password
DBPORT=5432
```

### 5. Start the server

```bash
node index.js
```

Visit **http://localhost:3000**

---

## Project Structure

```
├── public/
│   └── styles/
│       └── main.css        # Custom styles
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs           # Home page — post list
│   ├── blog.ejs            # Single post view
│   ├── create.ejs          # Create / edit form
│   ├── about.ejs
│   └── FAQ.ejs
├── index.js                # Express server & routes
├── .env                    # Environment variables (not committed)
├── .gitignore
└── README.md
```

---

## API Routes

| Method | Route         | Description        |
|--------|---------------|--------------------|
| GET    | `/`           | List all posts     |
| GET    | `/createPost` | Show create form   |
| POST   | `/post`       | Create a new post  |
| POST   | `/viewPost`   | View a single post |
| POST   | `/editPost`   | Show edit form     |
| POST   | `/update`     | Update a post      |
| POST   | `/deletePost` | Delete a post      |

---

## Author

**Nitin Moturu**
- [GitHub](https://github.com/NitinMoturu72)
- [LinkedIn](https://www.linkedin.com/in/nitin-moturu-299295205/)
