import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import adminRouter from './routes/adminRoute.js'
import modelRouter from './routes/modelRoute.js'
import userRouter from './routes/userRoute.js'
import appointmentRouter from './routes/appointmentRoute.js'

// ✅ CREATE APP FIRST
const app = express()
const port = process.env.PORT || 4000

// ✅ CONNECT DATABASE
connectDB()
connectCloudinary()

// ✅ MIDDLEWARE (VERY IMPORTANT ORDER)
app.use(cors())
app.use(express.json()) // parses JSON
app.use(express.urlencoded({ extended: true })) // 🔥 ADD THIS

// ✅ DEBUG (TEMPORARY - REMOVE LATER)
app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

// ✅ ROUTES
app.use('/api/admin', adminRouter)
app.use('/api/model', modelRouter)
app.use('/api/user', userRouter)
app.use('/api/appointment', appointmentRouter)

// ✅ TEST ROUTE
app.get('/', (req, res) => {
  res.send('API Working 🚀')
})

// ✅ START SERVER
app.listen(port, () => console.log("Server started on port", port))