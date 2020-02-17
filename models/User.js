const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    telephone: Number,
    mobile: Number,
    email: String,
    role: { type: String, enum: ["owner", "tenant"] },
    floor: { type: Schema.Types.ObjectId, ref: "Floor" },
    imgName: String,
    imgPath: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
