// models/Employee.js
import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
    },
    mobileNo: {
        type: String,
        required: [true, "Please enter a mobile number"],
    },
    designation: {
        type: String,
        enum: ["HR", "Manager", "Sales"],
        required: [true, "Please select a designation"],
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please select a gender"],
    },
    courses: {
        type: [String],
        enum: ["MCA", "BCA", "BSC"],
        default: [],
    },
    image: {
        type: String, // Stores the path or URL to the image
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Employee = mongoose.model("Employee", EmployeeSchema);
