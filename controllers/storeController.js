// // import Store from "../models/store.js";
// // import Owner from "../models/owner.js";
// // import mongoose from "mongoose";

// // export const createStore = async (req, res) => {
// //   const { name, location, owners } = req.body;

// //   console.log("Request Body:", req.body);

// //   const areValidObjectIds = owners.every((ownerId) =>
// //     mongoose.Types.ObjectId.isValid(ownerId)
// //   );

// //   if (!areValidObjectIds) {
// //     return res
// //       .status(400)
// //       .json({ message: "One or more owner IDs are invalid" });
// //   }

// //   try {
// //     const ownersFound = await Owner.find({ _id: { $in: owners } });

// //     if (ownersFound.length !== owners.length) {
// //       return res.status(400).json({ message: "One or more owners not found" });
// //     }

// //     const newStore = new Store({ name, location, owners });
// //     await newStore.save();

// //     res.status(201).json(newStore);
// //   } catch (error) {
// //     console.log("Error in createStore function:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Error creating store", error: error.message || error });
// //   }
// // };

// // export const updateStore = async (req, res) => {
// //   const { id } = req.params;
// //   console.log("Store ID:", id);
// //   const { name, location, ownerIds } = req.body;

// //   try {
// //     if (!Array.isArray(ownerIds)) {
// //       return res.status(400).json({ message: "Invalid ownerIds format" });
// //     }

// //     const owners = await Owner.find({ _id: { $in: ownerIds } });

// //     if (owners.length !== ownerIds.length) {
// //       return res.status(400).json({ message: "One or more owners not found" });
// //     }

// //     const updatedStore = await Store.findByIdAndUpdate(
// //       id,
// //       { name, location, owners: ownerIds },
// //       { new: true }
// //     );

// //     if (!updatedStore) {
// //       return res.status(404).json({ message: "Store not found" });
// //     }

// //     res.status(200).json(updatedStore);
// //   } catch (error) {
// //     console.error("Error updating store:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Error updating store", error: error.message });
// //   }
// // };

// // export const getStoreById = async (req, res) => {
// //   const { id } = req.params;

// //   try {
// //     const store = await Store.findById(id).populate("owners", "name email");

// //     if (!store) {
// //       return res.status(404).json({ message: "Store not found" });
// //     }

// //     res.status(200).json(store);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error retrieving store", error });
// //   }
// // };

// // export const getAllStores = async (req, res) => {
// //   try {
// //     const stores = await Store.find().populate("owners", "name email");
// //     res.status(200).json(stores);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error retrieving stores", error });
// //   }
// // };

// // export const deleteStore = async (req, res) => {
// //   const { id } = req.params;

// //   try {
// //     const deletedStore = await Store.findByIdAndDelete(id);

// //     if (!deletedStore) {
// //       return res.status(404).json({ message: "Store not found" });
// //     }

// //     res.status(200).json({ message: "Store deleted successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error deleting store", error });
// //   }
// // };

// // export const getStoresWithOwners = async (req, res) => {
// //   try {
// //     console.log("Fetching stores with owners");

// //     const stores = await Store.find().populate("owners");

// //     if (!stores) {
// //       return res.status(404).json({ message: "No stores found" });
// //     }

// //     const response = stores.map((store) => ({
// //       id: store._id,
// //       storeName: store.name,
// //       storeLocation: store.location,
// //       owners: store.owners.map((owner) => ({
// //         id: owner._id,
// //         name: owner.name,
// //         email: owner.email,
// //       })),
// //     }));

// //     res.status(200).json({ stores: response });
// //   } catch (error) {
// //     console.error("Error fetching stores with owners:", error);
// //     res.status(500).json({
// //       message: "Failed to fetch stores and owners",
// //       error: error.message,
// //     });
// //   }
// // };

// import Store from "../models/store.js";
// import User from "../models/owner.js";
// import mongoose from "mongoose";

// // Create a new store
// export const createStore = async (req, res) => {
//   const { name, location, owners } = req.body;

//   console.log("Request Body:", req.body);

//   // Validate owner IDs
//   const areValidObjectIds = owners.every((ownerId) =>
//     mongoose.Types.ObjectId.isValid(ownerId)
//   );

//   if (!areValidObjectIds) {
//     return res.status(400).json({ message: "One or more owner IDs are invalid" });
//   }

//   try {
//     // Check if all owners exist and have the "owner" role
//     const ownersFound = await User.find({ _id: { $in: owners }, role: "owner" });

