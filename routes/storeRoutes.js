import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createStore,
  updateStore,
  getStoreById,
  getAllStores,
  deleteStore,
  getStoresWithOwners,
  createBranch
} from '../controllers/storeController.js';

const router = express.Router();
router.post('/:storeId/branches', createBranch);
router.get('/with-owners', getStoresWithOwners);
router.post('/stores', auth, createStore);
router.patch('/:id', auth, updateStore);
router.get('/:id', getStoreById);
router.get('/', getAllStores);
router.delete('/:id', auth, deleteStore);


export default router;

