const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: false },
    entries: [{ type: mongoose.Types.ObjectId, required: false, ref: "Entry" }],
    posts: [{ type: mongoose.Types.ObjectId, required: false, ref: "Post" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
