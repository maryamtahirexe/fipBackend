// import mongoose from "mongoose";

// const storeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Owner" }],
//   location: { type: String, required: true },
// });

// const Store = mongoose.model("Store", storeSchema);
// export default Store;

//Correct one for the user model
// import mongoose from "mongoose";

// const storeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   location: { type: String, required: true },
// });

// const Store = mongoose.model("Store", storeSchema);
// export default Store;

//correct one with branches and inventories
import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
  inventories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inventory" }],
});

const Store = mongoose.model("Store", storeSchema);
export default Store;

//one without branches model
// import mongoose from "mongoose";

// const storeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }], // Array of store IDs
//   inventories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inventory" }],
// });

// const Store = mongoose.model("Store", storeSchema);
// export default Store;




