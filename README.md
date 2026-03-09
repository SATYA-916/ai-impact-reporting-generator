# AI Catalog Builder

An intelligent full-stack application that calculates sustainability impact for eco-friendly purchases and generates AI-powered impact reports using Google Gemini.

## Prerequisites
- Node.js (v20+ recommended)
- npm

## Installation
Install the required dependencies:
```bash
npm install
```

## Environment Variables Setup
The application requires two environment variables to run:

1. **GEMINI_API_KEY** - Your Google Gemini API key
2. **MONGO_URI** - Your MongoDB connection URI

Set these in Replit's Secrets tab:
- Go to Secrets (lock icon) in your Replit project
- Add `GEMINI_API_KEY` with your API key value
- Add `MONGO_URI` with your MongoDB connection string

The application will fail to start if these environment variables are not set.

## Running the Application
To start both the backend server and the frontend development server simultaneously:
```bash
npm run dev
```

The application will be available at your local preview port.

## Building for Production
To build the application for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Features
- **Product Catalog**: Browse curated eco-friendly products with impact metrics
- **Impact Calculator**: Calculate plastic saved and carbon avoided based on quantity
- **AI-Powered Reports**: Generate human-readable sustainability impact statements using Gemini
- **MongoDB Storage**: Product data persistence with MongoDB
