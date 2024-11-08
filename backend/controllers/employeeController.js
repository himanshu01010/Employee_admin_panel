// controllers/employeeController.js
import { Employee } from "../models/employeeModel.js";

// Create a new employee
export const createEmployee = async (req, res) => {
    try {
        const { name, email, mobileNo, designation, gender, courses } = req.body;
        let imagePath = null;

        // Set image path if an image file is uploaded
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const newEmployee = new Employee({
            name,
            email,
            mobileNo,
            designation,
            gender,
            courses,
            image: imagePath,
        });

        await newEmployee.save();
        res.status(201).json({
            message: "Employee created successfully",
            success: true,
            data: newEmployee,
        });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobileNo, designation, gender, courses } = req.body;
        const updateData = {
            name,
            email,
            mobileNo,
            designation,
            gender,
            courses,
        };

        // Handle image update if a new image is uploaded
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        // Find the employee by ID and update their details
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({
                message: "Employee not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            success: true,
            data: updatedEmployee,
        });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        // Find all employees and select only the required fields
        const employees = await Employee.find({}, "name email mobileNo designation gender courses image createdAt");

        if (!employees.length) {
            return res.status(404).json({
                message: "No employees found",
                success: false,
            });
        }

        // Map the response to include the necessary fields
        const responseData = employees.map(employee => ({
            uniqueId: employee._id, // MongoDB automatically creates _id as unique Id
            image: employee.image,
            name: employee.name,
            email: employee.email,
            mobileNo: employee.mobileNo,
            designation: employee.designation,
            gender: employee.gender,
            courses: employee.courses,
            createdDate: employee.createdAt,
        }));

        res.status(200).json({
            message: "Employees fetched successfully",
            success: true,
            data: responseData,
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
      const { id } = req.params; // Extract employee ID from the URL parameters
  
      // Find the employee by their unique ID
      const employee = await Employee.findById(id, "name email mobileNo designation gender courses image createdAt");
  
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
          success: false,
        });
      }
  
      const responseData = {
        uniqueId: employee._id,
        image: employee.image,
        name: employee.name,
        email: employee.email,
        mobileNo: employee.mobileNo,
        designation: employee.designation,
        gender: employee.gender,
        courses: employee.courses,
        createdDate: employee.createdAt,
      };
  
      res.status(200).json({
        message: "Employee fetched successfully",
        success: true,
        data: responseData,
      });
    } catch (error) {
      console.error("Error fetching employee:", error);
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };

  export const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params; // Extract the employee ID from the URL parameters
  
      // Check if the employee exists
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({
          message: "Employee not found",
          success: false,
        });
      }
  
      // Delete the employee
      await Employee.findByIdAndDelete(id);
  
      res.status(200).json({
        message: "Employee deleted successfully",
        success: true,
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };

  export const getTotalEmployees = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        res.status(200).json({
            message: "Total employees fetched successfully",
            success: true,
            data: { totalEmployees },
        });
    } catch (error) {
        console.error("Error fetching total employees:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};