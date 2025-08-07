// import Owner from "../models/owner.js";
// import Store from "../models/store.js";

// export const createOwner = async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log("Request Body:", req.body);
//   try {
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Name, email, and password are required" });
//     }

//     const newOwner = new Owner({ name, email, password });
//     await newOwner.save();
//     res.status(201).json(newOwner);
//   } catch (error) {
//     console.error("Error creating owner:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to create owner", error: error.message });
//   }
// };

// export const getOwners = async (req, res) => {
//   try {
//     const owners = await Owner.find();
//     res.status(200).json(owners);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to get owners" });
//   }
// };

// export const deleteOwner = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedOwner = await Owner.findByIdAndDelete(id);

//     if (!deletedOwner) {
//       return res.status(404).json({ message: "Owner not found" });
//     }

//     res.status(200).json({ message: "Owner deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting owner:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to delete owner", error: error.message });
//   }
// };

// export const updateOwner = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password } = req.body;

//   try {
//     const owner = await Owner.findById(id);

//     if (!owner) {
//       return res.status(404).json({ message: "Owner not found" });
//     }

//     if (name) owner.name = name;
//     if (email) owner.email = email;
//     if (password !== undefined) owner.password = password; 

//     const updatedOwner = await owner.save();

//     res.status(200).json(updatedOwner);
//   } catch (error) {
//     console.error("Error updating owner:", error);
//     res.status(500).json({ message: "Failed to update owner", error: error.message });
//   }
// };

// export const getOwnersByStoreId = async (req, res) => {
//   const { id } = req.params;

//   try {
  
//     const store = await Store.findById(id).populate('owners');

//     if (!store) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     const owners = store.owners;

//     if (owners.length === 0) {
//       return res.status(404).json({ message: "No owners found for this store" });
//     }

//     res.status(200).json(owners);
//   } catch (error) {
//     console.error("Error fetching owners by store ID:", error);
//     res.status(500).json({ message: "Failed to get owners", error: error.message });
//   }
// };

import User from "../models/owner.js";
import Store from "../models/store.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new owner (User with role: "owner")
// export const createOwner = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Name, email, and password are required" });
//     }

//     const newUser = new User({ name, email, password, role: "owner" });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to create owner", error: error.message });
//   }
// };
export const loginOwner = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const owner = await User.findOne({ email });

    if (!owner || owner.role !== 'owner') {
      return res.status(400).json({ message: 'Email is incorrect or user is not an owner' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, owner.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Find stores where the owner is listed
    const stores = await Store.find({ owners: owner._id });

    // Respond with the token and list of stores
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      token,
      user: {
        id: owner._id,
        name: owner.name,
        email: owner.email,
        stores, // List of stores the owner is associated with
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createOwner = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role: 'owner' });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create owner', error: error.message });
  }
};

// Fetch owners (Users with role: "owner")
export const getOwners = async (req, res) => {
  try {
    const owners = await User.find({ role: "owner" });
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Failed to get owners" });
  }
};

// Delete an owner
export const deleteOwner = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOwner = await User.findByIdAndDelete(id);

    if (!deletedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete owner", error: error.message });
  }
};

// Update an owner
export const updateOwner = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const owner = await User.findById(id);

    if (!owner || owner.role !== "owner") {
      return res.status(404).json({ message: "Owner not found" });
    }

    if (name) owner.name = name;
    if (email) owner.email = email;
    if (password !== undefined) owner.password = password;

    const updatedOwner = await owner.save();
    res.status(200).json(updatedOwner);
  } catch (error) {
    res.status(500).json({ message: "Failed to update owner", error: error.message });
  }
};

// Fetch owners by store ID
export const getOwnersByStoreId = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Store.findById(id).populate({
      path: "owners",
      match: { role: "owner" }, // Only fetch users with role "owner"
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const owners = store.owners;
    if (owners.length === 0) {
      return res.status(404).json({ message: "No owners found for this store" });
    }

    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Failed to get owners", error: error.message });
  }
};
