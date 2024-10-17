import EmployerAddForm from "@/components/Employer/EmployerAddForm";

export default async function AddEmployerPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Müşteri Ekle</h1>
      <EmployerAddForm />
    </div>
  );
}
