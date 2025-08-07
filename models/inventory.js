import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
