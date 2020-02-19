const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const floorSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    tenant: { type: Schema.Types.ObjectId, ref: "User" },
    building: { type: Schema.Types.ObjectId, ref: "Building" },
    size: Number,
    name: String,
    expense: [
      {
        month: Date,
        amount: Number,
        paid: { type: Boolean, default: false }
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

const Floor = mongoose.model('Floor', floorSchema);
module.exports = Floor;
