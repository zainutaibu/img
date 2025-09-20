import 'dotenv/config';          // Load environment variables
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import connectDB from './configs/mongodb.js';

const PORT = process.env.PORT || 4000;
const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(express.json());
app.use(cors({
  origin: ["https://img-seven-chi.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"], // optional, restrict HTTP methods
  credentials: true // optional, allow cookies if needed
}));

// ----------------------
// Routes
// ----------------------
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Test route
app.get('/', (req, res) => res.send("API Working"));

// ----------------------
// Start server
// ----------------------
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Debug Razorpay & Stripe keys
    const requiredVars = [
      'RAZORPAY_KEY_ID', 
      'RAZORPAY_KEY_SECRET', 
      'STRIPE_SECRET_KEY'
    ];
    requiredVars.forEach(v => {
      if (!process.env[v]) console.warn(`❌ Missing env variable: ${v}`);
      else console.log(`✅ Env variable ${v} present`);
    });

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
