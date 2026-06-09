# AyurPharma 🌿

An AI-Powered Ayurvedic Healthcare Platform that combines Machine Learning, Large Language Models (LLMs), and modern web technologies to provide intelligent healthcare assistance.

---

## 📌 Features

### 🤖 AI Medical Chatbot
- Built using LangChain, FAISS, FastAPI, and Groq LLM.
- Answers healthcare-related questions using Ayurvedic knowledge.
- Uses Retrieval-Augmented Generation (RAG).

### 🩺 ML Medicine Predictor
- Predicts symptoms from user input.
- Recommends Ayurvedic medicines.
- Provides dosage and precautions.

### 👨‍⚕️ Doctor Management
- Admin can add and manage doctors.
- Doctor profiles include specialization, fees, experience, and availability.

### 📅 Appointment Booking
- Browse doctors.
- Select available slots.
- Book appointments.

### 🔐 Authentication
- Admin Login
- User Registration & Login
- JWT Authentication

### ☁️ Cloud Services
- MongoDB Atlas Database
- Cloudinary Image Storage

---

## 🏗️ System Architecture

Frontend (React)
        ↓
Backend (Node.js + Express)
        ↓
MongoDB Atlas

AI Services:
- FastAPI + LangChain + FAISS + Groq (LLM)
- Flask + Scikit-Learn (ML Model)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT

### AI & ML
- FastAPI
- Flask
- LangChain
- FAISS
- Groq API
- Scikit-Learn
- Pandas
- NumPy

---
In Backend create 
.env file and code is 
MONGODB_URI=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
and also in frontend create 
.env file 
GROQ_API_KEY=
and also in llm services:
.env file code is :
GROQ_API_KEY=
For Admin panel 
.env file code is 
VITE_BACKEND_URL=http://localhost:4000
## 📂 Project Structure

```text
AyurPharma/
│
├── frontend/
├── admin/
├── backend/
├── llm_service/
├── ml_service/
└── README.md
