const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    type: { type: String, required: true },
    price: { type: Number, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
