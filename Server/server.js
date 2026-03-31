import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import { clerkMiddleware } from '@clerk/express'
import educatorRouter from './routes/educatorRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'
import { stripeWebhooks } from './controllers/stripeWebhooks.js'
import adminRouter from './routes/AdminRoute.js'

// Initialize Express
const app = express()

// Connect to database
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())

// Routes

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)
app.get('/', (req, res) =>{
    res.send('API is Working')
})


app.post('/clerk', express.raw({type: 'application/json'}), clerkWebhooks)
app.use('/api/educator',express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.use('/api/admin', express.json(), adminRouter)
// app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks )

// Port
const PORT = process.env.PORT || 5000

console.log('Backend Hit');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

