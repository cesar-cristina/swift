const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const employeeSchema = new Schema(
  {
    
    username: String,
    password: String,
    name: String,
    lastname: String,
    building: { type: Schema.Types.ObjectId, ref: 'Building' },
    salary: [
      {
        month: Date,
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

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
