import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import Employee from "./dist/app/models/employee.js"; // Adjusted path
import Employer from "./dist/app/models/employer.js"; // Adjusted path

// Manually create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect("mongodb://localhost:27017/bambuApp");

const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/data/employees.json`, "utf-8"),
);

const employers = JSON.parse(
  fs.readFileSync(`${__dirname}/data/employers.json`, "utf-8"),
);

const importData = async () => {
  try {
    await Employee.create(employees);
    await Employer.create(employers);
    console.log("Data imported successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete
const deleteData = async () => {
  try {
    await Employee.deleteMany();
    await Employer.deleteMany();
    console.log("Data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
