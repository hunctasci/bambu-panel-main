// @ts-nocheck

"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./utils";
import Employer from "@/models/Employer";
import { redirect } from "next/navigation";
import Employee from "@/models/Employee";
import { signIn } from "@/auth";
import { signOut } from "@/auth";
import { AuthError } from "next-auth";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const addEmployer = async (formData: FormData) => {
  try {
    // Connect to the database
    connectToDB();

    // Extract and process form data
    const data = Object.fromEntries(formData);

    // Create a new employer document with the provided form data
    const newEmployer = new Employer({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate as string),
      address: data.address,
      phoneNumber: data.phoneNumber,
      placeType: data.placeType,
      hasPets: data.hasPets === "true",
      healthCondition: data.healthCondition,
      hasChildren: data.hasChildren,
      weight: data.weight ? parseFloat(data.weight as string) : undefined,
      notes: data.notes,
    });

    // Save the new employer document to the database
    await newEmployer.save();

    console.log("Employer created successfully:", newEmployer);

    // Revalidate and redirect
  } catch (err) {
    console.error("Error creating employer:", err);

    // Check if the error is a redirect
    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      // This is not an error, but an expected redirect. Re-throw it.
      throw err;
    } else {
      // This is an actual error
      throw new Error("Failed to create employer!");
    }
  }
  revalidatePath("/dashboard/employers");
  redirect("/dashboard/employers");
};

export async function updateEmployer(formData: FormData) {
  console.log("updateEmployer function called");
  console.log("Received formData:", Object.fromEntries(formData));

  const id = formData.get("id") as string;
  console.log("Employer ID:", id);

  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());

  // Remove the id from the data object
  delete data.id;

  console.log("Data to update:", data);

  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedEmployer) {
      throw new Error("Employer not found");
    }

    console.log("Update successful:", updatedEmployer);
  } catch (error) {
    console.error("Failed to update employer:", error);
    // Instead of console.log, throw an error to be caught by the client
    throw new Error("Failed to update employer");
  }
  revalidatePath(`/dashboard/employers/${id}`);
  redirect(`/dashboard/employers/${id}`);
}

export const deleteEmployer = async (formData: FormData) => {
  const employerId = formData.get("employerId") as string;

  try {
    // Connect to the database
    await connectToDB();

    // Find and delete the employer by ID
    const deletedEmployer = await Employer.findByIdAndDelete(employerId);

    if (!deletedEmployer) {
      throw new Error("Employer not found");
    }

    console.log("Employer deleted successfully:", deletedEmployer);
  } catch (err) {
    console.error("Error deleting employer:", err);

    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      throw err;
    } else {
      throw new Error("Failed to delete employer!");
    }
  }
  // Revalidate and redirect
  revalidatePath("/dashboard/employers");
  redirect("/dashboard/employers");
};

export const addEmployee = async (formData: FormData) => {
  await connectToDB();
  try {
    console.log("Connected to DB");

    const data = Object.fromEntries(formData.entries());
    console.log("Form data extracted:", data);

    const file = formData.get("photo") as File;
    let photoBuffer = null;

    if (file && file.size > 0) {
      console.log("File found:", file.name);
      const fileBuffer = await file.arrayBuffer();
      photoBuffer = Buffer.from(fileBuffer); // Store the image as a Buffer
    } else {
      console.log("No photo file found, skipping upload process");
    }

    const newEmployee = new Employee({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: new Date(data.birthDate as string),
      competencies: formData.getAll("competencies"),
      address: data.address,
      phoneNumber: data.phoneNumber,
      maritalStatus: data.maritalStatus,
      hasChildren: data.hasChildren === "on",
      previousEmployers: data.previousEmployers,
      references: data.references,
      worksWithPets: data.worksWithPets === "on",
      nationality: data.nationality,
      residencyPermit: data.residencyPermit === "on",
      travelRestriction: data.travelRestriction === "on",
      notes: data.notes,
      photo: photoBuffer, // Store the photo as a Buffer
    });

    console.log("Saving employee to DB...");
    await newEmployee.save();
    console.log("Employee created successfully:", newEmployee);
  } catch (err) {
    console.error("Error creating employee:", err);
    throw new Error("Failed to create employee!");
  }
  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
};

export async function updateEmployee(formData: FormData) {
  const id = formData.get("id") as string;
  const data = Object.fromEntries(formData.entries());
  const competencies = formData.getAll("competencies");

  delete data.id;

  try {
    const currentEmployee = await Employee.findById(id);
    if (!currentEmployee) {
      throw new Error("Employee not found");
    }

    const photo = formData.get("photo") as File;
    if (photo && photo.size > 0) {
      // Upload the new photo as a Buffer
      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // @ts-expect-error error
      data.photo = buffer; // Update the photo field with the new Buffer
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { ...data, competencies },
      { new: true },
    );

    if (!updatedEmployee) {
      throw new Error("Employee not found");
    }

    console.log({ success: true, employee: updatedEmployee });
  } catch (error) {
    console.error("Failed to update employee:", error);
    console.log({ success: false, error: "Failed to update employee" });
  }
  revalidatePath("/dashboard/employees");
  redirect(`/dashboard/employees/${id}`);
}

export const deleteEmployee = async (formData: FormData) => {
  try {
    const employeeId = formData.get("employeeId") as string;
    console.log("Employee ID:", employeeId);

    await connectToDB();
    console.log("DB Connected");

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error("Employee not found");
    }

    await Employee.findByIdAndDelete(employeeId);
    console.log("Employee deleted successfully:", employeeId);
  } catch (err) {
    console.error("Error deleting employee:", err);
  }
  revalidatePath("/dashboard/employees");
  redirect("/dashboard/employees");
};

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  redirect("/dashboard");
};

export const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    await connectToDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const savedUser = await user.save();
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "An error occurred during registration" };
  }
};

export async function signOutAction() {
  await signOut();
}
