import express, {Request, Response, NextFunction, Router} from 'express'; 
const { updateProfile } = require("../controllers/ProfileControllers");
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router(); 
 
router.put('/UpdateProfile/:id', updateProfile); 

export {router as ProfileRoute}; 

