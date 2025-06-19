import express from "express";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js"
import { addDoctor,allDoctors,loginAdmin, appointmentsAdmin, cancelAppointment,adminDashboard } from "../controllers/adminController.js";
import { ChangeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,ChangeAvailability);
adminRouter.get('/appointments',authAdmin,appointmentsAdmin);
adminRouter.post('/cancel-appointment',authAdmin,cancelAppointment);
adminRouter.get('/admin-dashboard',authAdmin,adminDashboard);


export default adminRouter;