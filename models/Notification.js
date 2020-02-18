const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    building: { type: Schema.Types.ObjectId, ref: "Building" },
    subject: String,
    message: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Expense = mongoose.model("Notifications", notificationSchema);
module.exports = Expense;
