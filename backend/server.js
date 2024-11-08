import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import route from "./routes/route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
}));
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "http://localhost:5004", "http://localhost:5173", "http://localhost:5174"] // Trusted sources for images
        }
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' } // Allow cross-origin resource loading
}));

// app.use('/auth', authRoute)
// app.use('/user', userRoute)
app.use("/api", route);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`The server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
