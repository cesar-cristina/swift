const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    telephone: Number,
    mobile: Number,
    email: String,
    role: { type: String, enum: ["user", "admin", "employee"] },
    type: {
      type: String,
      enum: ["boss", "expenses", "maitenance", "owner", "tenant"]
    },
    floor: { type: Schema.Types.ObjectId, ref: "Floor" },
    imgName: String,
    imgPath: String,
    building: { type: Schema.Types.ObjectId, ref: "Building" },
    salary: [
      {
        month: Number,
        year: Number,
        amount: Number
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
