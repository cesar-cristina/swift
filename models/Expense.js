const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    amount: Number,
    floor: { type: Schema.Types.ObjectId, ref: "Floor" },
    status: { type: String, enum: ["paid", "nopaid"], default: "nopaid" },
    salary: []
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Expense = mongoose.model("Expense", userSchema);
module.exports = Expense;
