import express from "express";
import {
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryById,
  getAllInventories
} from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/", createInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);
router.get("/:id", getInventoryById);
router.get("/", getAllInventories);

export default router;