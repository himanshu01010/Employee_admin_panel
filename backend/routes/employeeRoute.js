import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid"; 
import { createEmployee,updateEmployee,getAllEmployees,getEmployeeById,deleteEmployee, getTotalEmployees} from "../controllers/employeeController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// Configure multer for image upload with UUID-based filenames
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads"); // Set the destination folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueSuffix); // Use UUID for unique file names
    },
});

const upload = multer({ storage });

// Route to create a new employee
router.post("/create", authenticateToken,upload.single("image"), createEmployee);
router.put("/update/:id", authenticateToken,upload.single("image"), updateEmployee);
router.get("/getallemployees", authenticateToken, getAllEmployees);
router.get("/getemployees/:id", authenticateToken,getEmployeeById);
router.delete("/deleteEmployees/:id", authenticateToken,deleteEmployee);
router.get("/getTotalEmployees",authenticateToken,getTotalEmployees);


export default router;
