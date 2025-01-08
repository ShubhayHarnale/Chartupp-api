import express from "express";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://charupp-front-end.onrender.com",
    "http://localhost:5173",  // Add your local frontend URL
    "http://localhost:3000"   // Add any other development URLs you might use
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"]
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

// Health check route
app.get("/", (req, res) => {
  res.send("ChartUpp API is running");
});

// Port configuration
const port = process.env.PORT || 10000;
console.log('Starting server...');
console.log('PORT env variable:', process.env.PORT);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log('Server is bound to 0.0.0.0');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not Set');
}).on('error', (err) => {
  console.error('Server error:', err);
});