//     if (ownersFound.length !== owners.length) {
//       return res.status(400).json({ message: "One or more owners not found" });
//     }

//     // Create the new store
//     const newStore = new Store({ name, location, owners });
//     await newStore.save();

//     res.status(201).json(newStore);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating store", error: error.message });
//   }
// };

// // Get all stores
// export const getStores = async (req, res) => {
//   try {
//     const stores = await Store.find().populate({
//       path: "owners",
//       select: "name email", // Select fields to return
//     });

//     res.status(200).json(stores);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving stores", error: error.message });
//   }
// };

// // Get a store by ID
// export const getStoreById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const store = await Store.findById(id).populate({
//       path: "owners",
//       select: "name email", // Select fields to return
//     });

//     if (!store) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     res.status(200).json(store);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving store", error: error.message });
//   }
// };

// // Update a store
// export const updateStore = async (req, res) => {
//   const { id } = req.params;
//   const { name, location, ownerIds } = req.body;

//   // Validate owner IDs
//   const areValidObjectIds = ownerIds.every((ownerId) =>
//     mongoose.Types.ObjectId.isValid(ownerId)
//   );

//   if (!areValidObjectIds) {
//     return res.status(400).json({ message: "One or more owner IDs are invalid" });
//   }

//   try {
//     // Check if all owners exist and have the "owner" role
//     const ownersFound = await User.find({ _id: { $in: ownerIds }, role: "owner" });

//     if (ownersFound.length !== ownerIds.length) {
//       return res.status(400).json({ message: "One or more owners not found" });
//     }

//     // Update the store
//     const updatedStore = await Store.findByIdAndUpdate(
//       id,
//       { name, location, owners: ownerIds },
//       { new: true }
//     ).populate({
//       path: "owners",
//       select: "name email", // Select fields to return
//     });

//     if (!updatedStore) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     res.status(200).json(updatedStore);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating store", error: error.message });
//   }
// };

// // Delete a store
// export const deleteStore = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedStore = await Store.findByIdAndDelete(id);

//     if (!deletedStore) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     res.status(200).json({ message: "Store deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting store", error: error.message });
//   }
// };

// // Get owners by store ID
// export const getOwnersByStoreId = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const store = await Store.findById(id).populate({
//       path: "owners",
//       match: { role: "owner" }, // Only fetch users with role "owner"
//       select: "name email", // Select fields to return
//     });

//     if (!store) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     if (store.owners.length === 0) {
//       return res.status(404).json({ message: "No owners found for this store" });
//     }

//     res.status(200).json(store.owners);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving owners", error: error.message });
//   }
// };





// correct one with user model

// import Store from "../models/store.js";
// import User from "../models/owner.js"; // Updated to use the User model
// import mongoose from "mongoose";

// // Create a new store
// export const createStore = async (req, res) => {
//   const { name, location, owners } = req.body;

//   console.log("Request Body:", req.body);

//   // Validate owner IDs
//   const areValidObjectIds = owners.every((ownerId) =>
//     mongoose.Types.ObjectId.isValid(ownerId)
//   );

//   if (!areValidObjectIds) {
//     return res
//       .status(400)
//       .json({ message: "One or more owner IDs are invalid" });
//   }

//   try {
//     // Check if all owners exist and have the "owner" role
//     const ownersFound = await User.find({ _id: { $in: owners }, role: "owner" });

//     if (ownersFound.length !== owners.length) {
//       return res.status(400).json({ message: "One or more owners not found" });
//     }

//     // Create the new store
//     const newStore = new Store({ name, location, owners });
//     await newStore.save();

//     res.status(201).json(newStore);
//   } catch (error) {
//     console.log("Error in createStore function:", error);
//     res
//       .status(500)
//       .json({ message: "Error creating store", error: error.message || error });
//   }
// };

// // Update a store
// export const updateStore = async (req, res) => {
//   const { id } = req.params;
//   console.log("Store ID:", id);
//   const { name, location, ownerIds } = req.body;

//   try {
//     if (!Array.isArray(ownerIds)) {
//       return res.status(400).json({ message: "Invalid ownerIds format" });
//     }

//     // Check if all owners exist and have the "owner" role
//     const owners = await User.find({ _id: { $in: ownerIds }, role: "owner" });

