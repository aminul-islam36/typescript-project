# TypeScript + Tailwind CSS + MongoDB Task Manager

A modern full-stack task management web app with CRUD operations, filtering, and search functionality built with TypeScript, Tailwind CSS, and MongoDB.

## Features

- **Create**: Add new tasks with title, description, and priority
- **Read**: View all tasks in a beautiful UI
- **Update**: Edit task details and change status (Pending, In Progress, Completed)
- **Delete**: Remove tasks with confirmation
- **Filter**: Filter tasks by status
- **Search**: Search tasks by title or description
- **Responsive Design**: Works on all screen sizes
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas

## Pages

- **Home**: Dashboard with task statistics and quick actions
- **Tasks**: Full task management with CRUD operations
- **About Us**: Company information
- **Single Task**: Detailed task view with edit functionality

## Setup

```bash
npm install
```

## Development

Start the backend server:

```bash
npm run server
```

In another terminal, start the frontend:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Tech Stack

- TypeScript
- Tailwind CSS
- Vite
- MongoDB Atlas
- Express.js
- Node.js

## Database

The app connects to MongoDB Atlas with 5 pre-seeded demo tasks. The database is automatically seeded when the server starts.
