 Project-V Task MAnager Project Setup Guide
This document explains how to set up and run the monorepo project containing both frontend and backend services.

Prerequisites

- Node.js installed (recommended LTS version) - npm installed - Git installed

Root Setup (Recommended)

From the root of the project directory, run the following command to install all dependencies:

npm install

After installation is complete, start both frontend and backend together using:

npm run dev

This will launch both services concurrently.

Alternative Setup (Individual Services)

You can also run each service independently if needed:

Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev
