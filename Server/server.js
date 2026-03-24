import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import { clerkMiddleware } from '@clerk/express'
import User from './models/User.js'
import educatorRouter from './routes/educatorRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'
import { stripeWebhooks } from './controllers/stripeWebhooks.js'


// Initialize Express
const app = express()


// Connect to database
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())
// app.use(express.json());


// Routes

app.get('/', (req, res) =>{
    res.send('API is Working')
})
app.post('/api/user',express.json(), async (req, res) => {
    // console.log(req.body);
    const user = User.findById(req.body.clerkId);

    if(user){
        return res.send("ok");
    }
    else{
    const userData = {
            _id: req.body.clerkId,
            email: req.body.email,
            name: req.body.name,
            imageUrl: req.body.imageUrl, 
        }
    await User.create(userData)
    }
    res.send("Received");  
})
app.use('/api/educator',express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks )
// Port
const PORT = process.env.PORT || 5000


console.log('Backend Hit');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

