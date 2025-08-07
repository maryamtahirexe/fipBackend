// import express from "express";
// import {
//   createBranch,
//   updateBranch,
//   deleteBranch,
//   getBranchById,
//   getAllBranchesByStoreId
// } from "../controllers/branchController.js";

// const router = express.Router();

// router.post('/stores/:storeId/branches', createBranch);
// router.put("/stores/:storeId/branches/:branchId", updateBranch);
// router.delete("/stores/:storeId/branches/:branchId", deleteBranch);
// router.get("/stores/:storeId/branches/:branchId", getBranchById);
// router.get("/stores/:storeId/branches", getAllBranchesByStoreId);

// export default router;
import express from "express";
import {
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchById,
  getAllBranchesByStoreId,
  getAllBranches
} from "../controllers/branchController.js";

const router = express.Router();

router.get('/branch', getAllBranches);
router.get("/:branchId", getBranchById);
router.post('/create-branch', createBranch);
router.patch("/:branchId", updateBranch); 
router.delete("/:branchId", deleteBranch);
router.get("/", getAllBranchesByStoreId);


export default router;