import Employer from "@/models/Employer";
import { connectToDB } from "./utils";
import Employee from "@/models/Employee";

export const fetchEmployers = async () => {
  try {
    connectToDB();
    const employers = await Employer.find().lean();
    return JSON.parse(JSON.stringify(employers));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch employers!");
  }
};

export const fetchEmployerById = async (id: string) => {
  try {
    connectToDB();
    const employer = await Employer.findById(id).lean(); // Find employer by ID
    if (!employer) {
      throw new Error("Employer not found!");
    }
    return JSON.parse(JSON.stringify(employer)); // Convert to plain JavaScript object
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch the employer!");
  }
};

export const fetchEmployees = async () => {
  try {
    connectToDB();
    const employees = await Employee.find().lean();
    return JSON.parse(JSON.stringify(employees));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchEmployeeById = async (id: string) => {
  try {
    await connectToDB(); // Ensure the connection is awaited
    const employee = await Employee.findById(id).lean(); // Find employee by ID

    if (!employee) {
      throw new Error("Employee not found!");
    }

    // Convert the photo Buffer to a base64 string if it exists
    if (employee.photo) {
      employee.photo = employee.photo.toString('base64'); // Convert to base64
    }

    return JSON.parse(JSON.stringify(employee)); // Convert to plain JavaScript object
  } catch (error) {
    console.error("Error fetching employee:", error); // More descriptive logging
    throw new Error("Failed to fetch the employee!");
  }
};
