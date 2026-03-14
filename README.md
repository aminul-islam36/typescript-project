# TypeScript + React + Tailwind CSS Task Manager

A modern task management web app built with React, TypeScript, and Tailwind CSS featuring CRUD operations, filtering, and search functionality.

## Features

- **Create**: Add new tasks with title, description, and priority
- **Read**: View all tasks in a beautiful UI
- **Update**: Edit task details and change status (Pending, In Progress, Completed)
- **Delete**: Remove tasks with confirmation
- **Filter**: Filter tasks by status
- **Search**: Search tasks by title or description
- **Responsive Design**: Works on all screen sizes
- **Persistent Storage**: Data saved in browser localStorage
- **5 Demo Tasks**: Pre-loaded with sample data

## Pages

- **Home**: Dashboard with task statistics and quick actions
- **Tasks**: Full task management with CRUD operations
- **About Us**: Company information
- **Single Task**: Detailed task view with edit functionality

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Vite
- LocalStorage API

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── taskApi.ts          # API layer for task operations
├── components/
│   └── Header.tsx          # Navigation header component
├── pages/
│   ├── HomePage.tsx        # Dashboard page
│   ├── TasksPage.tsx       # Task list and creation
│   ├── SingleTaskPage.tsx  # Task detail and edit
│   └── AboutPage.tsx       # About page
├── types.ts                # TypeScript interfaces
├── App.tsx                 # Main app component
├── main.tsx                # App entry point
└── style.css               # Tailwind CSS imports
```

## Features in Detail

### CRUD Operations

- Create tasks with title, description, and priority levels
- Read all tasks or individual task details
- Update task information and status
- Delete tasks with confirmation

### Filtering & Search

- Filter tasks by status (All, Pending, In Progress, Completed)
- Search tasks by title or description
- Real-time filtering and search results

### Data Persistence

- All data stored in browser localStorage
- Automatic seeding with 5 demo tasks on first load
- Data persists across browser sessions
