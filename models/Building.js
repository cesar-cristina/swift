const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buildingSchema = new Schema(
  {
    address: String,
    year: String,
    floors: [{ type: Schema.Types.ObjectId, ref: "Floor" }],
    expenses: [
      {
        month: Date,
        light: Number,
        gas: Number,
        water: Number
      }
    ],
    placesOfInterest: [],
    startDate: Date
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Building = mongoose.model("Building", buildingSchema);
module.exports = Building;
