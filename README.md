# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



<!-- Current Tech Stack Used in the Project
Your Task Manager PWA is built using the following technologies:

Frontend (React PWA)
React.js (TypeScript) – Component-based UI for task management.
React Router – For navigation between pages.
CSS Modules – For styling (AddTask.css, Home.css, etc.).
Service Workers – To enable offline support (PWA functionality).
IndexedDB / Cache API (Planned) – For caching data and offline mode.
Backend (Node.js & Express)
Node.js & Express.js – Backend server handling API requests.
MySQL – Relational database for storing tasks and user data.
jsonwebtoken (JWT) – For authentication and protected routes.
bcrypt – Password hashing for user security.
CORS Middleware – Handling cross-origin requests.
PWA Features
Manifest.json – Defines the app as an installable Progressive Web App.
Service Worker – Caching static assets for offline use.
Background Sync (Planned) – For syncing tasks when reconnected.
Project Progress: What’s Done & Pending?
✅ Completed Features
User Authentication (Login/Register)

Uses JWT for secure authentication.
Stores login tokens in localStorage.
Task Management

Create, Read, Update, Delete (CRUD) tasks.
Task status (Pending, In Progress, Completed).
Task list displayed on the home page.
MySQL Database Integration

User authentication & task storage.
Proper database queries in task.js and user.js.
Basic PWA Setup

Service Worker (serviceWorker.ts added).
Manifest.json for installability.
Works as a Progressive Web App (PWA) but offline mode is not fully functional yet.
🔧 Pending Features & Fixes
Service Worker Fix

Issue: The app does not fully work offline yet.
Fix Needed: Ensure API responses and data are cached properly.
Background Sync for Tasks (Optional)

Store task changes offline and sync when online.
UI Improvements

Better button styling and task list UI.
Improve dropdown for status selection.
Deployment

Deploy on Vercel, Netlify, or Firebase.
Test on mobile devices as a PWA app.
Project Description
Task Manager PWA is a Progressive Web App that allows users to manage their tasks efficiently with full CRUD (Create, Read, Update, Delete) functionality. Users can register, log in, add tasks, edit tasks, mark them as completed, and delete them. The application uses a MySQL database for data storage and is built with a React frontend and Node.js backend.

The PWA functionality aims to allow users to access their tasks even when offline, using Service Workers to cache essential resources. This makes it a lightweight, installable task management application for personal productivity. -->
