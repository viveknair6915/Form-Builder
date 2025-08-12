# Form Builder - MERN Stack Application

A comprehensive form builder application built with the **MERN stack** featuring three interactive question types, modern UI with **Tailwind CSS**, and complete backend API functionality.

##  Features

###  Question Types
1. **Categorize Questions** - Drag and drop items into correct categories
2. **Cloze Questions** - Fill-in-the-blank with interactive word selection
3. **📖 Comprehension Questions** - Reading passages with multiple choice answers

### Technical Features
- ✅ **MERN Stack**: MongoDB, Express.js, HTML/CSS/JavaScript, Node.js
- ✅ **Modern UI**: Tailwind CSS with responsive design
- ✅ **Interactive Elements**: Drag & drop, dynamic forms, real-time preview
- ✅ **RESTful API**: Complete backend with MongoDB integration
- ✅ **Form Management**: Create, save, and retrieve forms
- ✅ **Response Collection**: Submit and store form responses
- ✅ **Image Support**: Upload images for questions and forms

## Project Structure

```
Form-Builder/
├── frontend/              # Frontend application
│   ├── complete.html     # Full-featured form builder
│   ├── working.html      # Alternative version
│   └── index.html        # Landing page
├── server/               # Express.js backend
│   ├── models/          # MongoDB schemas
│   │   ├── Form.js      # Form data model
│   │   └── Response.js  # Response data model
│   ├── routes/          # API endpoints
│   │   ├── forms.js     # Form CRUD operations
│   │   └── responses.js # Response handling
│   ├── index.js         # Server entry point
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables
├── package.json         # Root package.json
└── README.md           # This file
```

## Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/viveknair6915/Form-Builder.git
   cd Form-Builder
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your MongoDB connection string
   MONGODB_URI=mongodb://127.0.0.1:27017/formbuilder
   PORT=5000
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud connection
   ```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
cd server
node index.js
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npx http-server -p 8080
# Frontend runs on http://localhost:8080
```

### 🌐 Access the Application
- **Form Builder**: http://localhost:8080/complete.html
- **Alternative Version**: http://localhost:8080/working.html
- **Backend API**: http://localhost:5000
## Usage Guide

### Creating Forms
1. Open http://localhost:8080/complete.html
2. **Add Form Details**: Title, description, and optional header image
3. **Add Questions**: Choose from three question types:
   - **Categorize**: Create categories and draggable items
   - **Cloze**: Write text with blanks for fill-in-the-blank
   - **Comprehension**: Add passages with multiple choice questions
4. **Preview**: Test your form before saving
5. **Save**: Store your form in the database

### Question Types Details

#### Categorize Questions
- Create multiple categories
- Add items that can be dragged into categories
- Visual feedback for correct/incorrect placement
- Perfect for sorting exercises

#### Cloze Questions  
- Write sentences with missing words
- Provide options for fill-in-the-blank
- Drag and drop or click to select answers
- Great for language learning and comprehension

#### Comprehension Questions
- Add reading passages or images
- Create multiple choice questions
- Support for rich text formatting
- Ideal for reading comprehension tests

## API Documentation

### Forms API
```http
GET    /api/forms           # Get all forms
POST   /api/forms           # Create new form
GET    /api/forms/:id       # Get specific form
PUT    /api/forms/:id       # Update form
DELETE /api/forms/:id       # Delete form
```

### Responses API
```http
GET    /api/responses                 # Get all responses
POST   /api/responses                 # Submit form response
GET    /api/responses/form/:formId    # Get responses for specific form
```

### Example API Usage
```bash
# Create a new form
curl -X POST http://localhost:5000/api/forms \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Quiz",
    "description": "A sample quiz form",
    "questions": [
      {
        "type": "comprehension",
        "title": "Reading Question",
        "passage": "Sample passage text...",
        "questions": [
          {
            "question": "What is the main idea?",
            "options": ["A", "B", "C", "D"],
            "correctAnswer": 0
          }
        ]
      }
    ]
  }'

# Submit a response
curl -X POST http://localhost:5000/api/responses \
  -H "Content-Type: application/json" \
  -d '{
    "formId": "form_id_here",
    "responses": {
      "question_1": "answer_value"
    }
  }'
```

## Development

### Project Structure Deep Dive
```
server/
├── models/
│   ├── Form.js          # Form schema (title, questions, metadata)
│   └── Response.js      # Response schema (formId, answers, timestamp)
├── routes/
│   ├── forms.js         # CRUD operations for forms
│   └── responses.js     # Handle form submissions and retrieval
├── index.js             # Express server setup with CORS and MongoDB
├── package.json         # Dependencies: express, mongoose, cors, dotenv
└── .env                 # Environment variables

frontend/
├── complete.html        # Full-featured form builder with Tailwind CSS
├── working.html         # Alternative version with inline styles
└── index.html           # Landing page
```

### Local Development Setup
```bash
# 1. Start MongoDB (if local)
mongod

# 2. Start backend with auto-reload
cd server
npm install
node index.js

# 3. Start frontend server
cd ../frontend
npx http-server -p 8080

# 4. Access application
# Frontend: http://localhost:8080/complete.html
# Backend: http://localhost:5000
```

### Environment Variables
```env
# server/.env
MONGODB_URI=mongodb://127.0.0.1:27017/formbuilder
PORT=5000
NODE_ENV=development
```

## Deployment

### Backend Deployment (Railway/Render/Heroku)
1. **Prepare for deployment**:
   ```bash
   cd server
   npm install --production
   ```

2. **Set environment variables**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/formbuilder
   PORT=5000
   NODE_ENV=production
   ```

3. **Deploy** using your preferred platform

### Frontend Deployment (Netlify/Vercel)
1. **Build and deploy**:
   ```bash
   # Upload frontend folder to hosting service
   # No build step needed - static HTML files
   ```

2. **Update API URLs** in frontend files to point to deployed backend

### Full-Stack Deployment
- **Recommended**: Use Railway, Render, or similar services that can host both frontend and backend
- **Database**: MongoDB Atlas for production database
- **Static Files**: Serve frontend through Express.js static middleware

## 🔍 Testing

### Manual Testing Checklist
- [ ] Create form with all three question types
- [ ] Test drag and drop functionality
- [ ] Verify form saving to database
- [ ] Test form response submission
- [ ] Check responsive design on mobile
- [ ] Validate API endpoints with Postman

### API Testing with Postman
Import these endpoints:
- GET http://localhost:5000/api/forms
- POST http://localhost:5000/api/forms
- POST http://localhost:5000/api/responses

## Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

## License

This project is licensed under the **ISC License**.

## Author

**Vivek Nair** - [@viveknair6915](https://github.com/viveknair6915)

---

### Ready to build amazing forms?

This MERN stack form builder provides everything you need to create interactive, engaging forms with three unique question types. The modern interface built with Tailwind CSS ensures a great user experience across all devices.

**Happy Form Building!** 