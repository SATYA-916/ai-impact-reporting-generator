# Clean Slate AI

Clean Slate AI is an application providing sustainability impact reports on various eco-friendly products.

## Prerequisites

- Node.js (v20 or higher recommended)
- npm (Node Package Manager)

## Setup Instructions

1. **Install dependencies:**
   Navigate to the project root directory and run:
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   A `.env` file should be present in the root directory containing the database and API keys:
   ```env
   GEMINI_API_KEY=AIzaSyCbXWHJpYn2OYfk9mCM83_pRUQ3EkKfLKA
   MONGO_URI=mongodb+srv://zywu801:Satya123@cluster0.t47bcbv.mongodb.net/ai_catalog?retryWrites=true&w=majority
   ```

## Running the Application

### Development Mode

To start the application in development mode with hot reloading:
```bash
npm run dev
```
The server will start, and the application will be accessible via your browser (typically `http://localhost:5000` or the port shown in the console).

### Production Mode

To build and run the application for production:
1. **Build the application:**
   ```bash
   npm run build
   ```
2. **Start the server:**
   ```bash
   npm start
   ```

## Tech Stack
- **Frontend & Routing:** React, Wouter, Radix UI, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (via Mongoose)
- **AI Integration:** Google Gemini API
- **Build Tool:** Vite
