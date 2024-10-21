// @ts-nocheck
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL!);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
