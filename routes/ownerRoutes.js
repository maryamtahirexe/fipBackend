import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createOwner,
  getOwners,
  deleteOwner,
  updateOwner,
  getOwnersByStoreId,
  loginOwner
} from '../controllers/ownerController.js';

const router = express.Router();

router.post('/', createOwner);
router.get('/', getOwners);
router.delete('/:id', auth, deleteOwner);
router.patch('/:id', auth, updateOwner);
router.get('/:id', getOwnersByStoreId);
router.post('/login', loginOwner);
export default router;
