import express from "express";
import { login, signup, logout } from "../controllers/authController.js";
import upload from "../middleware/multerConfig.js";
// import uploadProfileImage from "../middleware/uploadProfileImage.js";
// import { sendOTPMail } from "../controllers/sendEmail.js";

const router = express.Router()

router.post('/signup', upload.none(), signup);
router.post('/login',upload.none(),login);
router.post("/logout", logout);
// router.post('/forgotpassword',upload.none(),sendOTPMail);

export default router;