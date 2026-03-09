# AI Catalog Builder

## Prerequisites
- Node.js (v20+ recommended)
- npm

## Installation
Install the required dependencies:
```bash
npm install
```

## Running the Application
To start both the backend server and the frontend development server simultaneously:
```bash
npm run dev
```

The application will be available at your local preview port.

## Environment Variables
The application uses the following API keys by default (configured in the code):
- **MongoDB URI**: `mongodb+srv://zywu801:Satya123@cluster0.t47bcbv.mongodb.net/ai_catalog?retryWrites=true&w=majority`
- **Gemini API Key**: `AIzaSyCbXWHJpYn2OYfk9mCM83_pRUQ3EkKfLKA`

You can override these by setting `MONGO_URI` and `GEMINI_API_KEY` in your environment variables.

## Building for Production
To build the application for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```
