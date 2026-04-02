import express from 'express';
import {
  getAllServices,
  addService,
  editService,
  deleteService
  , bookService
} from '../controllers/serviceController.js'; 
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();
router.get('/', getAllServices);


router.post('/', addService);
router.put('/:serviceId',  editService);
router.delete('/:serviceId', deleteService);
router.post('/book', bookService);
export default router;