//     if (owners.length !== ownerIds.length) {
//       return res.status(400).json({ message: "One or more owners not found" });
//     }

//     // Update the store
//     const updatedStore = await Store.findByIdAndUpdate(
//       id,
//       { name, location, owners: ownerIds },
//       { new: true }
//     );

//     if (!updatedStore) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     res.status(200).json(updatedStore);
//   } catch (error) {
//     console.error("Error updating store:", error);
//     res
//       .status(500)
//       .json({ message: "Error updating store", error: error.message });
//   }
// };

// // Get a store by ID
// export const getStoreById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const store = await Store.findById(id).populate("owners", "name email");

//     if (!store) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     res.status(200).json(store);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving store", error });
//   }
// };

// // Get all stores
// export const getAllStores = async (req, res) => {
//   try {
//     const stores = await Store.find().populate("owners", "name email");
//     res.status(200).json(stores);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving stores", error });
//   }
// };

// // Delete a store
// export const deleteStore = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedStore = await Store.findByIdAndDelete(id);

//     if (!deletedStore) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     res.status(200).json({ message: "Store deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting store", error });
//   }
// };

// // Get stores with owners
// export const getStoresWithOwners = async (req, res) => {
//   try {
//     console.log("Fetching stores with owners");

//     const stores = await Store.find().populate("owners");

//     if (!stores) {
//       return res.status(404).json({ message: "No stores found" });
//     }

//     const response = stores.map((store) => ({
//       id: store._id,
//       storeName: store.name,
//       storeLocation: store.location,
//       owners: store.owners.map((owner) => ({
//         id: owner._id,
//         name: owner.name,
//         email: owner.email,
//       })),
//     }));

//     res.status(200).json({ stores: response });
//   } catch (error) {
//     console.error("Error fetching stores with owners:", error);
//     res.status(500).json({
//       message: "Failed to fetch stores and owners",
//       error: error.message,
//     });
//   }
// };





//correct one with branches and inventories
import Store from "../models/store.js";
import User from "../models/owner.js"; // Updated to use the User model
import Inventory from "../models/inventory.js";
import Branch from "../models/branch.js";
import mongoose from "mongoose";

// Create a new store
export const createStore = async (req, res) => {
  const { name, location, owners, branches=[], inventoryIds=[] } = req.body;

  console.log("Request Body:", req.body);
  console.log("Branches:", branches);
  console.log("Inventory IDs:", inventoryIds);

  console.log("Request Body:", req.body);

  // Validate owner IDs
  const areValidObjectIds = owners.every((ownerId) =>
    mongoose.Types.ObjectId.isValid(ownerId)
  );

  if (!areValidObjectIds) {
    return res
      .status(400)
      .json({ message: "One or more owner IDs are invalid" });
  }

  try {
    // Check if all owners exist and have the "owner" role
    const ownersFound = await User.find({ _id: { $in: owners }, role: "owner" });

    if (ownersFound.length !== owners.length) {
      return res.status(400).json({ message: "One or more owners not found" });
    }

    if (!Array.isArray(branches)) {
      return res.status(400).json({ message: "Branches must be an array" });
    }
    
    // Validate inventory IDs
    if(inventoryIds.length>0){
      const inventories = await Inventory.find({ _id: { $in: inventoryIds } });
      if (inventories.length !== inventoryIds.length) {
        return res.status(400).json({ message: "One or more inventories not found" });
      }
    }
    if (branches.length > 0) {
      const branchesFound = await Branch.find({ _id: { $in: branches } });
      if (branchesFound.length !== branches.length) {
        return res.status(400).json({ message: "One or more branch IDs not found" });
      }
    }

    // Create the new store with branches and inventories
    const newStore = new Store({
      name,
      location,
      owners,
      branches,
      inventories:req.body.inventories,
    });
    await newStore.save();

    res.status(201).json(newStore);
  } catch (error) {
    console.log("Error in createStore function:", error);
    res
      .status(500)
      .json({ message: "Error creating store", error: error.message || error });
  }
};

