import express, {Request, Response, NextFunction, Router} from 'express'; 
import { PaymentIniciate } from '../controllers/PaymentController';
import { PaymentStatusUpdate } from '../controllers/PaymentController';
const router = express.Router(); 

router.post('/payment-iniciate', PaymentIniciate); 
router.post('/payment-status-update', PaymentStatusUpdate);


export {router as PaymentRoute}; 
