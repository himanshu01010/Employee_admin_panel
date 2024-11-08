import express from "express";
import authRoute from "./authRoute.js"
import employeeRoute from "./employeeRoute.js"

const route = express.Router()

route.use('/auth',authRoute);
route.use('/employee',employeeRoute);

export default route;