const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vencimientoSchema = new Schema(
  {
    building: { type: Schema.Types.ObjectId, ref: "Building" },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
    amount: Number,
    expireDate: Date
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Vencimiento = mongoose.model("Vencimientos", vencimientoSchema);
module.exports = Vencimiento;
