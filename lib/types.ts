export type CompetencyOption = {
  value: string;
  label: string;
};

export interface EmployeeType {
  _id?: string;
  firstName: string; // Name
  lastName: string; // Surname
  birthDate: Date; // Date of Birth
  competencies: string[]; // Competence (array of competency values)
  address: string; // Address
  phoneNumber: string; // Telephone Number
  maritalStatus?: "Evli" | "Bekar"; // Marital Status
  hasChildren: boolean; // Has Children
  previousEmployers?: string; // Previous Employers
  references?: string; // References
  worksWithPets?: boolean; // Works With Pets
  nationality?: string; // Nationality
  residencyPermit?: boolean; // Residency Permit
  travelRestriction?: boolean; // Travel Restriction
  notes?: string; // Notes
  photo?: Buffer | string | undefined; // Photo
}

export interface EmployerType {
  _id?: string;
  firstName: string; // Name
  lastName: string; // Surname
  birthDate: Date; // Date of Birth
  address: string; // Address
  phoneNumber: string; // Telephone Number
  placeType: "Müstakil" | "Dublex" | "Normal Daire"; // Place Type
  hasPets: boolean; // Has Pets
  healthCondition: string; // Health Condition
  children: string; // Children
  weight: number; // Weight
  notes: string; // Notes
}

export interface UserType {
  email: string;
  username: string;
  password: string;
}
