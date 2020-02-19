const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const supplierSchema = new Schema(
  {
    username: String,
    name: String,
    address: String,
    telephone: Number,
    mobile: Number,
    email: String,
    service: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;
