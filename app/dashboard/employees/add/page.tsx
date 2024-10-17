import EmployeeAddForm from "@/components/Employee/EmployeeAddForm";

export default async function AddEmployeePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Çalışan Ekle</h1>
      <EmployeeAddForm />
    </div>
  );
}
