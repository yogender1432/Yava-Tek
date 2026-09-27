const mongoose = require("mongoose");
const Employee = require("./models/employee.model");
const employees = require("./data/employees");

require("dotenv").config();

async function seedEmployees() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Employee.deleteMany({});

    await Employee.insertMany(employees);

    console.log("Employee IDs saved successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

seedEmployees();