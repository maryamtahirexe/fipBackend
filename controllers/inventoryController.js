import Inventory from "../models/inventory.js";

export const createInventory = async (req, res) => {
  const { name, description  } = req.body;

  try {
    const newInventory = new Inventory({ name, description });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ message: "Error creating inventory", error: error.message });
  }
};

export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, description } = req.body;

  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { name, quantity, description },
      { new: true }
    );

    if (!updatedInventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Error updating inventory", error: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({ message: "Error deleting inventory", error: error.message });
  }
};

export const getInventoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const inventory = await Inventory.findById(id);

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error retrieving inventory:", error);
    res.status(500).json({ message: "Error retrieving inventory", error: error.message });
  }
};

export const getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.status(200).json(inventories);
  } catch (error) {
    console.error("Error retrieving inventories:", error);
    res.status(500).json({ message: "Error retrieving inventories", error: error.message });
  }
};




