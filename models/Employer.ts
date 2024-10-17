import mongoose, { Schema } from "mongoose";
import { EmployerType } from "@/lib/types";

const EmployerSchema = new Schema<EmployerType>(
  {
    firstName: { type: String, required: true }, // ad
    lastName: { type: String, required: true }, // soyad
    birthDate: { type: Date, required: true }, // dogumTarihi
    address: { type: String, required: true }, // adres
    phoneNumber: { type: String, required: true }, // telefonNumarasi
    placeType: {
      type: String,
      enum: ["Müstakil", "Dublex", "Normal Daire"], // yerTipi
      required: true,
    },
    hasPets: { type: Boolean, default: false }, // evcilHayvan
    healthCondition: { type: String }, // saglikDurumu
    children: { type: String }, // cocuklar
    weight: { type: Number }, // kilo
    notes: { type: String }, // notlar
  },
  { timestamps: true },
);

const Employer =
  mongoose.models?.Employer ||
  mongoose.model<EmployerType>("Employer", EmployerSchema);
export default Employer;
