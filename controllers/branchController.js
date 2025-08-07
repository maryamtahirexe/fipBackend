// import Store from "../models/store.js";
// import Branch from "../models/branch.js"; 

// export const createBranch = async (req, res) => {
//     const { storeId } = req.params;
//     const { name, location } = req.body;
  
//     try {
//       const store = await Store.findById(storeId);
//       if (!store) {
//         return res.status(404).json({ message: "Store not found" });
//       }

//       const newBranch = new Branch({ name, location, store: storeId });
//       await newBranch.save();

//       store.branches.push(newBranch._id);
//       await store.save();
  
//       res.status(201).json(newBranch);
//     } catch (error) {
//       console.error("Error creating branch:", error);
//       res.status(500).json({ message: "Error creating branch", error: error.message });
//     }
//   };
// // Update a branch
// export const updateBranch = async (req, res) => {
//     const { storeId, branchId } = req.params;
//     const { name, location } = req.body;
  
//     try {
//       const store = await Store.findById(storeId);
//       if (!store) {
//         return res.status(404).json({ message: "Store not found" });
//       }
  
//       const branch = await Branch.findById(branchId);
//       if (!branch) {
//         return res.status(404).json({ message: "Branch not found" });
//       }
  
//       if (!store.branches.includes(branchId)) {
//         return res.status(400).json({ message: "Branch does not belong to this store" });
//       }

//       branch.name = name;
//       branch.location = location;
//       await branch.save();
  
//       res.status(200).json(branch);
//     } catch (error) {
//       console.error("Error updating branch:", error);
//       res.status(500).json({ message: "Error updating branch", error: error.message });
//     }
//   };

// // Delete a branch
// export const deleteBranch = async (req, res) => {
//     const { storeId, branchId } = req.params;
  
//     try {
//       const store = await Store.findById(storeId);
//       if (!store) {
//         return res.status(404).json({ message: "Store not found" });
//       }
  
//       const branch = await Branch.findById(branchId);
//       if (!branch) {
//         return res.status(404).json({ message: "Branch not found" });
//       }

//       if (!store.branches.includes(branchId)) {
//         return res.status(400).json({ message: "Branch does not belong to this store" });
//       }

//       store.branches = store.branches.filter(id => id.toString() !== branchId);
//       await store.save();
  
//       await Branch.findByIdAndDelete(branchId);
  
//       res.status(200).json({ message: "Branch deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting branch:", error);
//       res.status(500).json({ message: "Error deleting branch", error: error.message });
//     }
//   };

// // Get a branch by ID
// export const getBranchById = async (req, res) => {
//     const { storeId, branchId } = req.params;
  
//     try {
//       const store = await Store.findById(storeId);
//       if (!store) {
//         return res.status(404).json({ message: "Store not found" });
//       }
 
//       const branch = await Branch.findById(branchId);
//       if (!branch) {
//         return res.status(404).json({ message: "Branch not found" });
//       }
  
//       if (!store.branches.includes(branchId)) {
//         return res.status(400).json({ message: "Branch does not belong to this store" });
//       }
  
//       res.status(200).json(branch);
//     } catch (error) {
//       console.error("Error retrieving branch:", error);
//       res.status(500).json({ message: "Error retrieving branch", error: error.message });
//     }
//   };

// // Get all branches of a store
// export const getAllBranchesByStoreId = async (req, res) => {
//   const { storeId } = req.params;

//   try {
//     const store = await Store.findById(storeId);
//     if (!store) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     res.status(200).json(store.branches);
//   } catch (error) {
//     console.error("Error retrieving branches:", error);
//     res.status(500).json({ message: "Error retrieving branches", error: error.message });
//   }
// };


import Store from "../models/store.js";
import Branch from "../models/branch.js"; 
import mongoose from "mongoose";

export const createBranch = async (req, res) => {
    const { storeId, name, location } = req.body;
  
    try {
      const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }

      const newBranch = new Branch({ name, location, store: storeId });
      await newBranch.save();

      store.branches.push(newBranch._id);
      await store.save();
  
      res.status(201).json(newBranch);
    } catch (error) {
      console.error("Error creating branch:", error);
      res.status(500).json({ message: "Error creating branch", error: error.message });
    }
  };
  // export const updateBranch = async (req, res) => {
  //   const { id } = req.params;
  //   const { name, location } = req.body;
  
  //   try {
  //     const branch = await Branch.findById(id);
  //     if (!branch) {
  //       return res.status(404).json({ message: 'Branch not found' });
  //     }
  
  //     branch.name = name || branch.name;
  //     branch.location = location || branch.location;
  //     await branch.save();
  
  //     res.status(200).json(branch);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error updating branch', error });
  //   }
  // };
  
  export const updateBranch = async (req, res) => {
    const { branchId } = req.params;
    console.log("Received branchId:", branchId);
  
    if (!mongoose.Types.ObjectId.isValid(branchId)) {
      return res.status(400).json({ message: "Invalid branchId format" });
    }
  
    const { storeId, name, location } = req.body;
  
    try {
      const updatedBranch = await Branch.findByIdAndUpdate(
        branchId,
        { name, location, store: storeId },
        { new: true }
      );
  
      if (!updatedBranch) {
        return res.status(404).json({ message: "Branch not found" });
      }
  
      res.status(200).json(updatedBranch);
    } catch (error) {
      console.error("Error updating branch:", error);
      res.status(500).json({ message: "Error updating branch", error: error.message });
    }
  };
  //perfect hai but testing k liye change kr rahi
