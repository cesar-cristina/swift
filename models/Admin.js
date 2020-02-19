const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const adminSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    telephone: Number,
    mobile: Number,
    email: String,
    role: { type: String, enum: ["boss", "expenses", "maitenance"] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
