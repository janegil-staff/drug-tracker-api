const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    type: { type: String, required: true },
    amount: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