export const updateStore = async (req, res) => {
  const { id } = req.params;
  const { name, location, ownerIds, branches=[], inventoryIds } = req.body;

  console.log(req.body);

  try {
    if (!Array.isArray(ownerIds)) {
      return res.status(400).json({ message: "Invalid ownerIds format" });
    }

    // Check if all owners exist and have the "owner" role
    const owners = await User.find({ _id: { $in: ownerIds }, role: "owner" });

    if (owners.length !== ownerIds.length) {
      return res.status(400).json({ message: "One or more owners not found" });
    }

    // Validate inventory IDs
    const inventories = await Inventory.find({ _id: { $in: inventoryIds } });
    if (inventories.length !== inventoryIds.length) {
      return res.status(400).json({ message: "One or more inventories not found" });
    }

    // Update the store
    const updatedStore = await Store.findByIdAndUpdate(
      id,
      { name, location, owners: ownerIds, branches, inventories: inventoryIds },
      { new: true }
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(updatedStore);
  } catch (error) {
    console.error("Error updating store:", error);
    res
      .status(500)
      .json({ message: "Error updating store", error: error.message });
  }
};

// Get a store by ID
export const getStoreById = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Store.findById(id).populate("owners", "name email");

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving store", error });
  }
};

// Get all stores
export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("owners", "name email");
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stores", error });
  }
};

// Delete a store
export const deleteStore = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting store", error });
  }
};

// Get stores with owners
export const getStoresWithOwners = async (req, res) => {
  try {
    console.log("Fetching stores with owners, branches, and inventories");

    const stores = await Store.find()
      .populate("owners", "name email")
      .populate("branches", "name location")  // Assuming branches have `name` and `location`
      .populate("inventories", "name quantity"); // Assuming inventories have `itemName` and `quantity`

    if (!stores) {
      return res.status(404).json({ message: "No stores found" });
    }

    const response = stores.map((store) => ({
      id: store._id,
      storeName: store.name,
      storeLocation: store.location,
      owners: store.owners.map((owner) => ({
        id: owner._id,
        name: owner.name,
        email: owner.email,
      })),
      branches: store.branches.map((branch) => ({
        id: branch._id,
        name: branch.name,
        location: branch.location,
      })),
      inventories: store.inventories.map((inventory) => ({
        id: inventory._id,
        name: inventory.name,
        quantity: inventory.quantity,
      })),
    }));

    res.status(200).json({ stores: response });
  } catch (error) {
    console.error("Error fetching stores with owners, branches, and inventories:", error);
    res.status(500).json({
      message: "Failed to fetch stores and their associated data",
      error: error.message,
    });
  }
};

// export const createBranch = async (req, res) => {
//   const {name, location, storeIds } = req.body;
// console.log("heheheh",storeIds)
//   console.log("lalalal",req.body);
//   try {
//     // Check if the store exists
//     const store = await Store.findById(storeId);
//     console.log("hello");
//     if (!store) {
//       return res.status(404).json({ message: 'Store not found' });
//     }

//     // Create the branch
//     const newBranch = await Branch.create({ name, location, store: storeId });
//     console.log("hello2");
//     // Add the branch to the store
//     store.branches.push(newBranch._id);
//     await store.save();

//     res.status(201).json(newBranch);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating branch', error });
//   }
// };
export const createBranch = async (req, res) => {
  const { name, location, storeIds } = req.body;

  console.log("heheheh", storeIds);
  console.log("lalalal", req.body);

  try {
    if (!storeIds || storeIds.length === 0) {
      return res.status(400).json({ message: 'Store ID is required' });
    }

    // Use the first store ID from the array
    const storeId = storeIds[0];

    // Check if the store exists
    const store = await Store.findById(storeId);
    console.log("hello");
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Create the branch
    const newBranch = await Branch.create({ name, location, store: storeId });
    console.log("hello2");

    // Add the branch to the store
    store.branches.push(newBranch._id);
    await store.save();

    res.status(201).json(newBranch);
  } catch (error) {
    res.status(500).json({ message: 'Error creating branch', error });
  }
};
// export const getStoresWithOwners = async (req, res) => {
//   try {
//     console.log("Fetching stores with owners");

//     const stores = await Store.find().populate("owners");

//     if (!stores) {
//       return res.status(404).json({ message: "No stores found" });
//     }

//     const response = stores.map((store) => ({
//       id: store._id,
//       storeName: store.name,
//       storeLocation: store.location,
//       owners: store.owners.map((owner) => ({
//         id: owner._id,
//         name: owner.name,
//         email: owner.email,
//       })),
//     }));

//     res.status(200).json({ stores: response });
//   } catch (error) {
//     console.error("Error fetching stores with owners:", error);
//     res.status(500).json({
//       message: "Failed to fetch stores and owners",
//       error: error.message,
//     });
//   }
// };


