import mongoose, { Schema } from "mongoose";
import { CompetencyOption, EmployeeType } from "@/lib/types";

// Define the competency options
export const competencyOptions: CompetencyOption[] = [
  { value: "evIsiElemanlari", label: "Ev İşi Elemanları" },
  { value: "hastaBakimi", label: "Hasta Bakımı" },
  { value: "yasliBakimi", label: "Yaşlı Bakımı" },
  { value: "bebekBakimi", label: "Bebek Bakımı" },
  { value: "yatalakBakan", label: "Yatalak Hasta Bakımı" },
  { value: "alzheimerBakan", label: "Alzheimer Hasta Bakımı" },
  { value: "dadiYeniDogan", label: "Dadı (Yeni Doğan)" },
  { value: "cocukBakimi", label: "Çocuk Bakımı" },
  { value: "asci", label: "Aşçı" },
  { value: "sofor", label: "Şoför" },
  { value: "oyunAblasi", label: "Oyun Ablası" },
];

const EmployeeSchema = new Schema<EmployeeType>(
  {
    firstName: { type: String, required: true }, // ad
    lastName: { type: String, required: true }, // soyad
    birthDate: { type: Date, required: true }, // dogumTarihi
    competencies: {
      type: [String],
      enum: competencyOptions.map((option) => option.value),
      required: true,
    },
    address: { type: String, required: true }, // adres
    phoneNumber: { type: String, required: true }, // telefonNumarasi
    maritalStatus: { type: String, enum: ["Evli", "Bekar"] }, // medeniDurum
    hasChildren: { type: Boolean, default: false }, // cocukSahibi
    previousEmployers: { type: String }, // oncekiIsverenler
    references: { type: String }, // referanslar
    worksWithPets: { type: Boolean }, // evcilHayvan
    nationality: { type: String }, // uyruk
    residencyPermit: { type: Boolean }, // oturumIzni
    travelRestriction: { type: Boolean }, // seyahatKisitlamasi
    notes: { type: String }, // notlar
    photo: { type: Buffer }, // fotograf
  },
  { timestamps: true },
);

const Employee =
  mongoose.models?.Employee ||
  mongoose.model<EmployeeType>("Employee", EmployeeSchema);

export default Employee;