// export const updateBranch = async (req, res) => {
//   const { storeId, name, location } = req.body;
//   const { branchId } = req.params;

//   try {
//       const store = await Store.findById(storeId);
//       if (!store) {
//           return res.status(404).json({ message: "Store not found" });
//       }

      
//       let branch = await Branch.findById(branchId);
//       console.log("check1 branch?", branch);
      
//       if (branch) {
//           if (!store.branches.includes(branchId)) {
//               return res.status(400).json({ message: "Branch does not belong to this store" });
//           }

//           branch.name = name;
//           branch.location = location;
//           await branch.save(); 

//           return res.status(200).json(branch);
//       } else {
//           branch = await Store.findById(branchId);
//           console.log("branch?", branch);
//           if (branch) {
//               return res.status(400).json({ message: "ID refers to a store, not a branch. You can update the store if you want." });
//           }

//           return res.status(404).json({ message: "Branch not found?" });
//       }
//   } catch (error) {
//       console.error("Error updating branch:", error);
//       res.status(500).json({ message: "Error updating branch", error: error.message });
//   }
// };



// export const deleteBranch = async (req, res) => {
//     const { storeId } = req.body;
//     const { branchId } = req.params;

//     console.log(branchId)

  
//     try {
//       const store = await Store.findById(storeId);
//       if (!store) {
//         return res.status(404).json({ message: "Store not found" });
//       }
//       console.log("Store is", store);
      
  
//       const branch = await Branch.findById(branchId) || Store.findById(branchId);
//       console.log("branch is", branch);

//       if (!branch) {
//         return res.status(404).json({ message: "Branch not found" });
//       }

//       if (!store.branches.includes(branchId)) {
//         return res.status(400).json({ message: "Branch does not belong to this store" });
//       }

//       store.branches = store.branches.filter(id => id.toString() !== branchId);
//       await store.save();
  
//       await Branch.findByIdAndDelete(branchId);
  
//       res.status(200).json({ message: "Branch deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting branch:", error);
//       res.status(500).json({ message: "Error deleting branch", error: error.message });
//     }
//   };

export const deleteBranch = async (req, res) => {
  const { branchId } = req.params;

  try {

    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    await Branch.findByIdAndDelete(branchId);

    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ message: "Error deleting branch", error: error.message });
  }
};

export const getBranchById = async (req, res) => {
  const { branchId } = req.params;
  console.log('Received branchId:', branchId);
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    return res.status(400).json({ message: "Invalid branch ID format" });
  }
  try {
    const branch = await Branch.findById(branchId);

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    res.status(200).json(branch);
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({ message: "Error fetching branch", error: error.message });
  }
};

export const getAllBranchesByStoreId = async (req, res) => {
  const { storeId } = req.body;

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store.branches);
  } catch (error) {
    console.error("Error retrieving branches:", error);
    res.status(500).json({ message: "Error retrieving branches", error: error.message });
  }
};

export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error retrieving branches:", error);
    res.status(500).json({ message: "Error retrieving branches", error: error.message });
  }
};



// Updated version
// export const updateBranch = async (req, res) => {
//   const { storeId, name, location } = req.body;
//   const { branchId } = req.params;

//   try {
//     const store = await Store.findById(storeId);
//     if (!store) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     const branch = await Branch.findById(branchId);
//     if (branch) {
//       if (!store.branches.includes(branchId)) {
//         return res.status(400).json({ message: "Branch does not belong to this store" });
//       }

//       branch.name = name;
//       branch.location = location;
//       await branch.save();

//       return res.status(200).json(branch);
//     } else {
//       return res.status(404).json({ message: "Branch not found" });
//     }
//   } catch (error) {
//     console.error("Error updating branch:", error);
//     res.status(500).json({ message: "Error updating branch", error: error.message });
//   }
// };


// Updated deleteBranch
// export const deleteBranch = async (req, res) => {
//   const { storeId } = req.body;
//   const { branchId } = req.params;

//   try {
//     const store = await Store.findById(storeId);
//     if (!store) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     const branch = await Branch.findById(branchId);
//     if (!branch) {
//       return res.status(404).json({ message: "Branch not found" });
//     }

//     if (!store.branches.includes(branchId)) {
//       return res.status(400).json({ message: "Branch does not belong to this store" });
//     }

//     store.branches = store.branches.filter(id => id.toString() !== branchId);
//     await store.save();
//     await Branch.findByIdAndDelete(branchId);

//     res.status(200).json({ message: "Branch deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting branch:", error);
//     res.status(500).json({ message: "Error deleting branch", error: error.message });
//   }
// };

