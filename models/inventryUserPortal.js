import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  products: [{
    name: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    afterTaxPrice: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
