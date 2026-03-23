import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import { clerkMiddleware } from '@clerk/express'
import {Webhook} from 'svix'


// Initialize Express
const app = express()


// Connect to database
await connectDB()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())
app.use(express.json());


// Routes

app.get('/', (req, res) =>{
    res.send('API is Working')
})
// app.post('/api/user', (req, res) => {
//     console.log(req.body);
//     res.send("Received");
// })
app.post('/clerk', (req, res) => {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    console.log(whook);
    // console.log(req.body);
    console.log('something happened');
    res.send("clerk hit");
})

// Port
const PORT = process.env.PORT || 5000


console.log('Backend Hit');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

