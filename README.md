
## 📌 Project Overview
# AI Ticketing System

The **AI Ticketing System** is a full‑stack application that allows users to create support tickets which are enriched by an AI service. It features real‑time updates, file upload integration via the Gemini API, and JWT‑based authentication for secure access. The application is built with an Express/MongoDB backend and a modern Next.js frontend styled with Tailwind CSS.

## Features

- **Ticket Creation & AI Enrichment:**  
  Create support tickets with title and description. The system uses an AI service to enrich ticket details asynchronously.
- **Real‑Time Updates:**  
  Uses Socket.IO to push ticket updates to connected clients in real time.
- **File Uploads:**  
  Supports file uploads via the Gemini API.
- **User Authentication:**  
  Supports user registration and login using JWT and bcrypt.
- **Admin Dashboard:**  
  Visualizes ticket statistics and trends with interactive charts (Chart.js).
- **Responsive UI:**  
  Modern, responsive design built with Next.js and Tailwind CSS.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO
- **Authentication:** JWT, bcrypt
- **Frontend:** Next.js, React, Tailwind CSS, react-chartjs-2
- **File Upload:** Gemini API
- **AI Integration:** Custom AI service for ticket enrichment

## Ticket Management
- **Get Tickets:** GET /api/tickets

- **Create Ticket:** POST /api/tickets

- **Get Ticket by ID:** GET /api/tickets/:id

- **Delete Ticket:** DELETE /api/tickets/:id

- **Upload Attachment:** POST /api/tickets/:id/attachments

- **File Upload Integration (Gemini API):**
The client-side file upload is handled by the GeminiFileUpload component. Files are sent as multipart/form-data to your Gemini API endpoint defined in NEXT_PUBLIC_GEMINI_API.

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/AbhishekAnan00/ai-ticketing-system.git
cd ai-ticketing-system
```

### 2️⃣ Install Dependencies
#### Backend
```sh
cd backend
npm install 
```

#### Frontend
```sh
cd frontend
npm install
```

### 3️⃣ Run the Application
#### Backend
```sh
node server.js 
```

#### Frontend
```sh
npm run dev
```

## ⚠️ Special Note
**Whenever you need to make any changes to the project (including `.vscode` settings or configurations), ALWAYS open this README first!** This file serves as a reference for modifying or adding new components.


