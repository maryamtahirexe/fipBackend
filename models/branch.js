import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  store: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true }] 
});

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;