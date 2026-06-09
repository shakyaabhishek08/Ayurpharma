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
For Installation
git clone https://github.com/yourusername/AyurPharma.git
cd AyurPharma
for backend "cd backend
npm install
npm run dev
for Frontend
cd frontend
npm install
npm run dev
for admin
cd admin
npm install
npm run dev
