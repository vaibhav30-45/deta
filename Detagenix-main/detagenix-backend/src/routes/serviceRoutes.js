import express from 'express';
import {
  getAllServices,
  addService,
  editService,
  deleteService,
  bookService,
} from '../controllers/serviceController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/', getAllServices);

router.post('/', verifyToken, addService);
router.put('/:serviceId', verifyToken, editService);
router.delete('/:serviceId', verifyToken, deleteService);
router.post('/book', bookService);
export default router;